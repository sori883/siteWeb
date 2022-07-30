import Link from 'next/link';
import type { NextPage } from 'next';
import { ForgotForm } from 'features/auth/components/forgotForm';


const Forgot: NextPage = () => (
  <>
    <ForgotForm />
    <div>
      <Link href='/'>
        <a>TOPにいく</a>
      </Link>
    </div>
  </>
);

export default Forgot;