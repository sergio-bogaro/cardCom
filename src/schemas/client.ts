import * as yup from 'yup';

export const clientSchema = yup.object().shape({
  nome: yup.string().required('Campo Obrigatório'),
  razao_social: yup.string().required('Campo Obrigatório'),
  cnpj: yup.string().length(18).required('Campo Obrigatório')
});
