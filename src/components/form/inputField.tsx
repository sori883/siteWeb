import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './fieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  defaultValue? : string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps): JSX.Element => {
  const {
    type = 'text',
    label,
    className,
    defaultValue,
    placeholder,
    registration,
    error
  } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(
          'input input-bordered w-full rounded-none',
          error ? 'input-error' : 'input-secondary',
          className
        )}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...registration}
      />
    </FieldWrapper>
  );
};