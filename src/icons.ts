export const SIZES = [24, 20, 16] as const;
export type IconSize = (typeof SIZES)[number];

const STROKES: Record<IconSize, number> = { 24: 2, 20: 1.5, 16: 1 };
const COLOR = "currentColor";

function scaler(size: IconSize) {
  const sf = size / 24;
  return (value: number) => {
    const scaled = value * sf;
    return `${scaled.toFixed(2)}`.replace(/\.?0+$/, "");
  };
}

export function iconSet(size: IconSize): Record<string, string> {
  const sw = STROKES[size];
  const s = scaler(size);

  return {
    home:
      `<path d="M${s(4)} ${s(10.5)}L${s(12)} ${s(4)}L${s(20)} ${s(10.5)}V${s(19)}H${s(14.5)}V${s(13)}H${s(9.5)}V${s(19)}H${s(4)}V${s(10.5)}Z" fill="${COLOR}" fill-opacity="0.2"/>` +
      `<path d="M${s(4)} ${s(10.5)}L${s(12)} ${s(4)}L${s(20)} ${s(10.5)}V${s(19)}H${s(14.5)}V${s(13)}H${s(9.5)}V${s(19)}H${s(4)}V${s(10.5)}Z" stroke="${COLOR}" stroke-width="${sw}" stroke-linejoin="round"/>`,
    search:
      `<circle cx="${s(10.5)}" cy="${s(10.5)}" r="${s(5.5)}" fill="${COLOR}" fill-opacity="0.2"/>` +
      `<circle cx="${s(10.5)}" cy="${s(10.5)}" r="${s(5.5)}" stroke="${COLOR}" stroke-width="${sw}"/>` +
      `<path d="M${s(15)} ${s(15)}L${s(20)} ${s(20)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round"/>`,
    user:
      `<circle cx="${s(12)}" cy="${s(8.5)}" r="${s(3.5)}" fill="${COLOR}" fill-opacity="0.2"/>` +
      `<circle cx="${s(12)}" cy="${s(8.5)}" r="${s(3.5)}" stroke="${COLOR}" stroke-width="${sw}"/>` +
      `<path d="M${s(5)} ${s(19)}C${s(5)} ${s(15.5)} ${s(8)} ${s(13.5)} ${s(12)} ${s(13.5)}C${s(16)} ${s(13.5)} ${s(19)} ${s(15.5)} ${s(19)} ${s(19)}" fill="${COLOR}" fill-opacity="0.2"/>` +
      `<path d="M${s(5)} ${s(19)}C${s(5)} ${s(15.5)} ${s(8)} ${s(13.5)} ${s(12)} ${s(13.5)}C${s(16)} ${s(13.5)} ${s(19)} ${s(15.5)} ${s(19)} ${s(19)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round"/>`,
    settings:
      `<circle cx="${s(12)}" cy="${s(12)}" r="${s(3)}" fill="${COLOR}" fill-opacity="0.2"/>` +
      `<circle cx="${s(12)}" cy="${s(12)}" r="${s(3)}" stroke="${COLOR}" stroke-width="${sw}"/>` +
      `<path d="M${s(12)} ${s(4)}V${s(6.4)}M${s(12)} ${s(17.6)}V${s(20)}M${s(4)} ${s(12)}H${s(6.4)}M${s(17.6)} ${s(12)}H${s(20)}M${s(6.35)} ${s(6.35)}L${s(8.05)} ${s(8.05)}M${s(15.95)} ${s(15.95)}L${s(17.65)} ${s(17.65)}M${s(17.65)} ${s(6.35)}L${s(15.95)} ${s(8.05)}M${s(8.05)} ${s(15.95)}L${s(6.35)} ${s(17.65)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round"/>`,
    check: `<path d="M${s(4)} ${s(12)}L${s(9.2)} ${s(17)}L${s(20)} ${s(7)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`,
    close: `<path d="M${s(6)} ${s(6)}L${s(18)} ${s(18)}M${s(18)} ${s(6)}L${s(6)} ${s(18)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round"/>`,
    "arrow-right": `<path d="M${s(4)} ${s(12)}H${s(19)}M${s(13)} ${s(6)}L${s(19)} ${s(12)}L${s(13)} ${s(18)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`,
    "arrow-up": `<path d="M${s(12)} ${s(20)}V${s(5)}M${s(6)} ${s(11)}L${s(12)} ${s(5)}L${s(18)} ${s(11)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`,
    "arrow-down": `<path d="M${s(12)} ${s(4)}V${s(19)}M${s(6)} ${s(13)}L${s(12)} ${s(19)}L${s(18)} ${s(13)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`
  };
}
