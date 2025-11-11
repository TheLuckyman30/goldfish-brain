interface FormProps {
  children: React.ReactNode;
  formParams: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
}

function Form({ children, formParams }: FormProps) {
  return <form {...formParams}>{children}</form>;
}

export default Form;
