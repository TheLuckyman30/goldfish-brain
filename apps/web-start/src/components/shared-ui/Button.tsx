interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  color?: 'primary';
}

function Button({ color = 'primary', children, ...buttonParams }: ButtonProps) {
  const colorClasses = {
    primary: ' bg-[#fddbcdeb] text-[#6c3b27ee]',
  };
  return (
    <button
      className={`flex justify-center items-center p-2 rounded-md shadow-md not-disabled:cursor-pointer not-disabled:hover:hover:scale-102 duration-75 disabled:bg-gray-100 disabled:text-gray-700 text-xl ${colorClasses[color]}`}
      {...buttonParams}
    >
      {children}
    </button>
  );
}

export default Button;
