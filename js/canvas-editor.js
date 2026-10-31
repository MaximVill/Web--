// Interactive Canvas Meme Editor (Minimalist, Real Photos, Zero Emojis)

class MemeEditor {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.baseImage = new Image();
    this.baseImageLoaded = false;
    this.currentTemplateId = 'this-is-fine';

    this.texts = [
      {
        id: 'top',
        text: 'ВЕРХНИЙ ТЕКСТ',
        x: 300,
        y: 50,
        fontSize: 36,
        fontFamily: 'Impact',
        color: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 5,
        uppercase: true,
        align: 'center'
      },
      {
        id: 'bottom',
        text: 'НИЖНИЙ ТЕКСТ',
        x: 300,
        y: 440,
        fontSize: 36,
        fontFamily: 'Impact',
        color: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 5,
        uppercase: true,
        align: 'center'
      }
    ];

    this.selectedItem = null;
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    this.initEvents();
  }

  loadTemplate(templateId, topText = null, bottomText = null) {
    const tmpl = window.MEME_TEMPLATES.find(t => t.id === templateId) || window.MEME_TEMPLATES[0];
    this.currentTemplateId = tmpl.id;

    if (topText !== null) this.texts[0].text = topText;
    else if (!this.texts[0].text || this.texts[0].text === 'ВЕРХНИЙ ТЕКСТ') this.texts[0].text = tmpl.defaultTop;

    if (bottomText !== null) this.texts[1].text = bottomText;
    else if (!this.texts[1].text || this.texts[1].text === 'НИЖНИЙ ТЕКСТ') this.texts[1].text = tmpl.defaultBottom;

    this.baseImage = new Image();
    this.baseImage.onload = () => {
      this.baseImageLoaded = true;
      // Adjust canvas height according to image aspect ratio
      const aspect = this.baseImage.naturalHeight / this.baseImage.naturalWidth;
      this.canvas.width = 600;
      this.canvas.height = Math.round(600 * aspect);
      this.texts[0].x = this.canvas.width / 2;
      this.texts[0].y = 45;
      this.texts[1].x = this.canvas.width / 2;
      this.texts[1].y = this.canvas.height - 45;
      this.render();
    };
    this.baseImage.src = tmpl.file;
  }

  loadCustomImage(imageSrc) {
    this.baseImage = new Image();
    this.baseImage.onload = () => {
      this.baseImageLoaded = true;
      const aspect = this.baseImage.naturalHeight / this.baseImage.naturalWidth;
      this.canvas.width = 600;
      this.canvas.height = Math.round(600 * aspect);
      this.texts[0].x = this.canvas.width / 2;
      this.texts[0].y = 45;
      this.texts[1].x = this.canvas.width / 2;
      this.texts[1].y = this.canvas.height - 45;
      this.render();
    };
    this.baseImage.src = imageSrc;
  }

  render() {
    if (!this.canvas || !this.ctx) return;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.ctx.clearRect(0, 0, w, h);

    if (this.baseImageLoaded && this.baseImage.naturalWidth) {
      this.ctx.drawImage(this.baseImage, 0, 0, w, h);
    } else {
      this.ctx.fillStyle = '#0a0a0a';
      this.ctx.fillRect(0, 0, w, h);
    }

    for (let i = 0; i < this.texts.length; i++) {
      const t = this.texts[i];
      if (!t.text) continue;

      const displayText = t.uppercase ? t.text.toUpperCase() : t.text;
      const lines = displayText.split('\n');

      this.ctx.save();
      this.ctx.font = `bold ${t.fontSize}px '${t.fontFamily}', Impact, Arial Black, sans-serif`;
      this.ctx.textAlign = t.align || 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = t.color || '#ffffff';
      this.ctx.strokeStyle = t.strokeColor || '#000000';
      this.ctx.lineWidth = t.strokeWidth || 5;
      this.ctx.lineJoin = 'miter';
      this.ctx.miterLimit = 2;

      const lineHeight = t.fontSize * 1.15;
      const startY = t.y - ((lines.length - 1) * lineHeight) / 2;

      lines.forEach((line, idx) => {
        const lineY = startY + (idx * lineHeight);
        if (t.strokeWidth > 0) {
          this.ctx.strokeText(line, t.x, lineY);
        }
        this.ctx.fillText(line, t.x, lineY);
      });

      if (this.selectedItem && this.selectedItem.type === 'text' && this.selectedItem.index === i) {
        let maxWidth = 0;
        lines.forEach(l => {
          const m = this.ctx.measureText(l).width;
          if (m > maxWidth) maxWidth = m;
        });
        const boxH = lines.length * lineHeight + 10;
        const boxX = t.x - maxWidth / 2 - 8;

        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1.5;
        this.ctx.setLineDash([4, 4]);
        this.ctx.strokeRect(boxX, startY - lineHeight / 2 - 4, maxWidth + 16, boxH);
      }

      this.ctx.restore();
    }
  }

  initEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const onStart = (e) => {
      const pos = getPos(e);
      for (let i = this.texts.length - 1; i >= 0; i--) {
        const t = this.texts[i];
        const lines = t.text.split('\n');
        const lineHeight = t.fontSize * 1.15;
        const totalHeight = lines.length * lineHeight;

        this.ctx.font = `bold ${t.fontSize}px '${t.fontFamily}', Impact, Arial, sans-serif`;
        let maxW = 0;
        lines.forEach(l => {
          const w = this.ctx.measureText(t.uppercase ? l.toUpperCase() : l).width;
          if (w > maxW) maxW = w;
        });

        const halfW = maxW / 2 + 15;
        const halfH = totalHeight / 2 + 15;

        if (pos.x >= t.x - halfW && pos.x <= t.x + halfW &&
            pos.y >= t.y - halfH && pos.y <= t.y + halfH) {
          this.selectedItem = { type: 'text', index: i };
          this.isDragging = true;
          this.dragOffsetX = pos.x - t.x;
          this.dragOffsetY = pos.y - t.y;
          this.render();
          return;
        }
      }

      this.selectedItem = null;
      this.render();
    };

    const onMove = (e) => {
      if (!this.isDragging || !this.selectedItem) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);
      const t = this.texts[this.selectedItem.index];
      t.x = Math.round(pos.x - this.dragOffsetX);
      t.y = Math.round(pos.y - this.dragOffsetY);
      this.render();
    };

    const onEnd = () => {
      this.isDragging = false;
    };

    this.canvas.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    this.canvas.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  downloadImage(filename = 'meme.png') {
    const oldSel = this.selectedItem;
    this.selectedItem = null;
    this.render();

    const link = document.createElement('a');
    link.download = filename;
    link.href = this.canvas.toDataURL('image/png');
    link.click();

    this.selectedItem = oldSel;
    this.render();
  }
}

window.MemeEditor = MemeEditor;
