// Color utility functions for generating variants from a base color

/**
 * Converts hex color to HSL
 */
const hexToHsl = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

/**
 * Converts HSL to hex color
 */
const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Generates color variants by adjusting lightness
 */
export const generateLightnessVariants = (
  baseColor: string, 
  count: number = 5,
  minLightness: number = 20,
  maxLightness: number = 90
): string[] => {
  const [h, s, _l] = hexToHsl(baseColor);
  const variants: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const lightness = minLightness + (maxLightness - minLightness) * (i / (count - 1));
    variants.push(hslToHex(h, s, lightness));
  }
  
  return variants;
};

/**
 * Generates color variants by adjusting saturation
 */
export const generateSaturationVariants = (
  baseColor: string, 
  count: number = 5,
  minSaturation: number = 10,
  maxSaturation: number = 100
): string[] => {
  const [h, _s, l] = hexToHsl(baseColor);
  const variants: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const saturation = minSaturation + (maxSaturation - minSaturation) * (i / (count - 1));
    variants.push(hslToHex(h, saturation, l));
  }
  
  return variants;
};

/**
 * Generates color variants by adjusting hue (creating analogous colors)
 */
export const generateHueVariants = (
  baseColor: string, 
  count: number = 5,
  hueStep: number = 30
): string[] => {
  const [h, s, l] = hexToHsl(baseColor);
  const variants: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const hue = (h + i * hueStep) % 360;
    variants.push(hslToHex(hue, s, l));
  }
  
  return variants;
};

/**
 * Generates complementary color variants
 */
export const generateComplementaryVariants = (
  baseColor: string, 
  count: number = 5
): string[] => {
  const [h, s, l] = hexToHsl(baseColor);
  const variants: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const hue = (h + (i * 180 / count)) % 360;
    variants.push(hslToHex(hue, s, l));
  }
  
  return variants;
};

/**
 * Generates color variants with alpha transparency
 */
export const generateAlphaVariants = (
  baseColor: string, 
  count: number = 5,
  minAlpha: number = 0.1,
  maxAlpha: number = 1
): string[] => {
  const variants: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const alpha = minAlpha + (maxAlpha - minAlpha) * (i / (count - 1));
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    variants.push(`rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`);
  }
  
  return variants;
};

/**
 * Generates a comprehensive color palette with multiple variants
 */
export const generateColorPalette = (
  baseColor: string,
  options: {
    lightnessCount?: number;
    saturationCount?: number;
    hueCount?: number;
    alphaCount?: number;
  } = {}
): {
  lightness: string[];
  saturation: string[];
  hue: string[];
  alpha: string[];
  complementary: string[];
} => {
  const {
    lightnessCount = 5,
    saturationCount = 5,
    hueCount = 5,
    alphaCount = 5
  } = options;

  return {
    lightness: generateLightnessVariants(baseColor, lightnessCount),
    saturation: generateSaturationVariants(baseColor, saturationCount),
    hue: generateHueVariants(baseColor, hueCount),
    alpha: generateAlphaVariants(baseColor, alphaCount),
    complementary: generateComplementaryVariants(baseColor, 5)
  };
};

/**
 * Simple approach: Generate variants by adding/subtracting RGB values
 */
export const generateSimpleVariants = (
  baseColor: string,
  count: number = 5,
  step: number = 30
): string[] => {
  const variants: string[] = [];
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);
  
  for (let i = 0; i < count; i++) {
    const factor = 1 + (i - Math.floor(count / 2)) * (step / 100);
    const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
    const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
    const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
    
    variants.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
  }
  
  return variants;
};

// Example usage and export
export const exampleUsage = () => {
  const baseColor = '#002147';
  
  // Generate different types of variants
  const lightnessVariants = generateLightnessVariants(baseColor, 7);
  const saturationVariants = generateSaturationVariants(baseColor, 5);
  const hueVariants = generateHueVariants(baseColor, 6);
  const alphaVariants = generateAlphaVariants(baseColor, 4);
  const simpleVariants = generateSimpleVariants(baseColor, 5);
  
  // Generate complete palette
  const palette = generateColorPalette(baseColor, {
    lightnessCount: 7,
    saturationCount: 5,
    hueCount: 6,
    alphaCount: 4
  });
  
  return {
    lightnessVariants,
    saturationVariants,
    hueVariants,
    alphaVariants,
    simpleVariants,
    palette
  };
}; 