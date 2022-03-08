import Link from 'next/link';
import type { NextPage } from 'next';
import { RegisterParam } from 'types/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from 'hooks/auth';
import { useAlreadyLogin } from 'hooks/auth/useAlreadyLogin';

const Register: NextPage = () => {
  useAlreadyLogin();
  const { register, handleSubmit, getValues, formState: { errors }} = useForm<RegisterParam>();
  const { regist } = useAuth();

  const onSubmit: SubmitHandler<RegisterParam> = (data) => {
    regist(data);
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>name</label>
        <input
          {...register('name', {
            required: '必ず入力してください',
            maxLength: {
              value: 255,
              message: '255文字以内で入力してください'
            }
          })}
          aria-invalid={errors.name !== undefined}
        />
        { errors.name?.message }
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
            required: '必ず入力してください',
            maxLength: {
              value: 255,
              message: '255文字以内で入力してください'
            },
            minLength: {
              value: 8,
              message: '8文字以上入力してください。'
            }
          })}
          aria-invalid={errors.password !== undefined}
        />
        { errors.password?.message }
        <label>password confirmed</label>
        <input
          {...register('password_confirmation', {
            required: '必ず入力してください',
            maxLength: {
              value: 255,
              message: '255文字以内で入力してください'
            },
            validate: {
              match: (value) => getValues('password') === value || '入力したパスワードと一致していません'
            },
          })}
          aria-invalid={errors.password_confirmation !== undefined}
        />
        { errors.password_confirmation?.message }
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