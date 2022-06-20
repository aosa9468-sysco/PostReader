import React from 'react'

export interface User {
  name: string;
  email: string;
}

export interface RegisteredUser extends User {
  sl_token: string;
  client_id: string;
}

export interface RegisterUserOptions extends User {}

export type RegisterUserFn = (
  options: RegisterUserOptions
) => Promise<RegisteredUser | null>;

export type UseAuthReturn = {
  user: RegisteredUser | null;
  registerUser: RegisterUserFn;
  clearUser: () => void;
};

export type UseAuth = () => UseAuthReturn;

export interface AuthContextProps extends UseAuthReturn {}

export interface AuthProviderProps extends UseAuthReturn {}

export interface UseAuthContextReturn extends AuthContextProps {}

export type UseAuthContext = () => AuthContextProps;

export interface HTTPRequestBody extends User {
  client_id: string;
}

interface Meta {
  request_id: string;
}

interface APIResponseBody<Data = unknown, Error = unknown> {
  data?: Data;
  error?: Error;
  meta: Meta;
}

export interface HTTPResponseBody
  extends APIResponseBody<Omit<RegisteredUser, "name">> {}
