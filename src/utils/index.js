// 判断value为0的特殊情况
export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的，防止原对象被污染
export const cleanObject = (object) => {
  // 等价于：Object.assign({}, object)
  const result = { ...object };

  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
};
