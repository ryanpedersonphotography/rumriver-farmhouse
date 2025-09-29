#!/usr/bin/env zsh

# Extract individual pins from pins.png
# Creates transparent PNGs for each pushpin

set -e

# Configuration
SCRIPT_DIR="$(dirname "$0")"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PINS_SOURCE="$PROJECT_ROOT/public/assets/pins.png"
OUTPUT_DIR="$PROJECT_ROOT/public/assets/pins"
PYTHON_TOOL="$PROJECT_ROOT/tools/extract_pins.py"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "${GREEN}🔧 Pin Extraction Tool${NC}"
echo "========================"

# Check if source file exists
if [[ ! -f "$PINS_SOURCE" ]]; then
    echo "${RED}❌ Error: pins.png not found at $PINS_SOURCE${NC}"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Check Python dependencies
echo "${YELLOW}📦 Checking dependencies...${NC}"
python3 -c "import cv2" 2>/dev/null || {
    echo "${RED}❌ OpenCV not installed. Run: pip install opencv-python${NC}"
    exit 1
}

python3 -c "import numpy" 2>/dev/null || {
    echo "${RED}❌ NumPy not installed. Run: pip install numpy${NC}"
    exit 1
}

python3 -c "from PIL import Image" 2>/dev/null || {
    echo "${RED}❌ Pillow not installed. Run: pip install Pillow${NC}"
    exit 1
}

# Check if rembg is installed
if ! command -v rembg &> /dev/null; then
    echo "${RED}❌ rembg not installed. Run: pip install rembg[gpu]${NC}"
    exit 1
fi

# Step 1: Remove background from pins.png
echo "${YELLOW}🎨 Removing background...${NC}"
TEMP_NOBG="$OUTPUT_DIR/pins_nobg.png"
rembg i "$PINS_SOURCE" "$TEMP_NOBG"

if [[ ! -f "$TEMP_NOBG" ]]; then
    echo "${RED}❌ Background removal failed${NC}"
    exit 1
fi

# Step 2: Extract individual pins using Python script
echo "${YELLOW}✂️  Extracting individual pins...${NC}"
python3 "$PYTHON_TOOL" "$TEMP_NOBG" "$OUTPUT_DIR"

# Step 3: Generate manifest
echo "${YELLOW}📝 Generating manifest...${NC}"
MANIFEST="$OUTPUT_DIR/manifest.json"
cat > "$MANIFEST" <<'EOF'
{
  "pins": [
EOF

first=true
for pin in "$OUTPUT_DIR"/pin_*.png; do
    if [[ -f "$pin" ]]; then
        basename=$(basename "$pin")
        # Get image dimensions
        dimensions=$(identify -format "%wx%h" "$pin" 2>/dev/null || echo "unknown")
        
        if [[ "$first" == true ]]; then
            first=false
        else
            echo "," >> "$MANIFEST"
        fi
        
        cat >> "$MANIFEST" <<EOF
    {
      "file": "$basename",
      "path": "/assets/pins/$basename",
      "dimensions": "$dimensions"
    }
EOF
    fi
done

cat >> "$MANIFEST" <<'EOF'

  ],
  "generated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "source": "pins.png",
  "total": $(ls -1 "$OUTPUT_DIR"/pin_*.png 2>/dev/null | wc -l | tr -d ' ')
}
EOF

# Clean up temporary file
rm -f "$TEMP_NOBG"

# Report results
echo "${GREEN}✅ Extraction complete!${NC}"
echo "   📁 Output directory: $OUTPUT_DIR"
echo "   📌 Pins extracted: $(ls -1 "$OUTPUT_DIR"/pin_*.png 2>/dev/null | wc -l | tr -d ' ')"
echo "   📄 Manifest: $MANIFEST"
echo ""
echo "Next steps:"
echo "1. Review extracted pins in $OUTPUT_DIR"
echo "2. Import PinOverlay component in your React app"
echo "3. Use with: <PinOverlay variant={pinIndex} />"