import React, { ReactNode, Dispatch, SetStateAction } from "react";

type DropdownType = {
  isOpen: boolean;
  children: ReactNode | ReactNode[];
  title: string;
};

export default function DropdownInformation({ isOpen, children, title }: DropdownType) {
  return (
    <div>
      <p>{title}</p>
      {isOpen ? <div>{children}</div> : null}
    </div>
  );
}
