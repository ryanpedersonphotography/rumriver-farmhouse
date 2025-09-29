#!/usr/bin/env python3
"""
Extract individual pushpins from a transparent PNG containing multiple pins.
Uses OpenCV to detect and separate each pin based on contours.
"""

import sys
import os
import cv2
import numpy as np
from PIL import Image
import json
from pathlib import Path

def extract_pins(input_path, output_dir):
    """
    Extract individual pins from a transparent PNG.
    
    Args:
        input_path: Path to the input PNG with transparent background
        output_dir: Directory to save extracted pins
    """
    # Read image with alpha channel
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Error: Could not read image from {input_path}")
        return []
    
    # Get alpha channel
    if img.shape[2] == 4:
        alpha = img[:, :, 3]
    else:
        print("Warning: Image doesn't have alpha channel, using grayscale")
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, alpha = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)
    
    # Apply morphological operations to clean up the alpha mask
    kernel = np.ones((3, 3), np.uint8)
    alpha_clean = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel)
    alpha_clean = cv2.morphologyEx(alpha_clean, cv2.MORPH_OPEN, kernel)
    
    # Find contours of individual pins
    contours, _ = cv2.findContours(alpha_clean, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Filter contours by area (remove very small noise)
    min_area = 100  # Minimum pixel area for a valid pin
    valid_contours = [c for c in contours if cv2.contourArea(c) > min_area]
    
    # Sort contours by x-position (left to right)
    valid_contours = sorted(valid_contours, key=lambda c: cv2.boundingRect(c)[0])
    
    extracted_pins = []
    
    for idx, contour in enumerate(valid_contours):
        # Get bounding rectangle
        x, y, w, h = cv2.boundingRect(contour)
        
        # Add padding to ensure we capture the full pin
        padding = 10
        x_start = max(0, x - padding)
        y_start = max(0, y - padding)
        x_end = min(img.shape[1], x + w + padding)
        y_end = min(img.shape[0], y + h + padding)
        
        # Extract the pin region
        pin_region = img[y_start:y_end, x_start:x_end]
        
        # Create a mask for this specific pin
        mask = np.zeros((y_end - y_start, x_end - x_start), dtype=np.uint8)
        shifted_contour = contour - [x_start, y_start]
        cv2.drawContours(mask, [shifted_contour], -1, 255, -1)
        
        # Apply mask to alpha channel
        if pin_region.shape[2] == 4:
            pin_region[:, :, 3] = cv2.bitwise_and(pin_region[:, :, 3], mask)
        
        # Save the extracted pin
        output_path = os.path.join(output_dir, f"pin_{idx:02d}.png")
        cv2.imwrite(output_path, pin_region)
        
        # Get pin color (sample from center of bounding box)
        center_x = w // 2
        center_y = h // 2
        if pin_region.shape[2] >= 3:
            b, g, r = pin_region[center_y, center_x][:3]
            color_hex = f"#{r:02x}{g:02x}{b:02x}"
        else:
            color_hex = "#808080"
        
        extracted_pins.append({
            'file': f"pin_{idx:02d}.png",
            'dimensions': f"{w}x{h}",
            'color': color_hex,
            'position': {'x': x, 'y': y}
        })
        
        print(f"  ✓ Extracted pin_{idx:02d}.png ({w}x{h} pixels, color: {color_hex})")
    
    return extracted_pins

def optimize_pins(output_dir):
    """
    Optimize extracted pins by removing extra transparent space.
    """
    pin_files = sorted(Path(output_dir).glob("pin_*.png"))
    
    for pin_file in pin_files:
        # Open with PIL to trim transparent borders
        img = Image.open(pin_file)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Get bounding box of non-transparent pixels
        bbox = img.getbbox()
        
        if bbox:
            # Crop to content
            img_cropped = img.crop(bbox)
            
            # Save optimized version
            img_cropped.save(pin_file, 'PNG', optimize=True)
            print(f"  ⚡ Optimized {pin_file.name}")

def main():
    if len(sys.argv) != 3:
        print("Usage: python extract_pins.py <input_png> <output_dir>")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_dir = sys.argv[2]
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Processing {input_path}...")
    
    # Extract pins
    pins_data = extract_pins(input_path, output_dir)
    
    if not pins_data:
        print("No pins extracted!")
        sys.exit(1)
    
    print(f"\n📌 Extracted {len(pins_data)} pins")
    
    # Optimize extracted pins
    print("\nOptimizing extracted pins...")
    optimize_pins(output_dir)
    
    # Save extraction metadata
    metadata_path = os.path.join(output_dir, "extraction_metadata.json")
    with open(metadata_path, 'w') as f:
        json.dump({
            'source': os.path.basename(input_path),
            'pins': pins_data,
            'total': len(pins_data)
        }, f, indent=2)
    
    print(f"\n✅ Complete! Metadata saved to {metadata_path}")

if __name__ == "__main__":
    main()