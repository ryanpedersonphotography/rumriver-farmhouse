import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();

// Set viewport to standard desktop size
await page.setViewport({ width: 1440, height: 900 });

console.log('Loading page...');
await page.goto('https://rumriverfarmhouse.com', { 
  waitUntil: 'networkidle2',
  timeout: 30000 
});

// Wait for hero content to be visible
await page.waitForSelector('.hero-content', { timeout: 10000 });

// Get hero content position info
const heroInfo = await page.evaluate(() => {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const viewportHeight = window.innerHeight;
  
  if (heroContent) {
    const rect = heroContent.getBoundingClientRect();
    const styles = window.getComputedStyle(heroContent);
    
    return {
      viewportHeight,
      heroContentBottom: rect.bottom,
      heroContentTop: rect.top,
      heroContentHeight: rect.height,
      bottomPosition: styles.bottom,
      padding: styles.padding,
      position: styles.position,
      distanceFromViewportBottom: viewportHeight - rect.bottom
    };
  }
  return null;
});

console.log('Hero positioning analysis:', JSON.stringify(heroInfo, null, 2));

// Take screenshot
await page.screenshot({ path: 'hero-screenshot.png', fullPage: false });
console.log('Screenshot saved as hero-screenshot.png');

await browser.close();
