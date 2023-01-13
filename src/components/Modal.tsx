import { ReactNode } from 'react';

interface modalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
  closeModal: (event?: React.MouseEvent<HTMLElement>) => void;
}

const Modal = ({ isOpen, title, closeModal, children }: modalProps) => {
  if (!isOpen) return null;

  const handleClose = (e: any) => {
    console.log('');
    //if (e.target.id === 'wrapper') closeModal();
  };

  return (
    <div
      id="wrapper"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center text-black">
      <div className="w-1/2 max-w-[800px]">
        <div className="bg-slate-900 text-white rounded-lg">
          <div className="flex text-2xl p-4">
            <h2>{title}</h2>
            <button onClick={closeModal} className="ml-auto">
              X
            </button>
          </div>
          <div className="border border-transparent border-b-white mb-4"></div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
