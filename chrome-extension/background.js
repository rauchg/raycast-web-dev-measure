async function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

chrome.tabs.onUpdated.addListener(function (_tabId, _changeInfo, tab) {
  console.log(tab);
  if (tab.url.includes("https://web.dev/measure/")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runAudit,
    });
  }
});

function runAudit(givenName) {
  const button = document.getElementById("run-lh-button");
  const input = document.querySelector(".lh-enterurl .lh-input");
  if (input.value != "" && button.getAttribute("disabled") !== "disabled") {
    button.click();
  }
}
