interface InputProps {
  children: React.ReactNode;
  inputParams: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

function Input({ children, inputParams }: InputProps) {
  return (
    <input
      className="block border border-gray-300 p-2.5 bg-gray-50 rounded-lg text-sm w-full focus:outline-blue-400"
      {...inputParams}
    >
      {children}
    </input>
  );
}

export default Input;
