import { Request, Response } from "express";
import * as userService from "../services/userService.ts";

import { UserDTO } from "../models/userModel.ts";


export async function RegisterUser(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;
        const newUser:UserDTO = { id: 0, name, email, password };
        const response = await userService.Register(newUser);
        return res.status(201).json({ "message":"User registered successfully.", "user": response });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ "message": error.message });
        }
        return res.status(500).json({ "message": "An unknown error occurred." });
    }
};

export async function LoginUser(req: Request, res: Response): Promise<Response> {
    try {
        const { email, password } = req.body;
        
        const token = await userService.Login(email, password);
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000, // 2 hours,
            path: "/"
        });
        
        return res.status(201).json({ "message":"Login successful.", "token": token });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ "message": error.message });
        }
        return res.status(500).json({ "message": "An unknown error occurred." });
    }
};

