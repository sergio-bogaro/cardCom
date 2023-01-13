import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import SideBar from '../../components/SideBar';
import Table from '../../components/Table';
import { registerProducts, searchProducts } from '../../services/products';

const collumns = [
  { heading: 'ID', value: 'id' },
  { heading: 'Produto', value: 'nome' }
];

const productsDataMask = [
  {
    id: '',
    nome: ''
  }
];

const ListModels: NextPage = () => {
  const [productsData, setProductsData] = useState(productsDataMask);
  const [newSearch, setNewSearch] = useState(false);
  const [newProductModal, setNewProductModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const filterTable = (data: any) => {
    const search = data.searchFilter ? 'search=' + data.searchFilter : '';
    searchProducts(search);
    setSearchFilter(search);
    setNewSearch(true);
  };

  const newProduct = (data: any) => {
    registerProducts(data)
      .then((res) => setNewSearch(true))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setNewSearch(false);
    searchProducts(searchFilter)
      .then((res) => setProductsData(res.data.data))
      .catch((err) => console.log(err));
  }, [newSearch === true]);

  return (
    <div className="bg-slate-800 h-screen p-3 flex gap-5">
      <SideBar />

      <div className="flex flex-col text-gray-300 w-full">
        <Header title="Lista de Modelos" />
        <div className="flex gap-2">
          <button onClick={() => setNewProductModal(true)} className="bg-gray-600 py-2 px-4 rounded-lg">
            Novo Prduto
          </button>

          <form onSubmit={handleSubmit(filterTable)} className="flex gap-6 w-2/5 items-center ml-auto focus-within:w-1/2 transition-all">
            <input {...register('searchFilter')} placeholder="Pesquisar por nome" className="bg-gray-600 outline-none w-full h-8 p-2 rounded-lg" />

            <button type="submit" className="bg-gray-600 h-8 px-4 rounded-lg">
              Pesquisar
            </button>
          </form>
        </div>
        <div className="w-full overflow-auto">
          <Table data={productsData} collumns={collumns} />
        </div>
      </div>

      <Modal isOpen={newProductModal} title={'Cadastrar Novo Prduto'} closeModal={() => setNewProductModal(false)}>
        <form onSubmit={handleSubmit(newProduct)} className="flex flex-col gap-2">
          <p>Produto</p>
          <input {...register('nome')} className="bg-gray-600 outline-none w-full h-8 p-2 rounded-lg" />
          <button type="submit" className="bg-gray-600 h-8 px-4 rounded-lg">
            salvas
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ListModels;
