// Procedural Web Audio API sound engine (Zero external audio dependencies, 100% offline)

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initOnFirstInteraction = this.initOnFirstInteraction.bind(this);
    
    // Resume audio context on first click/keypress
    window.addEventListener('click', this.initOnFirstInteraction, { once: true });
    window.addEventListener('keydown', this.initOnFirstInteraction, { once: true });
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initOnFirstInteraction() {
    this.init();
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playWhoosh() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    const now = this.ctx.currentTime;
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.2);
    filter.Q.value = 3;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.2);
  }

  // Classic Ba-dum-tss punchline!
  playRimshot() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Drum 1: Ba
    this._playDrum(now, 160, 0.08, 0.3);
    // Drum 2: Dum
    this._playDrum(now + 0.12, 140, 0.09, 0.35);
    // Tsss cymbal
    this._playCymbal(now + 0.28, 0.4);
  }

  _playDrum(time, freq, dur, vol) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + dur);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + dur);
  }

  _playCymbal(time, dur) {
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-3 * (i / bufferSize));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(5000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + dur);
  }

  // Iconic Vine Boom bass drop
  playVineBoom() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Deep sub-bass with distortion feel
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.5);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);

    // Add noise impact
    this._playImpact(now, 0.25);
  }

  _playImpact(time, dur) {
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + dur);
  }

  // Sad trombone / wah-wah-wah
  playSadWah() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { f: 260, t: 0, d: 0.22 },
      { f: 245, t: 0.24, d: 0.22 },
      { f: 230, t: 0.48, d: 0.22 },
      { f: 200, t: 0.72, d: 0.5 }
    ];

    const now = this.ctx.currentTime;
    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      if (n.d > 0.3) {
        osc.frequency.linearRampToValueAtTime(n.f - 25, now + n.t + n.d);
      }

      gain.gain.setValueAtTime(0.18, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.01, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }

  // Victory / Tada cheer!
  playFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { f: 392.00, t: 0, d: 0.12 },     // G4
      { f: 523.25, t: 0.13, d: 0.12 },  // C5
      { f: 659.25, t: 0.26, d: 0.12 },  // E5
      { f: 783.99, t: 0.39, d: 0.35 }   // G5
    ];

    const now = this.ctx.currentTime;
    notes.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0.2, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.01, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }
}

window.soundFX = new SoundFX();
