type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};
type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

type LoginUser = {
  foo: string;
};
type UnLoginUser = {
  bar: string;
};
type TestWithoutRes = Without<UnLoginUser, LoginUser>;
type TestXORRes = XOR<UnLoginUser, LoginUser>;
const res1: TestXORRes = { foo: 'foo' };
const res2: TestXORRes = { bar: 'bar' };
// error
// const res3: TestXORRes = { bar: 'bar',foo:'foo' };

// 表示此类型必须有 sharedProps，并且至多只能有一个 container 或者 module 字段
// 去掉 Partial，则表示至少要有其中一个字段
// 互斥属性中，module 与 container 类型则是至多拥有一个。
type ComposedOption = { sharedProps: string } & Partial<
  XOR<{ container: string }, { module: object }>
>;

const res3: ComposedOption = { sharedProps: '', container: '' };
