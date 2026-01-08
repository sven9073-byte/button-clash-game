/**
 * Сервис для работы с локальным хранилищем
 * Управляет сохранением и загрузкой настроек, статистики и пользовательских данных
 */

import { GameSettings, GameStats, CustomTextures } from '../types';

class StorageService {
  private static instance: StorageService;
  private readonly SETTINGS_KEY = 'buttonClash_settings';
  private readonly STATS_KEY = 'buttonClash_stats';
  private readonly TEXTURES_KEY = 'buttonClash_textures';

  private constructor() {}

  // Singleton pattern
  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Сохранить настройки игры
   */
  public saveSettings(settings: GameSettings): void {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  /**
   * Загрузить настройки игры
   */
  public loadSettings(): GameSettings | null {
    try {
      const data = localStorage.getItem(this.SETTINGS_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }

  /**
   * Сохранить статистику игры
   */
  public saveStats(stats: GameStats): void {
    try {
      localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Failed to save stats:', error);
    }
  }

  /**
   * Загрузить статистику игры
   */
  public loadStats(): GameStats | null {
    try {
      const data = localStorage.getItem(this.STATS_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load stats:', error);
      return null;
    }
  }

  /**
   * Сохранить пользовательские текстуры
   */
  public saveTextures(textures: CustomTextures): void {
    try {
      localStorage.setItem(this.TEXTURES_KEY, JSON.stringify(textures));
    } catch (error) {
      console.error('Failed to save textures:', error);
    }
  }

  /**
   * Загрузить пользовательские текстуры
   */
  public loadTextures(): CustomTextures | null {
    try {
      const data = localStorage.getItem(this.TEXTURES_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load textures:', error);
      return null;
    }
  }

  /**
   * Очистить все данные
   */
  public clearAll(): void {
    try {
      localStorage.removeItem(this.SETTINGS_KEY);
      localStorage.removeItem(this.STATS_KEY);
      localStorage.removeItem(this.TEXTURES_KEY);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  /**
   * Экспортировать все данные в JSON
   */
  public exportData(): string {
    const data = {
      settings: this.loadSettings(),
      stats: this.loadStats(),
      textures: this.loadTextures(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * Импортировать данные из JSON
   */
  public importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.settings) {
        this.saveSettings(data.settings);
      }
      if (data.stats) {
        this.saveStats(data.stats);
      }
      if (data.textures) {
        this.saveTextures(data.textures);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

export default StorageService;
