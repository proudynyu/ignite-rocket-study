import { Repository } from 'typeorm';

import { connection } from '../../../../database';
import { Category } from '../../model/Category';
import { CategoryRepositoryInterface } from './interface';

export class CategoriesRepositories implements CategoryRepositoryInterface {
  private repository: Repository<Category>;

  constructor() {
    this.repository = connection.getRepository(Category);
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
    return category;
  }

  public async list(): Promise<Category[]> {
    return await this.repository.find();
  }

  public async findByName(name: string): Promise<Category> {
    return await this.repository.findOne({
      where: {
        name
      }
    });
  }
}

export const categoriesRepository = new CategoriesRepositories();
