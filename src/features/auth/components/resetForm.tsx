import { ResetParam } from 'features/auth/types/auth';
import { useReset } from 'features/auth/api/reset';
import { Hero } from 'features/auth/layouts/hero';
import { Button } from 'components/elements/button';
import { Form, InputField } from 'components/form';
import * as z from 'zod';

const schema = z.object({
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
  password_confirmation: z.string().min(1, { message: 'パスワードを入力してください' }),
});

type Props = {
  token: string | string[] | undefined;
};

export const ResetForm = ({token}: Props): JSX.Element => {
  const { reset, isLoading } = useReset();

  return (
    <Hero
      title='Login'
      description='ログインしてね'
    >
      <Form<ResetParam, typeof schema>
        onSubmit={(data):void => {
          reset({...data, token});
        }}
        schema={schema}
      >
        {({ register, formState }): JSX.Element => (
          <>
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
                パスワードをリセットする
              </Button>
            </div>
          </>
        )}
      </Form>
    </Hero>
  );
};