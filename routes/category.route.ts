import { Router } from 'express';
import CategoryController from '../controller/categories.controller';
import { Routes } from '../interface/routes.interface';
import  {validate} from '../helper/validator.helper.js';
import {category, updatecategory} from '../validation/category.validation'


class CategoryRoute implements Routes {
    public path = '/categories';
    public router = Router();
    public categoryController = new CategoryController();
    constructor() {
      this.initializeCategoryRoutes();
    }
    
    public initializeCategoryRoutes() {
      this.router.get(`${this.path}`, this.categoryController.getAllCategory);
      this.router.get(`${this.path}/:id`, this.categoryController.getCategory);
      this.router.post(`${this.path}`, [ validate.body( category.schemaCategory ) ], this.categoryController.createCategory);
      this.router.put(`${this.path}/:id`, [ validate.body( updatecategory.schemaUpdateCategory ) ] , this.categoryController.updateCategory);
      this.router.delete(`${this.path}/:id`, this.categoryController.deleteCategory);
    }
  }

  
export default CategoryRoute;
