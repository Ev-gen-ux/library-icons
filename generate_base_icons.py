from __future__ import annotations

from pathlib import Path


def svg(size: int, body: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" '
        f'viewBox="0 0 {size} {size}" fill="none">{body}</svg>\n'
    )


def write_icon(base_dir: Path, name: str, size: int, body: str) -> None:
    path = base_dir / f"icon-{name}-{size}.svg"
    path.write_text(svg(size, body), encoding="utf-8")


def make_set(size: int) -> dict[str, str]:
    sw = {24: 1.8, 20: 1.7, 16: 1.5}[size]
    c = "currentColor"
    sf = {24: 1.0, 20: 20 / 24, 16: 16 / 24}[size]

    def s(v: float) -> str:
        scaled = v * sf
        return f"{scaled:.2f}".rstrip("0").rstrip(".")

    return {
        "home": (
            f'<path d="M{s(4)} {s(10.5)}L{s(12)} {s(4)}L{s(20)} {s(10.5)}V{s(19)}'
            f'H{s(14.5)}V{s(13)}H{s(9.5)}V{s(19)}H{s(4)}V{s(10.5)}Z" fill="{c}" fill-opacity="0.2"/>'
            f'<path d="M{s(4)} {s(10.5)}L{s(12)} {s(4)}L{s(20)} {s(10.5)}V{s(19)}H{s(14.5)}V{s(13)}H{s(9.5)}V{s(19)}H{s(4)}V{s(10.5)}Z" '
            f'stroke="{c}" stroke-width="{sw}" stroke-linejoin="round"/>'
        ),
        "search": (
            f'<circle cx="{s(10.5)}" cy="{s(10.5)}" r="{s(5.5)}" fill="{c}" fill-opacity="0.2"/>'
            f'<circle cx="{s(10.5)}" cy="{s(10.5)}" r="{s(5.5)}" stroke="{c}" stroke-width="{sw}"/>'
            f'<path d="M{s(15)} {s(15)}L{s(20)} {s(20)}" stroke="{c}" stroke-width="{sw}" stroke-linecap="round"/>'
        ),
        "user": (
            f'<circle cx="{s(12)}" cy="{s(8.5)}" r="{s(3.5)}" fill="{c}" fill-opacity="0.2"/>'
            f'<circle cx="{s(12)}" cy="{s(8.5)}" r="{s(3.5)}" stroke="{c}" stroke-width="{sw}"/>'
            f'<path d="M{s(5)} {s(19)}C{s(5)} {s(15.5)} {s(8)} {s(13.5)} {s(12)} {s(13.5)}C{s(16)} {s(13.5)} {s(19)} {s(15.5)} {s(19)} {s(19)}" '
            f'fill="{c}" fill-opacity="0.2"/>'
            f'<path d="M{s(5)} {s(19)}C{s(5)} {s(15.5)} {s(8)} {s(13.5)} {s(12)} {s(13.5)}C{s(16)} {s(13.5)} {s(19)} {s(15.5)} {s(19)} {s(19)}" '
            f'stroke="{c}" stroke-width="{sw}" stroke-linecap="round"/>'
        ),
        "settings": (
            f'<circle cx="{s(12)}" cy="{s(12)}" r="{s(3)}" fill="{c}" fill-opacity="0.2"/>'
            f'<circle cx="{s(12)}" cy="{s(12)}" r="{s(3)}" stroke="{c}" stroke-width="{sw}"/>'
            f'<path d="M{s(12)} {s(4)}V{s(6.4)}M{s(12)} {s(17.6)}V{s(20)}M{s(4)} {s(12)}H{s(6.4)}M{s(17.6)} {s(12)}H{s(20)}'
            f'M{s(6.35)} {s(6.35)}L{s(8.05)} {s(8.05)}M{s(15.95)} {s(15.95)}L{s(17.65)} {s(17.65)}'
            f'M{s(17.65)} {s(6.35)}L{s(15.95)} {s(8.05)}M{s(8.05)} {s(15.95)}L{s(6.35)} {s(17.65)}" '
            f'stroke="{c}" stroke-width="{sw}" stroke-linecap="round"/>'
        ),
        "check": (
            f'<path d="M{s(4)} {s(12)}L{s(9.2)} {s(17)}L{s(20)} {s(7)}" stroke="{c}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>'
        ),
        "close": (
            f'<path d="M{s(6)} {s(6)}L{s(18)} {s(18)}M{s(18)} {s(6)}L{s(6)} {s(18)}" '
            f'stroke="{c}" stroke-width="{sw}" stroke-linecap="round"/>'
        ),
        "arrow-right": (
            f'<path d="M{s(4)} {s(12)}H{s(19)}M{s(13)} {s(6)}L{s(19)} {s(12)}L{s(13)} {s(18)}" '
            f'stroke="{c}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>'
        ),
        "arrow-up": (
            f'<path d="M{s(12)} {s(20)}V{s(5)}M{s(6)} {s(11)}L{s(12)} {s(5)}L{s(18)} {s(11)}" '
            f'stroke="{c}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>'
        ),
        "arrow-down": (
            f'<path d="M{s(12)} {s(4)}V{s(19)}M{s(6)} {s(13)}L{s(12)} {s(19)}L{s(18)} {s(13)}" '
            f'stroke="{c}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>'
        ),
    }


def main() -> None:
    root = Path(__file__).resolve().parent
    out_dir = root / "icons"
    out_dir.mkdir(parents=True, exist_ok=True)

    sizes = [24, 20, 16]
    names: list[str] = []

    for size in sizes:
        icon_set = make_set(size)
        for name, body in icon_set.items():
            write_icon(out_dir, name, size, body)
            if name not in names:
                names.append(name)

    readme = root / "BASE_ICON_SET.md"
    readme.write_text(
        "# Base Icon Set\n\n"
        "This starter set follows `ICON_LIBRARY_INSTRUCTIONS.md`.\n\n"
        "- Style: semi-filled\n"
        "- Color: `currentColor` only\n"
        "- Sizes: independent files for 24/20/16\n"
        "- Figma import: each SVG is a separate component source\n\n"
        "## Included Icons\n\n"
        + "\n".join(f"- `{name}`" for name in names)
        + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
