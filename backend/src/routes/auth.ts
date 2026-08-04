import { Router, Response, Request } from "express";
import { jwtVerify } from "jose";


const authRoute: Router = Router();

const SECRET = new TextEncoder().encode(process.env.JWT_KEY);


authRoute.get("/auth", async (req: Request, res: Response) => {
    const token = req.cookies.authToken;

    if (!token) return res.status(401).json({ authenticated: false, message: "Cookie missing." });

    try {
        const { payload } = await jwtVerify(token, SECRET);

        return res.status(200).json({ authenticated: true, user: payload });
    } catch (error) {
        console.log("erro:", error);
        res.clearCookie('authToken');
        return res.status(500).json({ authenticated: false, message: "Invalid token." });
    }
});


export default authRoute;
