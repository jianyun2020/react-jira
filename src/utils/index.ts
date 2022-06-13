import { useEffect, useRef, useState } from "react";

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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

// 重置路由
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂载或者已经挂载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    // 第一次加载
    mountedRef.current = true;

    return () => {
      // 卸载时
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
