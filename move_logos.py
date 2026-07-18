import os
import shutil

src_dir = "public/images/partners/extracted"
dst_dir = "public/partners"

os.makedirs(dst_dir, exist_ok=True)
for category in ["organized", "sponsored", "tech", "digital", "waste", "transport", "collaboration"]:
    os.makedirs(os.path.join(dst_dir, category), exist_ok=True)

mapping = {
    "organized": [0],
    "sponsored": [1, 12, 23],
    "tech": [45],
    "digital": [34],
    "waste": [52, 53],
    "transport": [54],
    "collaboration": [30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51]
}

def find_file(prefix):
    for f in os.listdir(src_dir):
        if f.startswith(prefix + "."):
            return f
    return None

for category, ids in mapping.items():
    for i, img_id in enumerate(ids):
        filename = find_file(f"logo_{img_id}")
        if filename:
            src = os.path.join(src_dir, filename)
            ext = filename.split(".")[-1]
            dst = os.path.join(dst_dir, category, f"{category}_{i+1}.{ext}")
            shutil.copy(src, dst)
            print(f"Copied {filename} to {category}_{i+1}.{ext}")
