import Link from 'next/link';
import type { NextPage } from 'next';
import { useAlreadyLogin } from 'features/auth/api/useAlreadyLogin';
import { LoginForm } from 'features/auth/components/loginForm';

const Login: NextPage = () => {
  useAlreadyLogin();

  return (
    <>
      <LoginForm />
      <div>
        <Link href='/'>
          <a>TOPにいく</a>
        </Link>
      </div>
    </>
  );
};

export default Login;
