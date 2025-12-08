import React, { createContext, useContext } from 'react';
import { X } from 'lucide-react';
import Backdrop from './Backdrop';

interface Context {
  setShow?: (show: boolean) => void;
}

interface ModalProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode;
  color?: 'primary';
  backdrop?: boolean;
  show?: boolean;
  setShow?: (show: boolean) => void;
}

const ModalContext = createContext<Context | null>(null);

export function Modal({
  children,
  color = 'primary',
  backdrop = false,
  show = true,
  setShow,
  ...divParmas
}: ModalProps) {
  const colorClasses = {
    primary: 'bg-[#538f97]',
  };

  if (backdrop) {
    return (
      <ModalContext.Provider value={{ setShow: setShow }}>
        <Backdrop hidden={!show}>
          <div
            {...divParmas}
            className={`flex flex-col gap-5 shadow-md p-5 rounded-lg max-w-[50%] ${colorClasses[color]}`}
          >
            {children}
          </div>
        </Backdrop>
      </ModalContext.Provider>
    );
  }
  return (
    <ModalContext.Provider value={{ setShow: setShow }}>
      <div
        hidden={!show}
        {...divParmas}
        className={`flex flex-col gap-5 shadow-md p-5 rounded-lg ${colorClasses[color]}`}
      >
        {children}
      </div>
    </ModalContext.Provider>
  );
}

interface ModalHeaderProps 

extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >{
  
  children?: React.ReactNode;
  color?: 'primary';

}

export function ModalHeader({ color = 'primary', children, ...divParams }: ModalHeaderProps) {
  const context = useContext(ModalContext);
  const textColorClasses = {
    primary: 'text-white',
  };
  const closeColorClasses = {
    primary: 'text-white hover:bg-blue-300 hover:rounded-[60px] ',
  };

  if (!context || context.setShow === undefined) {
    return (
      <div className="flex gap-15 justify-between " {...divParams}>
        
        <div
          className={`flex flex-wrap text-3xl font-bold  ${textColorClasses[color]}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-15 justify-between" {...divParams}>
      <div
        className={`flex flex-wrap text-3xl font-bold ${textColorClasses[color]}`}
      >
        {children}
      </div>
      <button
        className={`cursor-pointer ${closeColorClasses[color]}`}
        onClick={() => context.setShow?.(false)}
      >
        <X />
      </button>
    </div>
  );
}
