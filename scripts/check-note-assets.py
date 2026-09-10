"""Read-only technical image audit. It does not certify ingredient identity."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps

def fingerprint(image):
    # Normalize transparent margins and use greyscale to catch resized/recoloured copies.
    rgba = image.convert('RGBA')
    bbox = rgba.getchannel('A').getbbox()
    rgba = rgba.crop(bbox) if bbox else rgba
    bg = Image.new('RGBA', rgba.size, 'white')
    bg.alpha_composite(rgba)
    variants = []
    for angle in (0, 90, 180, 270):
        candidate = bg.rotate(angle, expand=True)
        for variant in (candidate, ImageOps.mirror(candidate)):
            pixels = list(variant.convert('L').resize((9, 8)).getdata())
            bits = [pixels[y*9+x] > pixels[y*9+x+1] for y in range(8) for x in range(8)]
            variants.append(sum(int(bit) << i for i, bit in enumerate(bits)))
    return min(variants)

rows = []
for path in sorted(Path('assets/notes/generated').glob('*.webp')):
    try:
        with Image.open(path) as im:
            extrema = im.convert('RGBA').getchannel('A').getextrema()
            rows.append(dict(path=path.as_posix(), width=im.width, height=im.height,
                hasAlpha='A' in im.getbands(), alphaExtrema=extrema, bytes=path.stat().st_size,
                sha256=hashlib.sha256(path.read_bytes()).hexdigest(), perceptualHash=f'{fingerprint(im):016x}',
                contentHash=hashlib.sha256(im.convert('RGBA').tobytes()).hexdigest(),
                technicalValid=im.size==(320,320) and 'A' in im.getbands() and extrema==(0,255) and path.stat().st_size<102400))
    except Exception as error:
        rows.append(dict(path=path.as_posix(), technicalValid=False, error=str(error)))
print(json.dumps(rows, ensure_ascii=False))
