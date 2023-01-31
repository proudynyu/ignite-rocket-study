import { SpecificationInterface } from "../../repositories/specification/interface";

export class SpecificationService {
  constructor(private repository: SpecificationInterface) {}

  create({ description, name }: ISpecificationDTO) {
    const specificationAlreadyExists = this.repository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!')
    }

    const specification = this.repository.create({ description, name });
    return specification;
  }
}
