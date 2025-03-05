import { Endereco } from "./endereco";
import { PessoaJuridica } from "./pessoa-juridica";

export class Pessoa {

  id?: number;
  nome?: string;
  email?: string;
  telefone?: string;
  tipoPessoa?: string;
  empresa?: PessoaJuridica
  endereco?: Endereco[];

  constructor(){
  }

}
