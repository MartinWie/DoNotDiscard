chrome.tabs.onCreated.addListener(function(tab) {
  if (shouldDiscardBeDisabled(tab)){
    disableAutoDiscardForTab(tab.id);
  }
});

chrome.tabs.onReplaced.addListener(function(tabId) {
  let tmpTab = chrome.tabs.get(tabId)
  if (shouldDiscardBeDisabled(tmpTab)){
    disableAutoDiscardForTab(tabId);
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (shouldDiscardBeDisabled(tab)){
    disableAutoDiscardForTab(tabId);
  }
});

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      if(shouldDiscardBeDisabled(tab)){
        disableAutoDiscardForTab(tab.id);
      }
    });
  });
});

function disableAutoDiscardForTab(tabId){
  chrome.tabs.update(tabId, {autoDiscardable: false});
}

function shouldDiscardBeDisabled(tab){
  let subString = 'troy'
  return isSubStringInDomain(tab,subString)
}

function isSubStringInDomain(tab,subString){
  return (tab.url.indexOf(subString) != -1)
}