interface Address {
  street: string;
  city: string;
}

export interface IPerson {
  id: string;
  name: string;
  phone?: string;
  address: Address;
}

export interface PersonData {
  allPersons: IPerson[];
}
