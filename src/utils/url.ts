/**
 * 返回页面url中，指定键的参数值
 */

import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams();

  return [
    keys.reduce((prev: {}, key: string) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in string]: string }),
    setSearchParam,
  ] as const;
};
