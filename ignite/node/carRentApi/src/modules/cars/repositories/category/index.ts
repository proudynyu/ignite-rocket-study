import { CategoryModel } from '../../model/Category';
import { CategoryRepositoryInterface } from './interface';

export class CategoriesRepositories implements CategoryRepositoryInterface {
  private categories: CategoryModel[];

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: ICreateCategoryDTO): CategoryModel {
    const category = new CategoryModel();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
    return category;
  }

  public list(): CategoryModel[] {
    return this.categories;
  }

  public findByName(name: string) {
    return this.categories.find((category) => category.name === name);
  }
}

export const categoriesRepository = new CategoriesRepositories();
