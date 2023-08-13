class Storage {
  constructor(storage) {
    this.storage = storage;
    this.keys = {
      limit: `limit`,
      total: `total`,
      postContainer: `postContainer`,
      fullPostContainer: `fullPostContainer`,
    };
  }

  setItem(key, value) {
    value = typeof value === "object" ? JSON.stringify(value) : value;
    this.storage.setItem(key, value);
  }

  getItem(key) {
    const value = this.storage.getItem(key);
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clearStorage() {
    this.storage.clear();
  }
}

export default Storage;
