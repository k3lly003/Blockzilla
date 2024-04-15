const blockedSitesFile = 'blocklist.txt';

fetch(chrome.runtime.getURL(blockedSitesFile))
  .then(response => response.text())
  .then(data => {
    const blockedSites = data.split('\n');
    if (blockedSites.includes(window.location.hostname)) {
      // Inject blocking content
      document.head.innerHTML = generateCSS();
      document.body.innerHTML = generateHTML(window.location.hostname);
    }
  });