chrome.tabs.onCreated.addListener(function(tab) {
  if (tab.url.indexOf('troy') != -1){
    chrome.tabs.update(tab.id, {autoDiscardable: false});
  }
});

chrome.tabs.onReplaced.addListener(function(tabId) {
  let tmpTab = chrome.tabs.get(tabId)
  if (tmpTab.url.indexOf('troy') != -1){
    chrome.tabs.update(tabId, {autoDiscardable: false});
  }
});

chrome.tabs.onActivated.addListener(function(tab) {
  if (tab.url.indexOf('troy') != -1){
    chrome.tabs.update(tab.id, {autoDiscardable: false});
  }
});

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      if(tab.url.indexOf('troy') != -1){
        chrome.tabs.update(tab.id, {autoDiscardable: false});
      }
    });
  });
});

