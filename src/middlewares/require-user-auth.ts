import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized-error";

export const requireUserAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser) {
        throw new UnauthorizedError();
    }
    next();
}