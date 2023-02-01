import { CategoryModel } from '../../model/Category';

export abstract class CategoryRepositoryInterface {
  create: ({ name, description }: ICreateCategoryDTO) => CategoryModel;
  list: () => CategoryModel[];
  findByName: (name: string) => CategoryModel | undefined;
}
