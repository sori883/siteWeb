import { LoginParam } from 'features/auth/types/auth';
import { useLogin } from 'features/auth/api/login';
import { Hero } from 'features/auth/layouts/hero';
import { Button } from 'components/elements/button';
import { Form, InputField } from 'components/form';
import * as z from 'zod';

const schema = z.object({
  email: z.string().min(1, 'メールアドレスを入力してください').email({ message: 'メールアドレスの形式ではありません' }),
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
});

export const LoginForm = (): JSX.Element => {
  const { login, isLoading } = useLogin();

  return (
    <Hero
      title='Login'
      description='ログインしてね'
    >
      <Form<LoginParam, typeof schema>
        onSubmit={(data):void => {
          login(data);
        }}
        schema={schema}
      >
        {({ register, formState }): JSX.Element => (
          <>
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
            <div>
              <Button
                size='md'
                className='mt-5'
                type='submit'
                isLoading={isLoading}
              >
                ログイン
              </Button>
            </div>
          </>
        )}
      </Form>
    </Hero>
  );
};