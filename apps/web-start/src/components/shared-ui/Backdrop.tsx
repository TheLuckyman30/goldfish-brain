interface BackdropProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode;
}

function Backdrop({ children, ...divParams }: BackdropProps) {
  return (
    <div
      {...divParams}
      className="fixed flex justify-center items-center inset-0 w-lvw h-lvh bg-white/10 backdrop-blur-sm z-10"
    >
      {children}
    </div>
  );
}

export default Backdrop;
