export interface IGeo {
  lat?: string;
  lng?: string;
}

export class Geo implements IGeo {
  constructor(
    public lat?: string,
    public lng?: string
  ) {}
}

