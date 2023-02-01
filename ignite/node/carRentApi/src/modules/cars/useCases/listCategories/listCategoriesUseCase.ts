import { CategoryRepositoryInterface } from "../../repositories/category/interface";

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoryRepositoryInterface) {}
  
  public execute() {
    return this.categoriesRepository.list()
  }
}