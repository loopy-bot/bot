const req = import.meta.globEager('../../icons/remix/*/*.svg');

const requireAll = (requireContext) => {
  let arr = Object.keys(requireContext);
  const book = {};
  arr.forEach((ele) => {
    const a = ele.split('/');
    const b = a[a.length - 1];
    const c = b.split('.');
    const key = a[a.length - 2];
    if (!book[key]) book[key] = [];
    book[key].push(c[0]);
  });
  return book;
};

const remixIcons = requireAll(req);

export default remixIcons;