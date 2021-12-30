import Link from 'next/link';
import type { NextPage } from 'next'
import { useLogin } from 'hooks/auth/useLogin';
import { LoginParam } from 'types/user'
import { useForm } from "react-hook-form";
import { useAlreadyLogin } from 'hooks/auth/useAlreadyLogin';


const Login: NextPage = () => {
  useAlreadyLogin();
  const { register, getValues, handleSubmit } = useForm<LoginParam>();
  const { login } = useLogin();

  const loginHandle = (): void => {
    login(getValues());
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(loginHandle)}>
        <label>email</label>
        <input {...register('email')} />
        <label>password</label>
        <input {...register('password')} />
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

export default Login;
