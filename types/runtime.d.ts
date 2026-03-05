export interface CrusherPalettePayload {
  action?: 'open' | 'close' | 'toggle';
  open?: boolean;
  toggle?: boolean;
  [key: string]: unknown;
}

export declare function openPalette(payload?: CrusherPalettePayload): void;
export declare function closePalette(payload?: CrusherPalettePayload): void;
export declare function togglePalette(payload?: CrusherPalettePayload): void;
