function getDB () {
  return window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;
}

export default class IndexDB {
  constructor (dbName, config) {
    this.dbName = dbName;
    this.config = config;
    this.db = null;
  }

  openDB(version = 1) {
    return new Promise((resolve, reject) => {
      const indexedDB = getDB();
      const request = indexedDB.open(this.dbName, version);
      
      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log('数据库打开成功');
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.log('数据库打开报错');
        reject(event);
      };

      request.onupgradeneeded = (event) => {
        console.log('创建数据库');
        this.db = event.target.result;
        const objectStore = this.db.createObjectStore(this.config?.tableName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        this.config?.columns?.forEach(ele => {
          objectStore.createIndex(ele?.key, ele?.key, ele?.parms);
        });
        resolve(this.db);
      };
    });
  }
  
  insertData(data) {
    return new Promise((resolve, reject) => {
      console.log('insertData', this.db);
      const request = this.db
        .transaction([this.config?.tableName], 'readwrite')
        .objectStore(this.config?.tableName)
        .add(data);
  
      request.onsuccess = (event) => {
        console.log('数据写入成功');
        resolve('数据写入成功');
      };
  
      request.onerror = (event) => {
        console.log('数据写入失败');
        reject(new Error('数据写入失败'));
      };
    });
  }
  
  getDataByKey(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.config?.tableName]);
      const objectStore = transaction.objectStore(this.config?.tableName);
      const request = objectStore.get(key);
  
      request.onerror = (event) => {
        console.log('事务失败');
        reject(event);
      };
  
      request.onsuccess = (event) => {
        console.log('主键查询结果: ', request.result);
        resolve(request.result);
      };
    });
  }
  
  getDataByIndex(indexName, indexValue) {
    return new Promise((resolve, reject) => {
      const store = this.db.transaction(this.config?.tableName, 'readwrite').objectStore(this.config?.tableName);
      const request = store.index(indexName).getAll(indexValue);
      request.onerror = (event) => {
        console.log('事务失败');
        reject(event);
      };
      request.onsuccess = function (e) {
        const result = e.target.result;
        console.log('索引查询结果：', result);
        resolve(request.result);
      };
    });
  }
}
