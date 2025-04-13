import { PessoaJuridica } from "./pessoa-juridica";

export class CupomDesconto {

   constructor(){}

      id?: number
      codDesc?: string;
      dataValidateCupom?: Date;
      valorRealDesc?: Number;
      valorPorcentDesc?: Number;
      empresa?: PessoaJuridica;


}
