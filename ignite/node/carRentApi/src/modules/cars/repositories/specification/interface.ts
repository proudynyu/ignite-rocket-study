import { SpecificationModel } from '../../model/Specification';

export abstract class SpecificationInterface {
  create: ({ description, name }: ISpecificationDTO) => SpecificationModel;
  findByName: (name: string) => SpecificationModel | undefined;
}
