import puppeteer from 'puppeteer';

async function captureGallery() {
  const browser = await puppeteer.launch({
    headless: false, // Show browser to see what's happening
    defaultViewport: { width: 1400, height: 900 }
  });
  
  const page = await browser.newPage();
  
  console.log('Loading gallery page...');
  await page.goto('http://localhost:3000/enhanced-gloss-pins.html', {
    waitUntil: 'networkidle2'
  });
  
  // Wait for polaroids to animate in
  await page.waitForTimeout(2000);
  
  // Check if pins are visible
  const pinsVisible = await page.evaluate(() => {
    const pins = document.querySelectorAll('.pin');
    console.log(`Found ${pins.length} pin elements`);
    
    // Check computed styles
    return Array.from(pins).map((pin, index) => {
      const styles = window.getComputedStyle(pin);
      const bgImage = styles.backgroundImage;
      const bgPosition = styles.backgroundPosition;
      const display = styles.display;
      const visibility = styles.visibility;
      const dimensions = pin.getBoundingClientRect();
      
      return {
        index,
        backgroundImage: bgImage,
        backgroundPosition: bgPosition,
        display,
        visibility,
        width: dimensions.width,
        height: dimensions.height,
        top: dimensions.top,
        visible: dimensions.width > 0 && dimensions.height > 0
      };
    });
  });
  
  console.log('Pin visibility check:', pinsVisible);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'gallery-with-pins.png',
    fullPage: false
  });
  
  console.log('Screenshot saved as gallery-with-pins.png');
  
  // Try to fix if pins aren't showing
  if (pinsVisible.some(p => !p.visible || p.backgroundImage === 'none')) {
    console.log('Pins not visible, attempting to fix...');
    
    // Inject corrected styles
    await page.evaluate(() => {
      const pins = document.querySelectorAll('.pin');
      pins.forEach((pin, index) => {
        pin.style.cssText = `
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: 50px;
          height: 50px;
          background-image: url('/pins.png');
          background-size: 300% 300%;
          background-repeat: no-repeat;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
        `;
        
        // Set different positions for each pin
        const positions = [
          '0% 0%',     // Red
          '50% 0%',    // Blue
          '100% 0%',   // Black
          '0% 50%'     // Gold
        ];
        pin.style.backgroundPosition = positions[index] || '0% 0%';
      });
    });
    
    await page.waitForTimeout(1000);
    
    // Take another screenshot
    await page.screenshot({ 
      path: 'gallery-with-pins-fixed.png',
      fullPage: false
    });
    console.log('Fixed screenshot saved as gallery-with-pins-fixed.png');
  }
  
  // Keep browser open to inspect
  console.log('Browser will stay open for inspection. Press Ctrl+C to close.');
  
  // Don't close automatically
  // await browser.close();
}

captureGallery().catch(console.error);