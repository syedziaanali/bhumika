/**
 * Original Romantic Instrumental Synthesizer using Web Audio API.
 * Produces a warm felt-piano nocturne & lush ambient pad in A Major / F# Minor
 * without relying on external copyrighted MP3s or network-dependent streams.
 * Never throws if AudioContext is blocked or unavailable.
 */
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.delayNode = null;
    this.isPlaying = false;
    this.schedulerId = null;
    this.stepIndex = 0;

    // Gentle romantic progression: Dmaj7 -> E6 -> C#m7 -> F#m9 (frequencies in Hz)
    this.chords = [
      {
        bass: 146.83, // D3
        pad: [220.0, 277.18, 329.63, 369.99], // A3, C#4, E4, F#4
        arp: [293.66, 369.99, 440.0, 554.37, 659.25, 554.37, 440.0, 369.99],
      },
      {
        bass: 164.81, // E3
        pad: [246.94, 277.18, 329.63, 415.3], // B3, C#4, E4, G#4
        arp: [329.63, 415.3, 493.88, 554.37, 659.25, 554.37, 493.88, 415.3],
      },
      {
        bass: 138.59, // C#3
        pad: [207.65, 246.94, 329.63, 415.3], // G#3, B3, E4, G#4
        arp: [277.18, 329.63, 415.3, 493.88, 659.25, 493.88, 415.3, 329.63],
      },
      {
        bass: 185.0, // F#3
        pad: [220.0, 277.18, 329.63, 415.3], // A3, C#4, E4, G#4
        arp: [369.99, 440.0, 554.37, 659.25, 739.99, 659.25, 554.37, 440.0],
      },
    ];
  }

  initContext() {
    if (this.ctx) return true;
    try {
      const AudioCtx =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      // Warm lowpass filter for dreamy velvet tone
      const masterFilter = this.ctx.createBiquadFilter();
      masterFilter.type = "lowpass";
      masterFilter.frequency.setValueAtTime(2100, this.ctx.currentTime);
      masterFilter.Q.setValueAtTime(0.6, this.ctx.currentTime);

      // Soft stereo-feel echo delay
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.setValueAtTime(0.42, this.ctx.currentTime);

      const feedback = this.ctx.createGain();
      feedback.gain.setValueAtTime(0.32, this.ctx.currentTime);

      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = "lowpass";
      delayFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);

      this.delayNode.connect(delayFilter);
      delayFilter.connect(feedback);
      feedback.connect(this.delayNode);
      delayFilter.connect(masterFilter);

      masterFilter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
      this.masterFilter = masterFilter;
      return true;
    } catch {
      return false;
    }
  }

  playPianoNote(freq, startTime, duration = 2.4, velocity = 0.14) {
    if (!this.ctx || !this.masterFilter) return;
    try {
      const osc = this.ctx.createOscillator();
      const harmonic = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      harmonic.type = "triangle";
      harmonic.frequency.setValueAtTime(freq * 2, startTime);

      const harmonicGain = this.ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.18, startTime);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.linearRampToValueAtTime(velocity, startTime + 0.035);
      noteGain.gain.exponentialRampToValueAtTime(
        0.0008,
        startTime + duration
      );

      osc.connect(noteGain);
      harmonic.connect(harmonicGain);
      harmonicGain.connect(noteGain);

      noteGain.connect(this.masterFilter);
      noteGain.connect(this.delayNode);

      osc.start(startTime);
      harmonic.start(startTime);
      osc.stop(startTime + duration + 0.05);
      harmonic.stop(startTime + duration + 0.05);
    } catch {
      // Ignore individual audio scheduling errors
    }
  }

  playPadChord(frequencies, bassFreq, startTime, duration = 4.6) {
    if (!this.ctx || !this.masterFilter) return;
    try {
      [bassFreq, ...frequencies].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();

        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, startTime);
        osc.detune.setValueAtTime((idx - 2) * 3.5, startTime);

        const peak = idx === 0 ? 0.065 : 0.022;
        padGain.gain.setValueAtTime(0.0001, startTime);
        padGain.gain.linearRampToValueAtTime(peak, startTime + 1.1);
        padGain.gain.linearRampToValueAtTime(peak * 0.75, startTime + duration - 1.0);
        padGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(padGain);
        padGain.connect(this.masterFilter);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    } catch {
      // Ignore audio errors
    }
  }

  scheduleNextBeat() {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime + 0.05;
    const chordIdx = Math.floor(this.stepIndex / 8) % this.chords.length;
    const arpIdx = this.stepIndex % 8;
    const chord = this.chords[chordIdx];

    if (arpIdx === 0) {
      this.playPadChord(chord.pad, chord.bass, now, 4.7);
    }

    const noteFreq = chord.arp[arpIdx];
    const velocity = arpIdx === 0 || arpIdx === 4 ? 0.13 : 0.085;
    this.playPianoNote(noteFreq, now, 2.3, velocity);

    this.stepIndex += 1;
  }

  async play() {
    try {
      const ok = this.initContext();
      if (!ok || !this.ctx) return false;

      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      if (this.isPlaying) return true;
      this.isPlaying = true;

      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(
        Math.max(this.masterGain.gain.value, 0.0001),
        now
      );
      this.masterGain.gain.linearRampToValueAtTime(0.75, now + 0.8);

      this.scheduleNextBeat();
      this.schedulerId = window.setInterval(() => {
        this.scheduleNextBeat();
      }, 580);

      return true;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.schedulerId) {
      window.clearInterval(this.schedulerId);
      this.schedulerId = null;
    }
    if (this.ctx && this.masterGain) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      } catch {
        // Ignore fade errors
      }
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
