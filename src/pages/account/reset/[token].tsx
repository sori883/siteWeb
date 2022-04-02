import type { NextPage } from 'next';
import { useAlreadyLogin } from 'hooks/auth/useAlreadyLogin';
import { ResetParam } from 'types/auth';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from 'hooks/auth';


const Reset: NextPage = () => {
  useAlreadyLogin();
  const router = useRouter();
  const { token } = router.query;
  const { reset } = useAuth();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<ResetParam>();

  const onSubmit: SubmitHandler<ResetParam> = (data) => {
    reset({...data, token});
  };

  return (
    <>
      <h1>reset</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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

    </>
  );
};

export default Reset;