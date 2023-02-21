import { Repository } from 'typeorm';

import { connection } from '../../../../database';
import { Specification } from '../../model/Specification';
import { SpecificationInterface } from './interface';

export class SpecificationRepository implements SpecificationInterface {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = connection.getRepository(Specification);
  }

  public async create({
    description,
    name,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  public findByName(name: string): Promise<Specification> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }
}
