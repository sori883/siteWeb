import Link from 'next/link';
import type { NextPage } from 'next'
import { useForgot } from 'hooks/auth/useForgot';
import { ForgotParam } from 'types/user'
import { useForm } from 'react-hook-form';

const Forgot: NextPage = () => {
  const { register, getValues, handleSubmit } = useForm<ForgotParam>();
  const { forgot } = useForgot();

  const forgotHandle = (): void => {
    forgot(getValues());
  };

  return (
    <>
      <h1>パスワードリセットメール送信</h1>
      <form onSubmit={handleSubmit(forgotHandle)}>
        <input {...register('email')} />
        <input type="submit" />
      </form>

      <div>
        <Link href='/'>
          <a>TOPにいく</a>
        </Link>
      </div>
    </>
  );
};

export default Forgot;