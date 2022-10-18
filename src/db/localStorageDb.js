class LocalStorageDB {
  name;
  constructor(name) {
    if (name !== undefined) {
      this.name = name;
    } else {
      this.name = "DEFAULT_DB";
    }
  }
  insert(key, value) {
    localStorage.setItem(this.name + "/" + key, value);
  }
  delete(key) {
    localStorage.removeItem(this.name + "/" + key);
  }
  get(key) {
    return localStorage.getItem(this.name + "/" + key);
  }
  deleteAll() {
    localStorage.clear();
    console.log("delete");
  }
}
export default LocalStorageDB;
