export type CrusherMode = 'light' | 'dark';
export type CrusherDensity = 'compact' | 'cozy' | 'comfortable';

export interface CrusherPalettePayload {
  action?: 'open' | 'close' | 'toggle';
  open?: boolean;
  toggle?: boolean;
  [key: string]: unknown;
}

export interface CrusherToastAction {
  label: string;
  onClick?: () => void;
}

export interface CrusherToastOptions {
  title?: string;
  message?: string;
  variant?: string;
  duration?: number;
  action?: CrusherToastAction | null;
}

export declare function getTheme(): string;
export declare function getMode(): CrusherMode | string;
export declare function setTheme(name: string): void;
export declare function setMode(mode: CrusherMode): void;
export declare function toggleMode(): void;
export declare function setDensity(density: CrusherDensity): void;

export declare function showToast(opts?: CrusherToastOptions): string;

export declare function openPalette(payload?: CrusherPalettePayload): void;
export declare function closePalette(payload?: CrusherPalettePayload): void;
export declare function togglePalette(payload?: CrusherPalettePayload): void;
