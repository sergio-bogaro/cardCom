import { ReactNode } from 'react';

import { ButtonOrLink } from '@ui/ButtonOrLink';

interface modalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
  deleteFunction: (event?: React.MouseEvent<HTMLElement>) => void;
  closeModal: (event?: React.MouseEvent<HTMLElement>) => void;
}

export function DeleteItem({ isOpen, title, closeModal, deleteFunction }: modalProps) {
  if (!isOpen) return null;

  const handleClose = (e: any) => {
    console.log('');
    //if (e.target.id === 'wrapper') closeModal();
  };

  return (
    <div
      id="wrapper"
      onClick={handleClose}
      className="fixed inset-0 -mt-32 flex items-center justify-center bg-black bg-opacity-25 text-black backdrop-blur-sm">
      <div className="w-1/3 max-w-[500px]">
        <div className="rounded-lg bg-slate-900 text-white">
          <div className="flex p-4 text-2xl">
            <h2>{title}</h2>
            <button onClick={closeModal} className="ml-auto">
              X
            </button>
          </div>
          <div className="mb-4 border border-transparent border-b-white"></div>
          <div className="p-4 text-center text-lg">
            <p>Tem certeza que deseja apagar esse item ?</p>
            <p>Essa ação não poder ser revertida</p>
            <div className="mt-5 flex justify-around">
              <ButtonOrLink intent={'secondary'} onClick={closeModal}>
                Sair
              </ButtonOrLink>
              <ButtonOrLink intent={'dangeer'} onClick={() => deleteFunction()}>
                Apagar
              </ButtonOrLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
