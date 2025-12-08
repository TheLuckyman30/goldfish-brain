interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  color?: 'primary';
}

export function TextArea({
  color = 'primary',
  ...textAreaProps
}: TextAreaProps) {
  return (
    <textarea
      className="bg-gray-100/60 border border-gray-300 min-w-[30vh] w-[30vh] rounded-[10px] pl-3 pt-3"
      {...textAreaProps}
    />
  );
}
