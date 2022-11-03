enum API_MAP {
  QueryUser = 'GET /api/user',
  MutateUser = 'POST /api/user',
}

interface IQueryUserRes {
  name: string;
  bio: string;
}

interface IMutateUserRes extends IQueryUserRes {
  lastModified: string;
}

interface IResMap {
  [API_MAP.QueryUser]: IQueryUserRes;
  [API_MAP.MutateUser]: IMutateUserRes;
}

interface IResponse<TRes = never> {
  message: string;
  code: number;
  data: TRes;
}

export async function request<T extends API_MAP>(
  api: T,
  params?: Record<string, unknown>
): Promise<IResponse<IResMap[T]>> {
  return {} as Promise<IResponse<IResMap[T]>>;
}

const res = await request(API_MAP.QueryUser);
