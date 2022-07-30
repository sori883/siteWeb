import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './fieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  defaultValue? : string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps): JSX.Element => {
  const { type = 'text', label, className, defaultValue = '', registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(
          'input input-bordered w-full',
          error ? 'input-error' : 'input-secondary',
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      />
    </FieldWrapper>
  );
};