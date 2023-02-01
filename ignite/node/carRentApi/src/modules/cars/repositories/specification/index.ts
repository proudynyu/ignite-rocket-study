import { SpecificationModel } from '../../model/Specification';
import { SpecificationInterface } from './interface';

export class SpecificationRepository implements SpecificationInterface {
  private specifications: SpecificationModel[];

  constructor() {
    this.specifications = [];
  }

  public create({ description, name }: ISpecificationDTO): SpecificationModel {
    const specification = new SpecificationModel();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  public findByName(name: string): SpecificationModel | undefined {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}
