import validator from 'express-joi-validation';
export const validate = validator.createValidator({
    passError: true}
);