import fitz  # PyMuPDF
import sys

doc = fitz.open(sys.argv[1])
for i in range(len(doc)):
    page = doc[i]
    print(f"--- Page {i+1} ---")
    print(page.get_text())
