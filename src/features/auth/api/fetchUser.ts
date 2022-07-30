import axios from 'lib/axios';
import useSWR from 'swr';
import { User } from 'features/auth/types/auth';

type HookReturn = {
  user: User | undefined;
  error: Error | undefined;
}

export const useUser = (): HookReturn => {
  const { data: user, error } = useSWR<User, Error>('/api/me', async () => 
    await axios
      .get<User>('/api/me')
      .then((res) => res.data)
      .catch((error) => {
        throw error.response;
      })
  );

  return {
    user,
    error
  };
};