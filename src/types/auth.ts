/* user */

export type User = {
  id: number;
  name: string;
  email: string;
};

/* current user state */

export type CurrentUserState = {
  currentUser: User | null | undefined;
  isAuthChecking: boolean;
}

/* current user hook */
export type CurrentUserHook = {
  currentUser: User | null | undefined;
  isAuthChecking: boolean;
}

/* Form Params */
export type RegisterParam = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginParam = {
  email: string;
  password: string;
};

export type VerifyParam = string | string[] | undefined;

export type ForgotParam = {
  email: string;
};

export type ResetParam = {
  password: string;
  password_confirmation: string;
  token: string | string[] | undefined;
};

/* auth hook return */
export type AuthHook = {
  user: User | undefined;
  error: Error | undefined;
  regist: (req: RegisterParam) => Promise<void>;
  verify: (req: VerifyParam) => Promise<void>;
  login: (req: LoginParam) => Promise<void>;
  forgot: (req: ForgotParam) => Promise<void>;
  reset: (req: ResetParam) => Promise<void>;
  logout: () => Promise<void>;
};