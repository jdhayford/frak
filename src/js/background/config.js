export const getStorage = async () => new Promise((resolve) => {
  chrome.storage.local.get(['somethingStored'], (result) => {
    const value = result.backendTarget || 'default';
    resolve(value);
  });
});