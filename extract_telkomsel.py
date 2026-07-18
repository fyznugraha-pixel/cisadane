import fitz

doc = fitz.open("Placement Logo Logo.pdf")
page = doc[0]

# Try to find the missing sponsor logo in the gap between x=3832 and x=5120
# y range is approximately 1730 to 2174
rect = fitz.Rect(3900, 1700, 5050, 2200)

# Render that specific rectangle
pix = page.get_pixmap(clip=rect, dpi=300)
pix.save("public/partners/sponsored/sponsored_4.png")
print("Cropped missing sponsor logo to sponsored_4.png")
