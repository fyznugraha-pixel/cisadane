import fitz
import sys
import os

doc = fitz.open(sys.argv[1])
page = doc[0]

texts = page.get_text("dict")["blocks"]
images = page.get_images(full=True)

print("--- TEXTS ---")
for block in texts:
    if block['type'] == 0:  # text
        for line in block["lines"]:
            for span in line["spans"]:
                print(f"Text: '{span['text']}' at {span['bbox']}")

print("--- IMAGES ---")
os.makedirs("public/images/partners/extracted", exist_ok=True)
for img_index, img in enumerate(images):
    xref = img[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image["image"]
    image_ext = base_image["ext"]
    
    # Get image position (bounding box)
    rects = page.get_image_rects(xref)
    if rects:
        print(f"Image {img_index}.{image_ext} at {rects[0]}")
    else:
        print(f"Image {img_index}.{image_ext} without rect")
        
    image_filename = f"public/images/partners/extracted/logo_{img_index}.{image_ext}"
    with open(image_filename, "wb") as f:
        f.write(image_bytes)
