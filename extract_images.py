import fitz  # PyMuPDF
import os

pdf_path = "MATERI TACKTLINK SEPUTAR CISADANE.pdf"
output_dir = "public/images/history"

doc = fitz.open(pdf_path)
img_count = 0

for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    
    for img_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        img_count += 1
        image_filename = f"history_{img_count}.{image_ext}"
        image_path = os.path.join(output_dir, image_filename)
        
        with open(image_path, "wb") as f:
            f.write(image_bytes)
        
        print(f"Extracted: {image_filename}")

print(f"Total images extracted: {img_count}")
