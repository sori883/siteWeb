import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './fieldWrapper';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (param: React.ChangeEvent<HTMLTextAreaElement>) => void;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = (props: TextAreaFieldProps): JSX.Element => {
  const { label, className, placeholder, defaultValue, onChange, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        className={clsx(
          'textarea textarea-secondary w-full overflow-auto rounded-none',
          className
        )}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...registration}
        onChange={onChange}
      />
    </FieldWrapper>
  );
};