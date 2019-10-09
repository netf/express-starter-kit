
import express from "express";
import userController from "../controllers/user";
import userService from "../services/user";
import validator from "../services/validator";
const userSchema = require("../validations/user");

const router = express.Router();

router.post('/signin', validator(userSchema.signin, 'body'), userService.signin, (req, res, next) => {
    userController.signin(req, res, next);
});

router.post('/signup', validator(userSchema.signup, 'body'), userService.signup, (req, res, next) => {
    userController.signup(req, res, next);
});

router.get('/', userService.requireAuth, (req, res, next) => {
    userController.user(req, res, next);
});


export default router;