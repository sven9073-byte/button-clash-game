/**
 * Audio Service
 * Manages game sounds and music
 */
class AudioService {
  private static instance: AudioService;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private music: HTMLAudioElement | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private volume: number = 0.7;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  /**
   * Load a sound effect
   */
  loadSound(key: string, url: string): void {
    if (!this.sounds.has(key)) {
      const audio = new Audio(url);
      audio.volume = this.volume;
      this.sounds.set(key, audio);
    }
  }

  /**
   * Play a sound effect
   */
  playSound(key: string): void {
    if (!this.soundEnabled) return;

    const sound = this.sounds.get(key);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((error) => {
        console.warn(`Failed to play sound ${key}:`, error);
      });
    }
  }

  /**
   * Load and play background music
   */
  playMusic(url: string, loop: boolean = true): void {
    if (!this.musicEnabled) return;

    this.stopMusic();
    this.music = new Audio(url);
    this.music.loop = loop;
    this.music.volume = this.volume * 0.5; // Music quieter than SFX
    this.music.play().catch((error) => {
      console.warn('Failed to play music:', error);
    });
  }

  /**
   * Stop background music
   */
  stopMusic(): void {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
      this.music = null;
    }
  }

  /**
   * Enable/disable sound effects
   */
  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
  }

  /**
   * Enable/disable music
   */
  setMusicEnabled(enabled: boolean): void {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopMusic();
    }
  }

  /**
   * Set master volume (0.0 - 1.0)
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));

    // Update all loaded sounds
    this.sounds.forEach((sound) => {
      sound.volume = this.volume;
    });

    // Update music if playing
    if (this.music) {
      this.music.volume = this.volume * 0.5;
    }
  }

  /**
   * Preload default game sounds
   */
  preloadDefaultSounds(): void {
    // Placeholder - add your sound URLs here
    // this.loadSound('click', '/sounds/click.mp3');
    // this.loadSound('win', '/sounds/win.mp3');
    // this.loadSound('countdown', '/sounds/countdown.mp3');
  }

  /**
   * Clean up all audio resources
   */
  cleanup(): void {
    this.stopMusic();
    this.sounds.forEach((sound) => {
      sound.pause();
    });
    this.sounds.clear();
  }
}

export default AudioService;
