import React, { ReactNode, Dispatch, SetStateAction } from "react";

type DropdownType = {
  isOpen: boolean;
  children: ReactNode | ReactNode[];
  title: string;
<<<<<<< HEAD
  onClick: () => void
=======
>>>>>>> master
};

export default function DropdownInformation({ isOpen, children, title, onClick }: DropdownType) {
  const buttonTitle = isOpen ? '-' : '+'
  return (
    <div>
      <div style={{display: 'flex'}}>
        <p>{title}</p>
        <button onClick={() => onClick()}>{buttonTitle}</button>
      </div>
      {isOpen ? <div>{children}</div> : null}
    </div>
  );
}
