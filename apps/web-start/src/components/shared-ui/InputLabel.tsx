interface InputLabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  children?: React.ReactNode;
  color?: 'primary';
}

function InputLabel({
  color = 'primary',
  children,
  ...labelParams
}: InputLabelProps) {
  const labelClasses = {
    primary: 'text-white text-[18px]',
  };

  return (
    <label
      className={`block mb-2 font-medium text-sm ${labelClasses[color]}`}
      {...labelParams}
    >
      {children}
    </label>
  );
}

export default InputLabel;
