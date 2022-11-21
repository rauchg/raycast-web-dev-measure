async function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

chrome.tabs.onUpdated.addListener(function (_tabId, _changeInfo, tab) {
  console.log(tab);
  if (tab.url.includes("https://pagespeed.web.dev/")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runAudit,
    });
  }
});

function runAudit(givenName) {
  const button = document.querySelector("form button");
  const input = document.querySelector("form input");
  if (input.value != "" && button.getAttribute("disabled") !== "disabled") {
    button.click();
  }
}
