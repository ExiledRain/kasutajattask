import { IAddress } from "../address/address.model";
import { ICompany } from "../company/company.model";

export interface IKasutaja {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address?: IAddress;
  phone?: string;
  website?: string;
  company?: ICompany;
}

export class Kasutaja implements IKasutaja {
  constructor(
    public id?: number,
    public name?: string,
    public username?: string,
    public email?: string,
    public address?: IAddress,
    public phone?: string,
    public website?: string,
    public company?: ICompany
  ) {}
}
