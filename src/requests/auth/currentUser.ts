import apiClient from 'lib/apiClient';
import { CurrentUser } from 'types/user'

export async function fetchCurrentUser(): Promise<CurrentUser | null | undefined> {
  await apiClient.get('/sanctum/csrf-cookie');
  const res  = await apiClient.get('/api/me');
  return res.data;
};