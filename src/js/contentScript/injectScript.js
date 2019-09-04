const injectScript = () => {
  var script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.bundle.js');
  (document.head || document.documentElement).appendChild(script);
};

export default injectScript;