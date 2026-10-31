// Game Engine: Cohesive Meme Match + History Collection Review + Zero Emojis

class MemeGame {
  constructor() {
    this.revealed = false;
    this.userWord = '';
    this.userMemesHistory = []; // stores all user created memes

    // Cache elements
    this.roundCounterEl = document.getElementById('round-counter');
    this.promptScreen = document.getElementById('prompt-screen');
    this.revealScreen = document.getElementById('reveal-screen');
    this.summaryScreen = document.getElementById('summary-screen');
    this.summaryCountEl = document.getElementById('summary-count');
    this.createdGridEl = document.getElementById('created-memes-grid');
    this.restartBtn = document.getElementById('restart-game-btn');
    
    this.promptBeforeEl = document.getElementById('prompt-before');
    this.promptAfterEl = document.getElementById('prompt-after');
    this.wordInput = document.getElementById('game-word-input');
    this.submitBtn = document.getElementById('submit-btn');

    // Reveal zone elements
    this.revealedImg = document.getElementById('revealed-img');
    this.revealedTopText = document.getElementById('revealed-top-text');
    this.revealedBottomText = document.getElementById('revealed-bottom-text');
    this.memeNameEl = document.getElementById('meme-name-tag');

    // Action buttons
    this.nextSentenceBtn = document.getElementById('next-btn');
    this.backBtn = document.getElementById('back-btn');
    this.editRevealedBtn = document.getElementById('edit-revealed-btn');

    this.initShuffledDeck();
    this.initMirror();
    this.init();
  }

  initShuffledDeck() {
    const total = window.SCENARIOS.length;
    this.deck = [];
    for (let i = 0; i < total; i++) {
      this.deck.push(i);
    }
    // Fisher-Yates shuffle
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    this.currentStep = 0;
  }

  initMirror() {
    this.mirror = document.createElement('span');
    this.mirror.style.position = 'absolute';
    this.mirror.style.top = '-9999px';
    this.mirror.style.left = '-9999px';
    this.mirror.style.visibility = 'hidden';
    this.mirror.style.whiteSpace = 'pre';
    this.mirror.style.pointerEvents = 'none';
    document.body.appendChild(this.mirror);
  }

