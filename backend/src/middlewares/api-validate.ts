import { Request, Response, NextFunction } from "express";


export async function ValidateAPIRoutes(req: Request, res: Response, next: NextFunction) {

    const headers = req.headers;
    const apiKey = headers["x-api-key"];

    if (!apiKey) {
        return res.status(401).json({ "message": "API key is missing." });
    }

    if (apiKey != process.env.API_KEY) {
        return res.status(403).json({ "message": "Invalid API key." });
    }

    next();
};
