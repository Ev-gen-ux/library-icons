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
  const softFill = "0.24";

  return {
    home:
      `<path d="M${s(4)} ${s(10.5)}L${s(12)} ${s(4)}L${s(20)} ${s(10.5)}V${s(19)}H${s(14.5)}V${s(13)}H${s(9.5)}V${s(19)}H${s(4)}V${s(10.5)}Z" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(4)} ${s(10.5)}L${s(12)} ${s(4)}L${s(20)} ${s(10.5)}V${s(19)}H${s(14.5)}V${s(13)}H${s(9.5)}V${s(19)}H${s(4)}V${s(10.5)}Z" stroke="${COLOR}" stroke-width="${sw}" stroke-linejoin="round"/>`,
    search:
      `<circle cx="${s(10.5)}" cy="${s(10.5)}" r="${s(5.5)}" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<circle cx="${s(10.5)}" cy="${s(10.5)}" r="${s(5.5)}" stroke="${COLOR}" stroke-width="${sw}"/>` +
      `<path d="M${s(15)} ${s(15)}L${s(20)} ${s(20)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round"/>`,
    user:
      `<circle cx="${s(12)}" cy="${s(8.5)}" r="${s(3.5)}" fill="none"/>` +
      `<circle cx="${s(12)}" cy="${s(8.5)}" r="${s(3.5)}" stroke="${COLOR}" stroke-width="${sw}"/>` +
      `<path d="M${s(5)} ${s(19)}C${s(5)} ${s(15.3)} ${s(8)} ${s(13.4)} ${s(12)} ${s(13.4)}C${s(16)} ${s(13.4)} ${s(19)} ${s(15.3)} ${s(19)} ${s(19)}V${s(20)}H${s(5)}Z" fill="${COLOR}"/>`,
    settings:
      `<circle cx="${s(12)}" cy="${s(12)}" r="${s(3)}" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<circle cx="${s(12)}" cy="${s(12)}" r="${s(3)}" stroke="${COLOR}" stroke-width="${sw}"/>` +
      `<path d="M${s(12)} ${s(4)}V${s(6.4)}M${s(12)} ${s(17.6)}V${s(20)}M${s(4)} ${s(12)}H${s(6.4)}M${s(17.6)} ${s(12)}H${s(20)}M${s(6.35)} ${s(6.35)}L${s(8.05)} ${s(8.05)}M${s(15.95)} ${s(15.95)}L${s(17.65)} ${s(17.65)}M${s(17.65)} ${s(6.35)}L${s(15.95)} ${s(8.05)}M${s(8.05)} ${s(15.95)}L${s(6.35)} ${s(17.65)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round"/>`,
    check:
      `<circle cx="${s(12)}" cy="${s(12)}" r="${s(9)}" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(6)} ${s(12.2)}L${s(10.1)} ${s(16)}L${s(18.2)} ${s(8)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`,
    close:
      `<circle cx="${s(12)}" cy="${s(12)}" r="${s(9)}" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(7.3)} ${s(7.3)}L${s(16.7)} ${s(16.7)}M${s(16.7)} ${s(7.3)}L${s(7.3)} ${s(16.7)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round"/>`,
    "arrow-right":
      `<path d="M${s(4)} ${s(9.8)}H${s(13.4)}V${s(14.2)}H${s(4)}Z" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(13)} ${s(6.2)}L${s(19.3)} ${s(12)}L${s(13)} ${s(17.8)}V${s(6.2)}Z" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(4)} ${s(12)}H${s(18)}M${s(12.8)} ${s(6.4)}L${s(18)} ${s(12)}L${s(12.8)} ${s(17.6)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`,
    "arrow-up":
      `<path d="M${s(9.8)} ${s(6)}H${s(14.2)}V${s(15.4)}H${s(9.8)}Z" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(6.2)} ${s(11)}L${s(12)} ${s(4.7)}L${s(17.8)} ${s(11)}H${s(6.2)}Z" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(12)} ${s(20)}V${s(6)}M${s(6.4)} ${s(11.2)}L${s(12)} ${s(6)}L${s(17.6)} ${s(11.2)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`,
    "arrow-down":
      `<path d="M${s(9.8)} ${s(8.6)}H${s(14.2)}V${s(18)}H${s(9.8)}Z" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(6.2)} ${s(13)}L${s(12)} ${s(19.3)}L${s(17.8)} ${s(13)}H${s(6.2)}Z" fill="${COLOR}" fill-opacity="${softFill}"/>` +
      `<path d="M${s(12)} ${s(4)}V${s(18)}M${s(6.4)} ${s(12.8)}L${s(12)} ${s(18)}L${s(17.6)} ${s(12.8)}" stroke="${COLOR}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`
  };
}
