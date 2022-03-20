import { useEffect, useState } from "react";

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

// useMount
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

// useDebounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 每次在上一个useEffect处理完成以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
