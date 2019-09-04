class BuildTracker {
  constructor() {
    this.expectedHash = null;
    this.actualHash = null;
    chrome.runtime.sendMessage({ status: 'default' });
  }

  registerExpected(hash) {
    this.expectedHash = hash;
  }

  registerActual(hash) {
    this.actualHash = hash;
  }

  async fetchStoredHash() {
    return new Promise((resolve) => {
      chrome.storage.local.get(([ 'expectedBuildHash' ]), (data) => {
        console.log(`Storage says the expected build is: ${data.expectedBuildHash}`);
        this.expectedHash = data.expectedBuildHash;
        resolve();
      });
    })
  }

  validate() {
    const isFresh = this.expectedHash === this.actualHash;
    const status = isFresh ? "good" : "bad";
    chrome.runtime.sendMessage({ status });
  }

  async confirm() {
    return new Promise((resolve) => {
      chrome.storage.local.set({ expectedBuildHash: this.expectedHash }, resolve);
    });
  }
}

export default BuildTracker;