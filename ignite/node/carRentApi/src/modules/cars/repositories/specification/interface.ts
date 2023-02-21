import { Specification } from "../../model/Specification";

export abstract class SpecificationInterface {
  create: ({ description, name }: ISpecificationDTO) => Promise<Specification>;
  findByName: (name: string) => Promise<Specification>;
}
