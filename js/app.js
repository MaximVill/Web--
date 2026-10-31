// Minimalist App Controller (Drawer Menu, View Switching, Editor & Gallery)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas Editor
  const editor = new MemeEditor('meme-canvas');
  window.memeEditor = editor;
  if (window.MEME_TEMPLATES && window.MEME_TEMPLATES.length > 0) {
    editor.loadTemplate(window.MEME_TEMPLATES[0].id);
  }

  // 2. Initialize Game
  const game = new MemeGame();
  window.memeGame = game;

  // 3. Navigation & Views
  initNavigation(game);

  // 4. Editor Controls
  initEditor(editor);

  // 5. Gallery
  initGallery(editor, game);

  // 6. Sound Toggle
  initSoundToggle();
});

function initNavigation(game) {
  const burgerBtn = document.getElementById('burger-btn');
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close');
  const navLinks = document.querySelectorAll('.drawer-nav-link');
  const myMemesBtn = document.getElementById('nav-my-memes');
  const views = document.querySelectorAll('.app-view');

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
  }

  if (burgerBtn) burgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  window.switchView = function(viewId) {
    views.forEach(v => {
      v.classList.toggle('active', v.id === `view-${viewId}`);
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-view') === viewId);
    });
    closeDrawer();

    if (viewId === 'editor' && window.memeEditor) {
      setTimeout(() => window.memeEditor.render(), 50);
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-view');
      if (target) window.switchView(target);
    });
  });

  if (myMemesBtn) {
    myMemesBtn.addEventListener('click', () => {
      window.switchView('game');
      if (game) {
        game.showSummaryScreen();
      }
      closeDrawer();
    });
  }
}

function initEditor(editor) {
  const tmplSelect = document.getElementById('template-select');
  const topInput = document.getElementById('editor-top-text');
  const bottomInput = document.getElementById('editor-bottom-text');
  const fontSizeSlider = document.getElementById('editor-font-size');
  const fontSizeVal = document.getElementById('font-size-val');
  const downloadBtn = document.getElementById('editor-download-btn');
  const uploadInput = document.getElementById('editor-upload');
  const uploadBtn = document.getElementById('editor-upload-btn');

  if (tmplSelect && window.MEME_TEMPLATES) {
    tmplSelect.innerHTML = '';
    window.MEME_TEMPLATES.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.name;
      tmplSelect.appendChild(opt);
    });

    tmplSelect.addEventListener('change', () => {
      editor.loadTemplate(tmplSelect.value, topInput.value, bottomInput.value);
    });
  }

  if (topInput) {
    topInput.addEventListener('input', () => {
      editor.texts[0].text = topInput.value;
      editor.render();
    });
  }

  if (bottomInput) {
    bottomInput.addEventListener('input', () => {
      editor.texts[1].text = bottomInput.value;
      editor.render();
    });
  }

  if (fontSizeSlider) {
    fontSizeSlider.addEventListener('input', () => {
      const size = parseInt(fontSizeSlider.value, 10);
      if (fontSizeVal) fontSizeVal.textContent = size + 'px';
      editor.texts.forEach(t => t.fontSize = size);
      editor.render();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      editor.downloadImage(`meme-${editor.currentTemplateId}.png`);
    });
  }

  if (uploadBtn && uploadInput) {
    uploadBtn.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        editor.loadCustomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
}

function initGallery(editor, game) {
  const container = document.getElementById('gallery-grid');
  if (!container || !window.MEME_TEMPLATES) return;

  container.innerHTML = '';
  window.MEME_TEMPLATES.forEach(t => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    card.innerHTML = `
      <div class="gallery-thumb">
        <img src="${t.file}" alt="${t.name}" loading="lazy">
      </div>
      <div class="gallery-info">
        <div class="gallery-name">${t.name}</div>
        <div class="gallery-btns">
          <button class="btn-minimal-outline edit-btn" type="button">Редактор</button>
          <button class="btn-minimal play-btn" type="button">В игру</button>
        </div>
      </div>
    `;

    card.querySelector('.edit-btn').addEventListener('click', () => {
      editor.loadTemplate(t.id);
      const sel = document.getElementById('template-select');
      if (sel) sel.value = t.id;
      window.switchView('editor');
    });

    card.querySelector('.play-btn').addEventListener('click', () => {
      let idx = window.SCENARIOS.findIndex(s => s.id === t.id);
      if (idx === -1) idx = 0;
      game.loadScenarioAt(idx);
      window.switchView('game');
    });

    container.appendChild(card);
  });
}

function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (window.soundFX) {
      const isMuted = window.soundFX.toggleMute();
      soundBtn.textContent = isMuted ? 'Звук: выкл' : 'Звук: вкл';
    }
  });
}
