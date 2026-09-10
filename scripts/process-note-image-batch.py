"""Convert identity-locked ImageGen results; never mark semantic review valid."""
import hashlib
import json
import sys
from pathlib import Path
from PIL import Image

records = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
seen = set()
result = []
for record in records:
    key = record['canonicalKey']
    if key in seen or not key or any(c not in 'abcdefghijklmnopqrstuvwxyz0123456789-' for c in key):
        raise ValueError('Invalid or duplicated canonical key')
    seen.add(key)
    target = Path('assets/notes/generated') / (key + '.webp')
    if target.exists():
        raise ValueError('Refusing to overwrite existing asset: ' + str(target))
    with Image.open(record['sourcePath']) as source:
        if 'A' not in source.getbands() or source.getchannel('A').getextrema() != (0, 255):
            raise ValueError('Source lacks genuine transparency: ' + key)
        image = source.convert('RGBA')
        image.thumbnail((288,288), Image.Resampling.LANCZOS)
        canvas = Image.new('RGBA',(320,320),(0,0,0,0))
        canvas.alpha_composite(image,((320-image.width)//2,(320-image.height)//2))
        canvas.save(target,'WEBP',quality=88,method=6)
    with Image.open(target) as check:
        assert check.size == (320,320) and check.getchannel('A').getextrema() == (0,255)
    assert 0 < target.stat().st_size < 102400
    result.append({**record, 'imageUrl':target.as_posix(), 'noteKey':key,
        'noteAssetId':'origo-note-'+key, 'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),
        'status':'GENERATED_UNVERIFIED', 'validated':False})
print(json.dumps(result,ensure_ascii=False))
