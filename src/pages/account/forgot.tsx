import Link from 'next/link';
import type { NextPage } from 'next';
import { useForm, SubmitHandler  } from "react-hook-form";
import { ForgotParam } from 'types/auth';
import { useAuth } from 'hooks/auth';


const Forgot: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotParam>();
  const { forgot } = useAuth();

  const onSubmit: SubmitHandler<ForgotParam> = (data) => {
    forgot(data);
  };

  return (
    <>
      <h1>パスワードリセットメール送信</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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