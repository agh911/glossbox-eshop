import { check, validationResult } from 'express-validator';

export const validateProduct = [
    check('name').notEmpty().withMessage('Name is required'),
    check('description').optional(),
    check('price').isNumeric().withMessage('Price must be a number'),
    check('categories').isArray().withMessage('Categories must be an array'),
    check('brand').optional(),
    check('imageUrl').optional().isURL().withMessage('Invalid image URL'),
    check('stock').optional().isInt().withMessage('Stock must be an integer'),
];

export const validateUser = [
    // check('name').notEmpty().withMessage('Name is required'),
    // check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 12 }).withMessage('Password must be at least 12 characters long'),
];
