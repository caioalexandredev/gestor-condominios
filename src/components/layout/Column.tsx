import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  size: number;
  className?: string;
  [x: string]: ReactNode | unknown;
};

export default function Column({ children, size = 12, className = "" }: Props) {
  const colSize = size <= 12 && size >= 1 ? `w-full sm:w-${(size / 12) * 100}%` : 'w-full';

  return (
    <div className={`${colSize} px-2 ${className}`}>
      {children}
    </div>
  );
};