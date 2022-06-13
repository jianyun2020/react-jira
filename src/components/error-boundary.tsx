import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary
// 因为经常使用children: ReactNode，所以可以使用React.PropsWithChildren:React定义的type utility-->React.PropsWithChildren<{ fallbackRender }>
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 错误边界标志静态方法
  // 当子组件抛出异常，这里会接收到并且调用，state中的error就被重新赋值为return的error
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
