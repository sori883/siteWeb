import Link from 'next/link';
import type { NextPage } from 'next';
import { useAlreadyLogin } from 'features/auth/api/useAlreadyLogin';
import { RegistForm } from 'features/auth/components/registForm';

const Register: NextPage = () => {
  useAlreadyLogin();

  return (
    <>
      <RegistForm />
      <div>
        <Link href='/'>
          <a>TOPにいく</a>
        </Link>
      </div>
    </>
  );
};

export default Register;