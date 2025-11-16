interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children?: React.ReactNode;
}

function Form({ children, ...formParams }: FormProps) {
  return <form {...formParams}>{children}</form>;
}

export default Form;
