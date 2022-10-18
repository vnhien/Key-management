import Dexie from "dexie";

class IndexedDB {
  name;
  constructor(name) {
    if (name !== undefined) {
      this.name = name;
    } else {
      this.name = "DEFAULT_DB";
    }
  }
  test() {
    const db = new Dexie("testDatabase");
    db.version(1).stores({
      friends: "++id, name, age", // Primary key and indexed props
    });
    console.log("done");
  }
  insert(key, value) {
    localStorage.setItem(this.name + "/" + key, value);
  }
  delete(key) {
    localStorage.removeItem(this.name + "/" + key);
  }
  get(key) {
    localStorage.getItem(this.name);
  }
  deleteAll() {
    console.log("delete");
  }
}
export default IndexedDB;
