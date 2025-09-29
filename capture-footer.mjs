import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewport({
    width: 1920,
    height: 1080
  });

  // Navigate to the local site
  await page.goto('http://localhost:3001/', {
    waitUntil: 'networkidle0'
  });

  // Wait for footer to be visible
  await page.waitForSelector('.site-footer', { visible: true });

  // Scroll to footer
  await page.evaluate(() => {
    document.querySelector('.site-footer').scrollIntoView({ behavior: 'smooth' });
  });

  // Wait a moment for scroll to complete
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Take a screenshot of the footer
  const footer = await page.$('.site-footer');
  if (footer) {
    await footer.screenshot({ path: 'footer-screenshot.png' });
    console.log('Footer screenshot saved as footer-screenshot.png');
    
    // Get computed styles of footer elements
    const footerStyles = await page.evaluate(() => {
      const footer = document.querySelector('.site-footer');
      const footerContent = document.querySelector('.footer-content');
      const footerSection = document.querySelector('.footer-section');
      
      return {
        footer: {
          display: getComputedStyle(footer).display,
          padding: getComputedStyle(footer).padding,
          background: getComputedStyle(footer).background,
          minHeight: getComputedStyle(footer).minHeight,
          height: getComputedStyle(footer).height,
          overflow: getComputedStyle(footer).overflow,
          position: getComputedStyle(footer).position
        },
        footerContent: footerContent ? {
          display: getComputedStyle(footerContent).display,
          flexDirection: getComputedStyle(footerContent).flexDirection,
          gap: getComputedStyle(footerContent).gap,
          padding: getComputedStyle(footerContent).padding,
          height: getComputedStyle(footerContent).height
        } : null,
        footerSection: footerSection ? {
          display: getComputedStyle(footerSection).display,
          padding: getComputedStyle(footerSection).padding,
          textVisible: !!footerSection.textContent.trim()
        } : null
      };
    });
    
    console.log('Footer styles:', JSON.stringify(footerStyles, null, 2));
    
    // Check for any console errors
    const errors = await page.evaluate(() => {
      const errorElements = document.querySelectorAll('.footer-content *');
      const issues = [];
      errorElements.forEach(el => {
        const styles = getComputedStyle(el);
        if (styles.display === 'none' || styles.visibility === 'hidden') {
          issues.push({
            tag: el.tagName,
            class: el.className,
            display: styles.display,
            visibility: styles.visibility
          });
        }
      });
      return issues;
    });
    
    if (errors.length > 0) {
      console.log('Hidden elements found:', errors);
    }
  }

  // Keep browser open for manual inspection
  console.log('Browser will remain open for inspection. Press Ctrl+C to exit.');
})();