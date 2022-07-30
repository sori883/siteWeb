import { ForgotParam } from 'features/auth/types/auth';
import { useForgot } from 'features/auth/api/forgot';
import { Hero } from 'features/auth/layouts/hero';
import { Button } from 'components/elements/button';
import { Form, InputField } from 'components/form';
import * as z from 'zod';

const schema = z.object({
  email: z.string().min(1, 'メールアドレスを入力してください').email({ message: 'メールアドレスの形式ではありません' }),
});

export const ForgotForm = (): JSX.Element => {
  const { forgot, isLoading } = useForgot();

  return (
    <Hero
      title='Forgot'
      description='パスワードリセットしてね'
    >
      <Form<ForgotParam, typeof schema>
        onSubmit={(data):void => {
          forgot(data);
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
            <div>
              <Button
                size='md'
                className='mt-5'
                type='submit'
                isLoading={isLoading}
              >
                リセットメールを送信
              </Button>
            </div>
          </>
        )}
      </Form>
    </Hero>
  );
};