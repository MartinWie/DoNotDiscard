chrome.tabs.onCreated.addListener( tab =>
  discardManaging(tab)
);

chrome.tabs.onReplaced.addListener(function(tabId) {
  let tab = chrome.tabs.get(tabId)
  discardManaging(tab)
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  discardManaging(tab)
});

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      discardManaging(tab)
    });
  });
});

function discardManaging(tab){
  if(shouldDiscardBeDisabled(tab)){
    disableAutoDiscardForTab(tab.id);
  }
}

function disableAutoDiscardForTab(tabId){
  chrome.tabs.update(tabId, {autoDiscardable: false});
}

function shouldDiscardBeDisabled(tab){
  let doNotSuspends = ["troy", "music", "active"]

  return isTabUrlInList(doNotSuspends,tab)
}

function isTabUrlInList(list,tab){
  if(list.filter(
      entry => isSubStringInDomain(tab,entry)
    ).length > 0){
      return true
  } else {
      return false
  }

}

function isSubStringInDomain(tab,subString){
  return (tab.url.indexOf(subString) != -1)
}