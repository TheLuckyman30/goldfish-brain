interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  children?: React.ReactNode;
  color?: 'primary';
}

export function Select({
  color = 'primary',
  children,
  ...selectParams
}: SelectProps) {
  const selectColorClasses = {
    primary: 'border-gray-300 bg-gray-50 focus:outline-blue-400',
  };
  return (
    <select
      className={`block border p-2.5 rounded-lg text-sm w-full ${selectColorClasses[color]}`}
      {...selectParams}
    >
      {children}
    </select>
  );
}

interface SelectOptionProps
  extends React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  > {
  children?: React.ReactNode;
}

export function SelectOption({ children, ...optionParams }: SelectOptionProps) {
  return <option {...optionParams}>{children}</option>;
}
