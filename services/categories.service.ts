import pool from '../database/database.config';
import winston from 'winston';
import { CategoryModel } from '../models/categories.model';
import { CreateCategoryDto } from '../dtos/categories.dto';

class CategoryService {

    public categories = new CategoryModel();

    public async getAll(callback: any) {
        pool().getConnection((err, connection) => {
            if(!err) {
                winston.info(`Connected to the database`);
            } else {
                winston.info(err);
            }
            connection.query('SELECT * from categories' , (getAllError, response) => {
                connection.release();
                if (getAllError) {
                    callback(getAllError);
                } else {
                    callback(null, response);
                }
            });
        });
    }

    public async get(id: number,callback: Function ){
        pool().getConnection((err, connection) => {
            if(!err) {
                winston.info(`Connected to the database`);
            } else {
                winston.info(err);
            }
    
            connection.query('SELECT * from categories WHERE id = ? ', id, (getError, response) => {
                connection.release();
                if (getError) {
                    callback(getError);
                } else {
                    callback(null, response);
                }
              });
        });
    }

    public async create(categoryData: CreateCategoryDto,callback: any ){
        pool().getConnection((err, connection) => {
            if(!err) {
                winston.info(`Connected to the database`);
            } else {
                winston.info(err);
            }
            connection.query('INSERT INTO categories set ? ', categoryData , (createError, response) => {
                connection.release();
                
                if (createError) {
                    callback(createError);
                }else {
                    callback(null, response);
                }
              });
        });
    }
    
    public async update(id: number, category: any, callback: Function ){
        pool().getConnection((err, connection) => {
            if(!err) {
                winston.info(`Connected to the database`);
            } else {
                winston.info(err);
            }
    
            connection.query('UPDATE categories set name = ? WHERE id = ? ', [category.name,id] , (updateError, response) => {
                connection.release();
                if (updateError) {
                    callback(updateError);
                } else {
                    callback(null, response);
                }
              });
        });
    }

    public async deleteData(id: number,callback: Function){
        pool().getConnection((err, connection) => {
            if(!err) {
                winston.info(`Connected to the database`);
            } else {
                winston.info(err);
            }
    
            connection.query('DELETE from categories WHERE id = ? ', [id] , (deleteError, response) => {
                connection.release();
                if (deleteError) {
                    callback(deleteError);
                } else {
                    callback(null, response);
                }
              });
        });
    }
}

export default CategoryService;
