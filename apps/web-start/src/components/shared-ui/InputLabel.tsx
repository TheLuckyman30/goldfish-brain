interface InputLabelProps {
  children: React.ReactNode;
  labelParams: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
}

function InputLabel({ children, labelParams }: InputLabelProps) {
  return (
    <label
      className="block mb-2 font-medium text-sm text-gray-900"
      {...labelParams}
    >
      {children}
    </label>
  );
}

export default InputLabel;
