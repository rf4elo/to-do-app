import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "jose";

import { prisma } from "../config/database.ts";


export async function ValidateProtectedRoutes(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies?.authToken;
    if (!token) {
        return res.status(401).json({ "message": "Unauthorized: You must be logged in to access this resource." });
    }
    const decodedToken = await decodeJwt(token);
    if(!decodedToken.email || !decodedToken.id) return res.status(401).json({ "message": "Invalid token." });

    const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });

    if(!user) {
        return res.status(404).json({ "message": "User not found." });
    }

    next();

};

