const req = import.meta.globEager('../../icons/svg/*.svg');
const requireAll = (requireContext) => {
  let arr = Object.keys(requireContext);
  arr = arr.map((ele) => {
    const a = ele.split('/');
    const b = a[a.length - 1];
    const c = b.split('.');
    return c[0];
  });
  return arr;
};

const svgIcons = requireAll(req);

export default svgIcons;
