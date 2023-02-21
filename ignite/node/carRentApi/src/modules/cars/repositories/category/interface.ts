import { Category } from '../../model/Category';

export abstract class CategoryRepositoryInterface {
  create: ({ name, description }: ICreateCategoryDTO) => Promise<Category>;
  list: () => Promise<Category[]>;
  findByName: (name: string) => Promise<Category>;
}
