import fs from 'node:fs';
import { parse } from 'csv-parse';

import { CategoriesRepositories } from '../../repositories/category';

export class ImportCategoryUseCase {
  constructor(private categoriesRepositories: CategoriesRepositories) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach((category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepositories.findByName(name);

      if (!existCategory) {
        this.categoriesRepositories.create({ name, description });
      }
    });
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}
