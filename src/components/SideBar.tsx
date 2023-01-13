import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import logoImage from '../../public/logo.png';
import { registerClient } from '../services/clientes';
import DropDownButton from './DropDownButton';
import Modal from './Modal';

const SideBar = () => {
  const [newClientModal, setNewClientModal] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitNewClient = (data: any) =>
    registerClient(data)
      .then((res) => {
        setNewClientModal(false);
        reset();
      })
      .catch((err) => console.log(err));
  return (
    <div className="w-1/4 max-w-[300px] h-full flex flex-col gap-4 bg-slate-900 p-3 rounded-lg text-gray-300">
      <Link href="/home">
        <Image className="my-6 mx-auto" src={logoImage} alt={'Logo do Site'} />
      </Link>

      <a href="/home">
        <div className="bg-gray-700 hover:bg-gray-500 w-4/5 h-10 rounded-lg  flex justify-center items-center mx-auto">
          <p>Pagina Inicial</p>
        </div>
      </a>

      <DropDownButton icon="person" title="Clientes">
        <Link href={'/cliente/listar'} className="hover:bg-gray-500 w-4/5 h-10 pl-4 rounded-lg flex items-center mx-auto">
          • Listar Clientes
        </Link>
        <button onClick={() => setNewClientModal(true)} className="hover:bg-gray-500 w-4/5 h-10 pl-4 rounded-lg flex items-center mx-auto">
          • Cadastrar Cliente
        </button>
        <Link href={'/cliente/saldo'} className="hover:bg-gray-500 w-4/5 h-10 pl-4 rounded-lg flex items-center mx-auto">
          • Saldo dos Clientes
        </Link>
      </DropDownButton>

      <DropDownButton icon="person" title="Modelos">
        <Link href={'/modelos/listar'} className="hover:bg-gray-500 w-4/5 h-10 pl-4 rounded-lg flex items-center mx-auto">
          • Listar Modelos
        </Link>
        <button onClick={() => console.log('aa')} className="hover:bg-gray-500 w-4/5 h-10 pl-4 rounded-lg flex items-center mx-auto">
          • Cadastrar Modelo
        </button>
        <Link href={'/cliente/saldo'} className="hover:bg-gray-500 w-4/5 h-10 pl-4 rounded-lg flex items-center mx-auto">
          • Saldo dos Modelos
        </Link>
      </DropDownButton>

      <DropDownButton icon="person" title="Estoque e Produtos">
        <Link href={'/home/produtos'} className="hover:bg-gray-500 w-4/5 h-10 pl-4 rounded-lg flex items-center mx-auto">
          • Produtos
        </Link>
      </DropDownButton>

      <Link href="">
        <div className="bg-gray-700 hover:bg-gray-500 w-4/5 h-10 rounded-lg  flex justify-center items-center mx-auto">
          <p>Pedidos</p>
        </div>
      </Link>

      <Modal title="Cadastar Novo Cliente" isOpen={newClientModal} closeModal={() => setNewClientModal(false)}>
        <form onSubmit={handleSubmit(submitNewClient)} className="flex flex-col gap-2 mt-5">
          <p>Nome</p>
          <input {...register('nome')} className="border border-transparent border-b-gray-600 w-full h-8 p-2" />

          <p>CNPJ</p>
          <input {...register('cnpj')} className="border border-transparent border-b-gray-600 w-full h-8 p-2" />

          <p>Razão Social</p>
          <input {...register('razao_social')} className="border border-transparent border-b-gray-600 w-full h-8 p-2" />

          <button
            type="submit"
            className="mt-4 mx-auto bg-blue-600 hover:bg-blue-800 text-white font-bold w-fit py-2 px-4 rounded-lg transition-property: color">
            Cadastrar Usuário
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SideBar;
