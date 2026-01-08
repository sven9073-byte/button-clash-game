/**
 * Asset Service
 * Manages custom textures and images
 */
class AssetService {
  private static instance: AssetService;
  private customTextures: Map<string, string> = new Map();

  private constructor() {
    this.loadCustomTextures();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): AssetService {
    if (!AssetService.instance) {
      AssetService.instance = new AssetService();
    }
    return AssetService.instance;
  }

  /**
   * Load a custom texture from file
   */
  async loadCustomTexture(key: string, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        this.customTextures.set(key, dataUrl);
        this.saveCustomTextures();
        resolve(dataUrl);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Get texture URL by key
   */
  getTexture(key: string, defaultUrl?: string): string {
    return this.customTextures.get(key) || defaultUrl || '';
  }

  /**
   * Remove custom texture
   */
  removeTexture(key: string): void {
    this.customTextures.delete(key);
    this.saveCustomTextures();
  }

  /**
   * Check if custom texture exists
   */
  hasTexture(key: string): boolean {
    return this.customTextures.has(key);
  }

  /**
   * Save custom textures to localStorage
   */
  private saveCustomTextures(): void {
    try {
      const data = Array.from(this.customTextures.entries());
      localStorage.setItem('customTextures', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save custom textures:', error);
    }
  }

  /**
   * Load custom textures from localStorage
   */
  private loadCustomTextures(): void {
    try {
      const saved = localStorage.getItem('customTextures');
      if (saved) {
        const data = JSON.parse(saved) as [string, string][];
        this.customTextures = new Map(data);
      }
    } catch (error) {
      console.error('Failed to load custom textures:', error);
    }
  }

  /**
   * Clear all custom textures
   */
  clearAll(): void {
    this.customTextures.clear();
    localStorage.removeItem('customTextures');
  }

  /**
   * Get all custom texture keys
   */
  getAllKeys(): string[] {
    return Array.from(this.customTextures.keys());
  }
}

export default AssetService;
