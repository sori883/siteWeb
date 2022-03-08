import Link from 'next/link';
import type { NextPage } from 'next';
import { LoginParam } from 'types/auth';
import { useForm, SubmitHandler  } from "react-hook-form";
import { useAlreadyLogin } from 'hooks/auth/useAlreadyLogin';
import { useAuth } from 'hooks/auth';


const Login: NextPage = () => {
  useAlreadyLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginParam>();
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginParam> = (data) => {
    login(data);
  };

  return (
    <>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>email</label>
        <input
          {...register('email', {
            required: '必ず入力してください',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'メールアドレスの形式ではありません'
            }
          })}
          aria-invalid={errors.email !== undefined}
        />
        { errors.email?.message }
        <label>password</label>
        <input
          {...register('password', {
            required: '必ず入力してください'
          })}
          aria-invalid={errors.password !== undefined}
        />
        { errors.password?.message }
        <input type='submit' />
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
