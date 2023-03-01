import { useFormik } from 'formik';
import { FormEvent, useEffect, useState } from 'react';
import { GoPencil, GoPlus, GoTrashcan } from 'react-icons/go';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { Loading } from '@ui/Loading';
import { Modal } from '@ui/Modal/Modal';
import { Table } from '@ui/Table';

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

const productFormValues = { id: '', nome: '' };

const Products: NextPage = () => {
  const [productsData, setProductsData] = useState(productsDataMask);
  const [productFormValue, setProductFormValue] = useState(productFormValues);

  const [productToDeleteID, setProductToDeleteID] = useState('');
  const [newSearch, setNewSearch] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [newProductModal, setNewProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const { values, errors, touched, handleSubmit, handleChange, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: productFormValue,
    onSubmit: (data) => {
      setIsLoading(true);
      registerProducts(data)
        .then((res) => {
          const responseData = res.data.data;
          const productNew = {
            id: responseData.id,
            nome: responseData.nome,
            opcoes: productOptions(responseData.id, responseData.nome)
          };
          const newTable = [productNew, ...productsData.filter((product) => product.id != data.id)];

          setProductsData(newTable);
          resetForm();
          setNewProductModal(false);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  });

  function openDeleteModal(id: string) {
    setProductToDeleteID(id);
    setDeleteProductModal(true);
  }

  function deleteProduct(productID: string) {
    setIsLoading(true);
    deleteProducts(productID)
      .then((res) => {
        setIsLoading(false);
        const newProductList = productsData.filter((product) => product.id != productID);
        setProductsData(newProductList);
      })
      .catch((err) => console.log(err));
  }

  const filterTable = (event: FormEvent) => {
    event.preventDefault();
    setNewSearch(true);
  };

  const productOptions = (productID: string, productName: string) => {
    return (
      <div className="mx-auto flex w-fit gap-1">
        <ButtonOrLink
          onClick={() => {
            setProductFormValue({ id: productID, nome: productName });
            setNewProductModal(true);
          }}>
          <GoPencil />
        </ButtonOrLink>

        <ButtonOrLink intent={'danger'} onClick={() => openDeleteModal(productID)}>
          <GoTrashcan />
        </ButtonOrLink>

        <ButtonOrLink intent={'secondary'}>
          <GoPlus />
        </ButtonOrLink>
      </div>
    );
  };

  useEffect(() => {
    setNewSearch(false);
    setIsLoading(true);
    searchProducts(searchFilter)
      .then((res) => {
        const table = res.data.data.map((product: any) => ({
          nome: product.nome,
          id: product.id,
          opcoes: productOptions(product.id, product.nome)
        }));

        setProductsData(table);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [newSearch === true]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="ml-auto flex gap-4 lg:ml-0">
          <ButtonOrLink
            intent={'secondary'}
            onClick={() => {
              setNewProductModal(true);
              setProductFormValue(productFormValues);
            }}>
            <GoPlus />
            Cadastrar
          </ButtonOrLink>
        </div>
        <form className="ml-auto flex w-full gap-2 lg:w-1/2" onSubmit={filterTable}>
          <Input
            label=""
            placeholder="Pesquisar Produto"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <ButtonOrLink intent={'secondary'} type={'submit'}>
            <HiOutlineMagnifyingGlass />
          </ButtonOrLink>
        </form>
      </div>

      <div className="w-full overflow-auto">
        <Table data={productsData} collumns={collumns} />
      </div>

      <Modal isOpen={newProductModal} title={'Cadastrar Prduto'} closeModal={() => setNewProductModal(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input label="Nome" name="nome" value={values.nome} onChange={handleChange} />

          <div className="m-auto">
            <ButtonOrLink intent={'secondary'} type={'submit'}>
              Salvar Produto
            </ButtonOrLink>
          </div>
        </form>
      </Modal>

      <Modal isOpen={deleteProductModal} title={'Apagar Prduto'} closeModal={() => setDeleteProductModal(false)}>
        <p>Tem certeza que deseja apagar ? </p>
        <div className="mt-6 flex justify-around">
          <ButtonOrLink intent={'secondary'} onClick={() => setDeleteProductModal(false)}>
            Cancelar
          </ButtonOrLink>
          <ButtonOrLink
            intent={'danger'}
            onClick={() => {
              deleteProduct(productToDeleteID), setDeleteProductModal(false);
            }}>
            Apagar
          </ButtonOrLink>
        </div>
      </Modal>

      <Loading isLoading={isLoading} />
    </div>
  );
};

export default Products;
