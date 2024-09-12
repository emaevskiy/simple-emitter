
const checkType = (value, type) => {
  if (type === Array) {
    return Array.isArray(value);
  } else if (type === Object) {
    return typeof value === 'object' && value !== null;
  } else if (type === Function) {
    return typeof value === 'function';
  } else if (type === String) {
    return typeof value === 'string';
  } else if (type === Number) {
    return typeof value === 'number';
  } else if (type === Boolean) {
    return typeof value === 'boolean';
  } else if (type === null) {
    return value === null;
  } else if (type === undefined) {
    return value === undefined;
  }
  return false;
};

export function isTypeOf(target, types = 'any') {
  if (types === 'any') return true;

  if (Array.isArray(types)) {
    return types.some(type => checkType(target, type));
  }
  return checkType(target, types);
};
