interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  color?: 'primary';
}

function Input({ color = 'primary', ...inputParams }: InputProps) {
  const colorClasses = {
    primary: 'border-gray-300 bg-gray-50 focus:outline-blue-400',
  };

  return (
    <input
      className={`block border p-2.5 rounded-lg text-sm w-full ${colorClasses[color]}`}
      {...inputParams}
    />
  );
}

export default Input;
