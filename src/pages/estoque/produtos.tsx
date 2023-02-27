import { MouseEvent, useEffect, useState } from 'react';
import { GoPencil, GoPlus, GoTrashcan } from 'react-icons/go';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { DeleteItem } from '@ui/Modal/DeleteItem';

import { Modal } from '../../components/UI/Modal/Modal';
import { Table } from '../../components/UI/Table';
import { deleteProducts, registerProducts, searchProducts } from '../../services/products';

import type { NextPage } from 'next';
const collumns = [
  { heading: 'ID', value: 'id' },
  { heading: 'Produto', value: 'nome' },
  { heading: 'Opções', value: 'opcoes' }
];

const productsDataMask = [
  {
    id: '',
    nome: '',
    opcoes: <></>
  }
];

const Products: NextPage = () => {
  const [productsData, setProductsData] = useState(productsDataMask);
  const [activeProductID, setActiveProductID] = useState('');
  const [newSearch, setNewSearch] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [newProductModal, setNewProductModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  function openDeleteModal(id: string) {
    setActiveProductID(id);
    setDeleteProductModal(true);
  }

  function deleteProduct(productID: string) {
    deleteProducts(productID)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

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
      .then((res) => {
        const table = res.data.data.map((product: any) => ({
          nome: product.nome,
          id: product.id,
          opcoes: (
            <div className="mx-auto flex w-fit gap-1">
              <ButtonOrLink>
                <GoPencil />
              </ButtonOrLink>

              <ButtonOrLink intent={'danger'}>
                <GoTrashcan />
              </ButtonOrLink>

              <ButtonOrLink intent={'secondary'}>
                <GoPlus />
              </ButtonOrLink>
            </div>
          )
        }));

        setProductsData(table);
      })
      .catch((err) => console.log(err));
  }, [newSearch === true]);

  return (
    <div>
      <div>
        <ButtonOrLink onClick={() => setNewProductModal(true)}>Novo Prduto</ButtonOrLink>
      </div>
      <div className="w-full overflow-auto">
        <Table data={productsData} collumns={collumns} />
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

export default Products;
