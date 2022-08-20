import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './fieldWrapper';

type checkBoxFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  checked?: never;
  defaultChecked?: boolean;
  registration: Partial<UseFormRegisterReturn>;
};

export const CheckBoxField = (props: checkBoxFieldProps): JSX.Element => {
  const { label, className, defaultChecked = false, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type='checkbox'
        defaultChecked={defaultChecked}
        className={clsx(
          'checkbox rounded-none',
          error ? 'input-error' : 'input-secondary',
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};