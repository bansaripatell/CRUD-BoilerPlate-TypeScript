import { NextFunction, Request, Response } from 'express';
import CategoryService from '../services/categories.service';
import { GeneralResponse } from '../utils/response.js';
import { Category } from '../interface/categories.interface';
import config from '../utils/config.js';
import error from '../utils/error';
import { CreateCategoryDto } from '../dtos/categories.dto';
const getError = 'Error while getting category';
const notFoundError = 'Category not found. Invalid categoryId';

class CategoryController {
    public categoryService = new CategoryService();

    public getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
        try{
            await this.categoryService.getAll((err: any, response: Category[]) => {
                
                if(typeof response != 'undefined' && response.length === 0){
                    next(new error.NotFound('No Category found'));
                }else if(err) {
                    next(new error.GeneralError(getError));
                }else{
                    next(new GeneralResponse('Category detail found',response));
                }
            })
        }catch (err) {
            res.send(err);
        }
    }

    public createCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryData: CreateCategoryDto = req.body;
            
            await this.categoryService.create(categoryData, (err: any, response: object) => {
                
                if(err) {
                    next(new error.GeneralError('Error while inserting category details'));
                }
                if(response !== null){
                    
                    next(new GeneralResponse('Category successfully inserted',undefined,config.HTTP_CREATED));
                }
            });
        } catch (err) {
            next(new error.GeneralError('Error while inserting category detail'));
        }
    }
    
    public getCategory = async (req: Request, res: Response, next: NextFunction) => {
        const id : any = req.params.id;
        try {
            await this.categoryService.get(id,(err : any, response: Category[]) => {
                if(typeof response != 'undefined' && response.length === 0){
                    next(new error.NotFound(notFoundError));
                } else if(err) {
                    next(new error.GeneralError('Error while getting category'));
                } else {
                    next(new GeneralResponse('Category detail found',response));
                }
            });
        } catch (err) {
            next(new error.GeneralError(getError));
        }
    }
    
    public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
        const id : any = req.params.id;
        try {
            await this.categoryService.update(id,req.body,(err : any, response: any) => {
                if(typeof response != 'undefined' && response.affectedRows === 0){
                    next(new error.NotFound(notFoundError));
                }else if(err) {
                    next(new error.GeneralError('Error while updating category'));
                }else {
                    next(new GeneralResponse('Category successfully updated',undefined,config.HTTP_CREATED));
                }
            });
        } catch (err) {
            next(new error.GeneralError('Error while updating category'));
        }
    }
    
    public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
        const id : any = req.params.id;
        try {
            await this.categoryService.deleteData(id,(err: any, response: any) => {
                if(typeof response != 'undefined' && response.affectedRows === 0){
                    next(new error.NotFound(notFoundError));
                } else if(err) {
                    next(new error.GeneralError('Error while deleting category'));
                } else {
                    next(new GeneralResponse('Category successfully deleted',undefined,config.HTTP_CREATED));
                }
            });
        } catch (err) {
            next(new error.GeneralError('Error while deleting category'));
        }
    }

}

export default CategoryController;
