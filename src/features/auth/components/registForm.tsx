import { RegisterParam } from 'features/auth/types/auth';
import { useRegist } from 'features/auth/api/regist';
import { Hero } from 'features/auth/layouts/hero';
import { Button } from 'components/elements/button';
import { Form, InputField } from 'components/form';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, 'ユーザ名を入力してください'),
  email: z.string().min(1, 'メールアドレスを入力してください').email({ message: 'メールアドレスの形式ではありません' }),
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
  password_confirmation: z.string().min(1, { message: 'パスワードを入力してください' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'パスワードが一致しません',
  path: ['password_confirmation'],
});

export const RegistForm = (): JSX.Element => {
  const { regist, isLoading } = useRegist();

  return (
    <Hero
      title='Register'
      description='登録してね'
    >
      <Form<RegisterParam, typeof schema>
        onSubmit={(data):void => {
          regist(data);
        }}
        schema={schema}
      >
        {({ register, formState }): JSX.Element => (
          <>
            <InputField
              type='text'
              label='ユーザ名'
              error={formState.errors['name']}
              registration={register('name')}
            />
            <InputField
              type='text'
              label='メールアドレス'
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type='password'
              label='パスワード'
              error={formState.errors['password']}
              registration={register('password')}
            />
            <InputField
              type='password'
              label='パスワード確認'
              error={formState.errors['password_confirmation']}
              registration={register('password_confirmation')}
            />
            <div>
              <Button
                size='md'
                className='mt-5'
                type='submit'
                isLoading={isLoading}
              >
                登録
              </Button>
            </div>
          </>
        )}
      </Form>
    </Hero>
  );
};