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
