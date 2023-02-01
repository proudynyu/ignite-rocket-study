import { SpecificationInterface } from '../../repositories/specification/interface';

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: SpecificationInterface) {}

  public execute({ description, name }: ISpecificationDTO) {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!');
    }

    const specification = this.specificationRepository.create({
      description,
      name,
    });
    return specification;
  }
}
