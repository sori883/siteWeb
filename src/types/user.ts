/* user */

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
}

export type CurrentUserHook = {
  currentUser: CurrentUser | null | undefined;
  isAuthChecking: boolean;
}

/* login */

export type LoginParam = {
  email: string;
  password: string;
}

export type LoginHook = {
  login: (req: LoginParam) => Promise<void>;
};

/* regist */

export type RegisterParam = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export type RegisterHook = {
  regist: (req: RegisterParam) => Promise<void>;
};

/* verify */

export type VerifyParam = string | string[] | undefined;

export type VerifyHook = {
  verify: (req: VerifyParam) => Promise<void>;
};

/* forgot */

export type ForgotParam = {
  email: string;
};

export type ForgotHook = {
  forgot: (req: ForgotParam) => Promise<void>;
};

/* reset */

export type ResetParam = {
  password: string;
  password_confirmation: string;
  token: string | string[] | undefined;
};

export type ResetHook = {
  reset: (req: ResetParam) => Promise<void>;
};


/* logout */

export type LogoutHook = {
  logout: () => Promise<void>;
};
