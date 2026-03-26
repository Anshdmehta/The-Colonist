import os
import sys

try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

def process_logo(file_path):
    print(f"Processing {file_path}")
    img = Image.open(file_path).convert("RGBA")
    width, height = img.size
    
    pixels = img.load()
    
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((width-1, 0)),
        img.getpixel((0, height-1)),
        img.getpixel((width-1, height-1))
    ]
    
    transparent_corners = sum(1 for c in corners if c[3] < 128)
    if transparent_corners >= 2:
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                pixels[x, y] = (255, 255, 255, a)
    else:
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                lum = int(0.299*r + 0.587*g + 0.114*b)
                new_a = int(((255 - lum) / 255.0) * a)
                pixels[x, y] = (255, 255, 255, new_a)
                
    for y in range(height):
        for x in range(width):
            if pixels[x, y][3] < 10:
                pixels[x, y] = (255, 255, 255, 0)
                
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    new_height = 100
    if img.height > 0:
        new_width = int(img.width * (new_height / img.height))
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
    out_name = os.path.splitext(file_path)[0] + ".webp"
    img.save(out_name, "WEBP")
    print(f"Saved {out_name}")

if __name__ == "__main__":
    folder = "d:/NEW PRACTICE/THE COLONIST WEBSITE/The-Colonist/frontend/public/logos"
    for file in os.listdir(folder):
        if file.lower().endswith(('.png', '.jpg', '.jpeg')) and not file.endswith('.webp'):
            process_logo(os.path.join(folder, file))
