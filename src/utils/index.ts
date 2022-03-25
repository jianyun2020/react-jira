import { useEffect, useState } from "react";

// 判断value为0的特殊情况
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// 在一个函数里，改变传入的对象本身是不好的，防止原对象被污染
export const cleanObject = (object: { [key: string]: unknown }) => {
  // 等价于：Object.assign({}, object)
  const result = { ...object };

  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

// useMount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 后面用泛型进行类型约束，暂时用anys
// useDebounce  delay?:number 要么不传delay，要么传number
export const useDebounce = <V>(value: V, delay?: number) => {
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

export const useArray = <T>(inititalArray: T[]) => {
  const [value, setValue] = useState(inititalArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
