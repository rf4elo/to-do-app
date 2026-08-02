import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "jose";


export async function ValidateProtectedRoutes(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies?.authToken;

    if (!token) {
        return res.status(401).json({ "message": "Unauthorized: You must be logged in to access this resource." });
    }

    next();

};

