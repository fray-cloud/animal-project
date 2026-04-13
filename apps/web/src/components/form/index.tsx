import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  children?: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<T>;
  submitHandler: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
  children,
  handleSubmit,
  submitHandler,
}: FormProps<T>) => {
  return <form onSubmit={handleSubmit(submitHandler)}>{children}</form>;
};
