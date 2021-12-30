import Link from 'next/link';
import type { NextPage } from 'next'
import { useRegist } from 'hooks/auth/useRegist';
import { RegisterParam } from 'types/user'
import { useForm } from 'react-hook-form';
import { useAlreadyLogin } from 'hooks/auth/useAlreadyLogin';

const Register: NextPage = () => {
  useAlreadyLogin();
  const { register, getValues, handleSubmit } = useForm<RegisterParam>();
  const { regist } = useRegist();

  const registHandle = (): void => {
    regist(getValues());
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(registHandle)}>
        <label>name</label>
        <input {...register('name')} />
        <label>email</label>
        <input {...register('email')} />
        <label>password</label>
        <input {...register('password')} />
        <label>password confirmed</label>
        <input {...register('password_confirmation')} />
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

export default Register;