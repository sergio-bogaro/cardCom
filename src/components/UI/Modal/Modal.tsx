import { ReactNode } from 'react';

interface modalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
  closeModal: (event?: React.MouseEvent<HTMLElement>) => void;
}

export function Modal({ isOpen, title, closeModal, children }: modalProps) {
  if (!isOpen) return null;

  // function handleClose(e: any) {
  //   if (e.target.id === 'wrapper') closeModal();
  // }

  return (
    <div
      id="wrapper"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 text-black backdrop-blur-sm">
      <div className="w-1/2 max-w-[800px]">
        <div className="rounded-lg bg-slate-900 text-white">
          <div className="flex p-4 text-2xl">
            <h2>{title}</h2>
            <button onClick={closeModal} className="ml-auto">
              X
            </button>
          </div>
          <div className="mb-4 border border-transparent border-b-white"></div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
