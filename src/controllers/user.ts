
import { User, UserDocument } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";



/**
 * GET /users
 * List of users.
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {


    User.find({},"name _id").then((user: Array<UserDocument>) => {

        /* if (!user) {
            return res.status(402).json({ status: 402, msg: 'No users found' });
        } */

        res.json({ "status": 200, "data": { users :  user} });

    }).catch((e) => { return next(e); });

};


/**
 * POST /users
 * Add new user.
 */
export const addUser = async (req: Request, res: Response, next: NextFunction) => {

    await check("name", "Name should not be empty or less than 3 chars or exceed 20 chars").isLength({ min: 3, max: 20 }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
    }

    User.findOne({ name: req.body.name }).then((user: UserDocument | null) => {

        if (user) {
            return res.status(402).json({ status: 402, msg: "User already exists" });
        }

        User.create({ name: req.body.name }).then((user: UserDocument) => {
            res.json({ "status": 200, "data": { name: user.name } });
        }).catch((e) => {
            return next(e);
        });

    }).catch((e) => { return next(e); });

};