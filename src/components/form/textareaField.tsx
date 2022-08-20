import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './fieldWrapper';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = (props: TextAreaFieldProps): JSX.Element => {
  const { label, className, placeholder, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        className={clsx(
          'textarea textarea-secondary w-full overflow-auto rounded-none',
          className
        )}
        placeholder={placeholder}
        {...registration}
      />
    </FieldWrapper>
  );
};