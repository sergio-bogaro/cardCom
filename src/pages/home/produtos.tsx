import { useEffect, useState } from 'react';

import { ButtonOrLink } from '@ui/ButtonOrLink';

import Header from '../../components/specific/Header';
import SideBar from '../../components/specific/SideBar';
import { Modal } from '../../components/UI/Modal';
import Table from '../../components/UI/Table';
import { registerProducts, searchProducts } from '../../services/products';

import type { NextPage } from 'next';
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
    <div className="flex h-screen gap-5 bg-slate-800 p-3">
      <SideBar />

      <div className="flex w-full flex-col text-gray-300">
        <Header title="Lista de Produtos" />
        <div className="flex gap-2">
          <ButtonOrLink onClick={() => setNewProductModal(true)}>Novo Prduto</ButtonOrLink>

          {/* <form
            onSubmit={handleSubmit(filterTable)}
            className="ml-auto flex w-2/5 items-center gap-6 transition-all focus-within:w-1/2">
            <input
              {...register('searchFilter')}
              placeholder="Pesquisar por nome"
              className="h-8 w-full rounded-lg bg-gray-600 p-2 outline-none"
            />

            <button type="submit" className="h-8 rounded-lg bg-gray-600 px-4">
              Pesquisar
            </button>
          </form> */}
        </div>
        <div className="w-full overflow-auto">
          <Table data={productsData} collumns={collumns} />
        </div>
      </div>

      {/* <Modal isOpen={newProductModal} title={'Cadastrar Novo Prduto'} closeModal={() => setNewProductModal(false)}>
        <form onSubmit={handleSubmit(newProduct)} className="flex flex-col gap-2">
          <p>Produto</p>
          <input {...register('nome')} className="h-8 w-full rounded-lg bg-gray-600 p-2 outline-none" />
          <button type="submit" className="h-8 rounded-lg bg-gray-600 px-4">
            salvas
          </button>
        </form>
      </Modal> */}
    </div>
  );
};

export default ListModels;