  init() {
    if (!this.wordInput || !this.submitBtn) return;

    this.submitBtn.addEventListener('click', () => this.handleReveal());
    
    this.wordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleReveal();
      }
    });

    this.wordInput.addEventListener('input', () => {
      this.adjustInputWidth();
    });

    if (this.nextSentenceBtn) {
      this.nextSentenceBtn.addEventListener('click', () => {
        this.nextScenario();
      });
    }

    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => {
        this.backToPrompt();
      });
    }

    if (this.editRevealedBtn) {
      this.editRevealedBtn.addEventListener('click', () => {
        this.openInEditor();
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => {
        this.restartGame();
      });
    }

    window.addEventListener('resize', () => this.adjustInputWidth());

    this.loadScenarioAt(0);
  }

  adjustInputWidth() {
    if (!this.wordInput || !this.mirror) return;

    const style = window.getComputedStyle(this.wordInput);
    this.mirror.style.font = style.font;
    this.mirror.style.fontSize = style.fontSize;
    this.mirror.style.fontFamily = style.fontFamily;
    this.mirror.style.fontWeight = style.fontWeight;
    this.mirror.style.letterSpacing = style.letterSpacing;

    const val = this.wordInput.value || '';
    this.mirror.textContent = val || '   ';
    
    const measuredWidth = this.mirror.offsetWidth;
    const finalWidth = Math.max(60, measuredWidth + 18);
    this.wordInput.style.width = finalWidth + 'px';
  }

  loadScenarioAt(step) {
    if (!this.deck || this.deck.length === 0) return;

    if (step >= this.deck.length) {
      this.showSummaryScreen();
      return;
    }

    this.currentStep = step;
    this.revealed = false;

    const scenarioIndex = this.deck[step];
    const item = window.SCENARIOS[scenarioIndex];
    this.currentScenario = item;

    if (this.roundCounterEl) {
      this.roundCounterEl.textContent = `${step + 1} / ${this.deck.length}`;
    }

    this.promptBeforeEl.textContent = item.before;
    this.promptAfterEl.textContent = item.after;
    this.wordInput.value = '';
    
    setTimeout(() => this.adjustInputWidth(), 10);

    if (this.promptScreen) this.promptScreen.style.display = 'flex';
    if (this.revealScreen) this.revealScreen.style.display = 'none';
    if (this.summaryScreen) this.summaryScreen.style.display = 'none';

    this.wordInput.focus();
  }

  handleReveal() {
    const item = this.currentScenario;
    if (!item) return;

    let word = this.wordInput.value.trim();
    if (!word) {
      word = item.defaultWord || 'это';
      this.wordInput.value = word;
      this.adjustInputWidth();
    }
    this.userWord = word;
    this.revealed = true;

    if (window.soundFX) {
      window.soundFX.playRimshot();
    }

    // Render meme
    if (this.revealedImg) {
      this.revealedImg.src = item.memeFile;
      this.revealedImg.alt = item.memeName;
    }

    if (this.memeNameEl) {
      this.memeNameEl.textContent = `Мем: ${item.memeName}`;
    }

    const captions = item.makeCaptions(this.userWord);
    const topTxt = captions.top || '';
    const bottomTxt = captions.bottom || '';

    if (this.revealedTopText) this.revealedTopText.textContent = topTxt;
    if (this.revealedBottomText) this.revealedBottomText.textContent = bottomTxt;

    // Save to user created memes history
    const historyEntry = {
      id: item.id,
      name: item.memeName,
      file: item.memeFile,
      top: topTxt,
      bottom: bottomTxt,
      word: this.userWord
    };

    // Update if already exists, or append
    const existingIdx = this.userMemesHistory.findIndex(m => m.id === item.id);
    if (existingIdx >= 0) {
      this.userMemesHistory[existingIdx] = historyEntry;
    } else {
      this.userMemesHistory.push(historyEntry);
    }

    if (this.promptScreen) this.promptScreen.style.display = 'none';
    if (this.summaryScreen) this.summaryScreen.style.display = 'none';
    if (this.revealScreen) {
      this.revealScreen.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  backToPrompt() {
    if (this.promptScreen) this.promptScreen.style.display = 'flex';
    if (this.revealScreen) this.revealScreen.style.display = 'none';
    if (this.summaryScreen) this.summaryScreen.style.display = 'none';
    this.wordInput.focus();
    if (window.soundFX) window.soundFX.playPop();
  }

  nextScenario() {
    if (this.currentStep + 1 >= this.deck.length) {
      this.showSummaryScreen();
    } else {
      this.loadScenarioAt(this.currentStep + 1);
    }
  }

  showSummaryScreen() {
    if (this.promptScreen) this.promptScreen.style.display = 'none';
    if (this.revealScreen) this.revealScreen.style.display = 'none';
    if (this.summaryScreen) {
      this.summaryScreen.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (this.roundCounterEl) {
      this.roundCounterEl.textContent = 'Итоги';
    }

    if (this.summaryCountEl) {
      this.summaryCountEl.textContent = `Создано мемов: ${this.userMemesHistory.length} из ${this.deck.length}`;
    }

    this.renderSummaryGrid();

    if (window.soundFX) {
      window.soundFX.playFanfare();
    }
  }

  renderSummaryGrid() {
    if (!this.createdGridEl) return;
    this.createdGridEl.innerHTML = '';

    if (this.userMemesHistory.length === 0) {
      this.createdGridEl.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column: 1/-1;">Вы пока не создали ни одного мема. Начните игру!</p>';
      return;
    }

    this.userMemesHistory.forEach(meme => {
      const card = document.createElement('div');
      card.className = 'created-meme-card';

      card.innerHTML = `
        <div class="created-meme-preview">
          <div class="meme-text-overlay meme-text-top" style="font-size: 1.1rem; padding: 6px 10px;">${meme.top}</div>
          <img src="${meme.file}" alt="${meme.name}" loading="lazy">
          <div class="meme-text-overlay meme-text-bottom" style="font-size: 1.1rem; padding: 6px 10px;">${meme.bottom}</div>
        </div>
        <div class="created-meme-card-body">
          <div style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">${meme.name}</div>
          <div class="created-meme-card-actions">
            <button class="btn-minimal download-card-btn" type="button">Скачать PNG</button>
            <button class="btn-minimal-outline edit-card-btn" type="button">Редактор</button>
          </div>
        </div>
      `;

      card.querySelector('.download-card-btn').addEventListener('click', () => {
        this.downloadMemePNG(meme);
      });

      card.querySelector('.edit-card-btn').addEventListener('click', () => {
        if (window.switchView) window.switchView('editor');
        if (window.memeEditor) {
          window.memeEditor.loadCustomImage(meme.file);
          const topInp = document.getElementById('editor-top-text');
          const btmInp = document.getElementById('editor-bottom-text');
          if (topInp) topInp.value = meme.top;
          if (btmInp) btmInp.value = meme.bottom;
        }
      });

      this.createdGridEl.appendChild(card);
    });
  }

  downloadMemePNG(meme) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const w = 600;
      const aspect = img.naturalHeight / img.naturalWidth;
      const h = Math.round(w * aspect);
      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(img, 0, 0, w, h);

      ctx.font = 'bold 36px Impact, Arial Black, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 5;
      ctx.lineJoin = 'miter';

      if (meme.top) {
        ctx.strokeText(meme.top, w / 2, 45);
        ctx.fillText(meme.top, w / 2, 45);
      }
      if (meme.bottom) {
        ctx.strokeText(meme.bottom, w / 2, h - 35);
        ctx.fillText(meme.bottom, w / 2, h - 35);
      }

      const link = document.createElement('a');
      link.download = `my-meme-${meme.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      if (window.soundFX) window.soundFX.playPop();
    };

    img.src = meme.file;
  }

  restartGame() {
    this.userMemesHistory = [];
    this.initShuffledDeck();
    this.loadScenarioAt(0);
    if (window.soundFX) window.soundFX.playPop();
  }

  openInEditor() {
    const item = this.currentScenario;
    if (!item) return;

    const topTxt = this.revealedTopText ? this.revealedTopText.textContent : '';
    const bottomTxt = this.revealedBottomText ? this.revealedBottomText.textContent : '';

    if (window.switchView) {
      window.switchView('editor');
    }

    if (window.memeEditor) {
      window.memeEditor.loadCustomImage(item.memeFile);
      const topInp = document.getElementById('editor-top-text');
      const btmInp = document.getElementById('editor-bottom-text');
      if (topInp) topInp.value = topTxt;
      if (btmInp) btmInp.value = bottomTxt;
    }
  }
}

window.MemeGame = MemeGame;
