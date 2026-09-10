import json
import sys
from pathlib import Path
from PIL import Image, ImageDraw

records=json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
sheet=Image.new('RGB',(1280,320*((len(records)+3)//4)),(235,235,235))
draw=ImageDraw.Draw(sheet)
for index,record in enumerate(records):
    path=record.get('imageUrl') or record['sourcePath']
    with Image.open(path) as image:
        image=image.convert('RGBA')
        image.thumbnail((290,280))
        x=(index%4)*320+(320-image.width)//2
        y=(index//4)*320
        sheet.paste(image,(x,y),image)
        draw.text(((index%4)*320+4,y+284),record['canonicalKey'],fill='black')
        draw.text(((index%4)*320+4,y+299),record['canonicalNameEn'],fill='black')
sheet.save(sys.argv[2],quality=93)
