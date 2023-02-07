export interface ICompany {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

export class Company implements ICompany {
  constructor(
    public name?: string,
    public catchPhrase?: string,
    public bs?: string
  ) {}
}
