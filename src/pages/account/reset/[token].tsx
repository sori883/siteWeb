import type { NextPage } from 'next'
import { useAlreadyLogin } from 'hooks/auth/useAlreadyLogin';
import { ResetParam } from 'types/user'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useReset } from 'hooks/auth/useReset';


const Verrify: NextPage = () => {
  useAlreadyLogin();
  const router = useRouter();
  const { token } = router.query;
  const { reset } = useReset();
  const { register, getValues, handleSubmit } = useForm<ResetParam>();

  const resetHandle = (): void => {
    reset({ ...getValues(), token});
  };


  return (
    <>
      <h1>reset</h1>
      <form onSubmit={handleSubmit(resetHandle)}>
        <label>password</label>
        <input {...register('password')} />
        <label>password confirmed</label>
        <input {...register('password_confirmation')} />
        <input type="submit" />
      </form>

    </>
  );
};

export default Verrify;