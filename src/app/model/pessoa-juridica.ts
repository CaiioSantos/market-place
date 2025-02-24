import { Pessoa } from "./pessoa";

export class PessoaJuridica extends Pessoa {

 cnpj?: string;
 inscEstadual?: string;
 inscMunicipal?: string;
 nomeFantasia?: string;
 razaoSocial?: string;
 categoria?: string;
}
