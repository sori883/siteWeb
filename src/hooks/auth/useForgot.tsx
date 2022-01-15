import { ForgotHook, ForgotParam } from 'types/user'
import apiClient from 'lib/apiClient';

export const useForgot = ():ForgotHook  => {    
  const forgot = async (req: ForgotParam):Promise<void> => {
    try {
      await apiClient.get('/sanctum/csrf-cookie');
      await apiClient.post('/api/forgot', req);
    } catch(e) {
      console.log(e);
    };
  };

  return {
    forgot,
  };
};