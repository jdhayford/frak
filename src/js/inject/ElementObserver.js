class ElementObserver {
  constructor() {
    this.observer = null;
    this.callback = () => {};
  }

  onChange(func) {
    this.callback = func;
  }

  observe(element) {
    this.observer = new MutationObserver(this.callback.bind(this));
    this.observer.observe(element, { attributes: true, childList: true });
  }
}

export default ElementObserver;