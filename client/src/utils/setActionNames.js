const setActionNames = (actions, transformValue = (v) => v, transformKey = (v) => v) => actions.reduce((names, name) => {
  names[transformKey(name)] = transformValue(name);

  return names;
}, {});

export const valueToLower = (v) => v.toLowerCase();

export default setActionNames;
