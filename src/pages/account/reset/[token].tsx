import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAlreadyLogin } from 'features/auth/api/useAlreadyLogin';
import { ResetForm } from 'features/auth/components/resetForm';

const Reset: NextPage = () => {
  useAlreadyLogin();
  const router = useRouter();
  const { token } = router.query;

  return (
    <>
      <ResetForm
        token={token}
      />
    </>
  );
};

export default Reset;