import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Select from 'react-select';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';

import { searchClient } from '../../../services/clientes';
import { registerModel } from '../../../services/modelos';
import { clientDataType } from '../../../types/client';
import { Modal } from '../../Modal';

interface createModelModalProps {
  text: string;
  listPage?: boolean;
}

export function CreateModelsModal({ text }: createModelModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [clientData, setClientData] = useState();

  const formik = useFormik({
    initialValues: {
      nome: '',
      status: '',
      tipo_chip: '',
      cliete_id: '',
      tem_dados: '',
      tem_fotos: ''
    },
    onSubmit: (data) => {
      console.log(data);
    }
  });

  useEffect(() => {
    searchClient('')
      .then((res) => {
        const clientsList = res.data.data;
        const clientListSelect = clientsList.map((client: clientDataType) => ({
          value: client.id,
          label: client.nome
        }));

        setClientData(clientListSelect);
      })
      .catch((err) => console.log(err));
  }, []);

  const submitNewClient = (data: any) => registerModel(data);

  return (
    <>
      <ButtonOrLink fullWidth intent={'transparent'} onClick={() => setIsOpen(true)}>
        {text}
      </ButtonOrLink>
      <Modal title="Cadastar Modelo" isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <Select className="text-black" options={clientData} />
          <Input required label="Nome do Modelo" name="" value={formik.values.nome} onChange={formik.handleChange} />

          <Input required label="Status" name="" value={formik.values.status} onChange={formik.handleChange} />

          <Input required label="Tipo Chip" name="" value={formik.values.tipo_chip} onChange={formik.handleChange} />

          <Input required label="Tem Dados" name="" value={formik.values.tem_dados} onChange={formik.handleChange} />

          <Input required label="Tem Fotos" name="" value={formik.values.tem_fotos} onChange={formik.handleChange} />

          <div className="m-auto">
            <ButtonOrLink intent={'secondary'} type="submit">
              Cadastrar Modelo
            </ButtonOrLink>
          </div>
        </form>
      </Modal>

      <Modal title="Modelo Criado" isOpen={nextStep} closeModal={() => setNextStep(false)}>
        <p>Modelo criado</p>
        <div className="grid grid-flow-col justify-around">
          <ButtonOrLink> Fechar </ButtonOrLink>
          <ButtonOrLink href="/modelos/listar"> Pagina Modelos </ButtonOrLink>
        </div>
      </Modal>
    </>
  );
}
