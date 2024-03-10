import IndexDB from '@/utils/indexDB';

export const initDB = async () => {
  const store = new IndexDB('log', {
    tableName: 'log',
    columns: [{
      key: 'type',
      parms: { unique: false },
    }, {
      key: 'content',
      parms: { unique: false },
    }, {
      key: 'stack',
      parms: { unique: false },
    }, {
      key: 'extra',
      parms: { unique: false },
    }, {
      key: 'date',
      parms: { unique: false },
    }],
  });
  await store.openDB();
  return store;
};

export default async (app) => {
  const store = await initDB();

  app.config.errorHandler = async (err, instance, info) => {
    // 向追踪服务报告错误
    console.log('error', err, instance, info,);
    await store.insertData({
      type: 'error',
      content: err?.message,
      stack: err.stack,
      extra: info,
      date: new Date().getTime(),
    });
  };
  
  app.config.warnHandler = async (msg, instance, trace) => {
    // `trace` is the component hierarchy trace
    // 向追踪服务报告错误
    console.log('warn', msg, instance, trace);
    await store.insertData({
      type: 'warn',
      content: msg,
      stack: trace,
      extra: '',
      date: new Date().getTime(),
    });
  };
};
