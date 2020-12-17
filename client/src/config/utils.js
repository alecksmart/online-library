const ROOT_PREFIX = '/';

export const getRootPrefix = () => ROOT_PREFIX;
export const getLocationPathName = (path) => `${getRootPrefix()}${path}`;
