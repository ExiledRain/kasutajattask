import { IGeo } from "../geo/geo.model";

export interface IAddress {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: IGeo;
}

export class Address implements IAddress {
  constructor(
    public street?: string,
    public suit?: string,
    public city?: string,
    public zipcode?: string,
    public geo?: IGeo
  ) {}
}
