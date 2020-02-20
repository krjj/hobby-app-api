
import { User, UserDocument } from "../models/User";
import { Hobby, HobbyDocument } from "../models/Hobby";
import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { Types } from "mongoose";


/**
 * GET /hobbies
 * List of hobbies
 */
export const getHobbies = async (req: Request, res: Response, next: NextFunction) => {

    await check("id", "id representing user id should not be empty").not().isEmpty().run(req);
    await check("id","id is not in valid format, must be ObjectId").custom((value) => Types.ObjectId.isValid(value)).run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
    }

    User.findOne({ _id: req.params.id }).then((user: UserDocument | null) => {

        if (!user) {
            return res.status(402).json({ status: 402, msg: "User does not exist" });
        }

        Hobby.find({ userId: req.params.id }, "name year passion").then((hobby: Array<HobbyDocument>) => {
            res.json({ "status": 200, "data": hobby });
        }).catch((e) => {
            return next(e);
        });

    }).catch((e) => { return next(e); });

};


/**
 * POST /hobby
 * Add new hobby.
 */
export const addHobby = async (req: Request, res: Response, next: NextFunction) => {

    await check("id", "id representing user id should not be empty").not().isEmpty().run(req);
    await check("id","id is not in valid format, must be ObjectId").custom((value) => Types.ObjectId.isValid(value)).run(req);
    await check("name", "name field cannot be empty").not().isEmpty().run(req);
    await check("year", "year field should be valid number").isNumeric().run(req);
    await check("passion", "passion should be of valid type i.e low, medium, high, very high").isIn(["low", "medium", "high", "very high"]).run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
    }

    User.findOne({ _id: req.params.id }).then((user: UserDocument | null) => {

        if (!user) {
            return res.status(402).json({ status: 402, msg: "User does not exist" });
        }

        Hobby.create({ userId: req.params.id, name: req.body.name, passion: req.body.passion, year: req.body.year }).then((hobby: HobbyDocument) => {
            res.json({ "status": 200 });
        }).catch((e) => {
            return next(e);
        });

    }).catch((e) => { return next(e); });

};


/**
 * Delete /hobby
 * Remove hobby.
 */
export const deleteHobby = async (req: Request, res: Response, next: NextFunction) => {

    await check("id", "id representing user id should not be empty").not().isEmpty().run(req);
    await check("id","id is not in valid format, must be ObjectId").custom((value) => Types.ObjectId.isValid(value)).run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
    }

    Hobby.deleteOne({ _id: req.params.id }).then((hobby) => {
        res.json({ "status": 200 });
    }).catch((e) => {
        return next(e);
    });

};