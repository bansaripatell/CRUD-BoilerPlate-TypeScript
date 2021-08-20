import { Category } from '../interface/categories.interface';


export class CategoryModel implements Category {
    public id!: number;
    public name!: string;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }