export default (errors) => errors.reduce((a, v) => {
  // eslint-disable-next-line no-param-reassign
  a[v.path] = v.errors;
  return a;
}, {});
