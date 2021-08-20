import Joi from 'joi';
const minName : number = 5;
const maxName : number = 255;

export const category = {
    schemaCategory : Joi.object({
        name: Joi.string().min(minName).max(maxName).required().empty().messages({
            'string.base': `name should be a type of 'text'`,
            'string.empty': `name cannot be an empty field`,
            'string.min': `name should be of minimum 5 characters`,
            'string.max': `name should be of maximum 255 characters`,
            'any.required': `name is a required field`}
        )}
    )};

export const updatecategory = {
    schemaUpdateCategory : Joi.object({
        name: Joi.string().min(minName).max(maxName).empty().messages({
            'string.base': `name should be a type of 'text'`,
            'string.empty': `name cannot be an empty field`,
            'string.min': `name should be of minimum 5 characters`,
            'string.max': `name should be of maximum 255 characters`}
        )}
    )};
