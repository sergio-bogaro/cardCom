import { useFormik } from 'formik';
import { useState } from 'react';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';

import { registerClient } from '../../../services/clientes';
import { Modal } from '../Modal';

interface createClientModalProps {
  text: string;
  listPage?: boolean;
}

export function CreateClientModal({ text, listPage }: createClientModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: '',
      cnpj: '',
      razao_social: ''
    },
    onSubmit: (data) => {
      registerClient(data)
        .then((res) => {
          if (!listPage) {
            setIsOpen(false);
            setNextStep(true);
          }
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <>
      <ButtonOrLink fullWidth intent={'transparent'} onClick={() => setIsOpen(true)}>
        {text}
      </ButtonOrLink>
      <Modal title="Cadastar Cliente" isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <Input label="Nome" name="nome" value={formik.values.nome} onChange={formik.handleChange} required />

          <Input label="CNPJ" name="cnpj" value={formik.values.cnpj} onChange={formik.handleChange} required />

          <Input
            label="Razão Social"
            name="razao_social"
            value={formik.values.razao_social}
            onChange={formik.handleChange}
            required
          />

          <div className="m-auto">
            <ButtonOrLink intent={'secondary'} type="submit">
              Cadastrar Usuário
            </ButtonOrLink>
          </div>
        </form>
      </Modal>

      <Modal title="Cliente Criado" isOpen={nextStep} closeModal={() => setNextStep(false)}>
        <p>Cliente criado</p>
        <div className="grid grid-flow-col justify-around">
          <ButtonOrLink> Fechar </ButtonOrLink>
          <ButtonOrLink href="/cliente/listar"> Pagina Clientes </ButtonOrLink>
        </div>
      </Modal>
    </>
  );
}
