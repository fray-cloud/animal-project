import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  children?: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<T>;
  submitHandler: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
  children,
  handleSubmit,
  submitHandler,
}: Props<T>) => {
  return <form onSubmit={handleSubmit(submitHandler)}>{children}</form>;
};
