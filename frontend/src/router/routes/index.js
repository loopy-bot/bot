import rank from './rank.js';

const modules = import.meta.globEager('./modules/*.js');

function formatModules(_modules, result) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];
    result.push(...moduleList);
  });
  const res = [];
  rank.forEach((r) => {
    const temp = result.find((ele) => ele.meta.title === r);
    // if (!temp) throw new Error(`${r}找不到对应排名`);
    if (!temp) return;
    res.push(temp);
  });
  return res;
}

export const appRoutes = [...formatModules(modules, [])];
