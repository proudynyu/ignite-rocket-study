import { CategoryRepositoryInterface } from "../../repositories/category/interface";

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoryRepositoryInterface) {}

  public async execute({ name, description }: ICreateCategoryDTO) {
    const repo = this.categoriesRepository;

    const categoryAlreadyExists = repo.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists on the DB");
    }

    const category = repo.create({ name, description });

    return category;
  }
}
