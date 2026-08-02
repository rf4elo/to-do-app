import { prisma } from "../config/database.ts";
import { UserDTO } from "../models/userModel.ts";

import { Compare, Hash } from "../utils/hash.ts";
import { SignJWT } from "jose";

import { config } from "dotenv";
config();


const SECRET = new TextEncoder().encode(process.env.JWT_KEY);


export async function GetUser(email: string) {

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user) throw new Error("User not found.");
    return user;
}

export async function Register(user: UserDTO) {

    const { name, email, password } = user;
    if(!name || !email || !password) throw new Error("All fields must be filled.");

    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if(userExists) throw new Error("User already exists.");

    const HashedPassword = await Hash(password);

    const newUser = await prisma.user.create({
        data: {
            email: email, name: name, password: HashedPassword
        },
        select: {
            id: true,
            email: true,
            name: true,
            password: false
        }
    });

    return newUser;

};

export async function Login(email: string, password: string) {
    
    if(!email || !password) throw new Error("All fields must be filled.");

    const user = await prisma.user.findUnique({
        where: { email }
    });
    if(!user) throw new Error("User not found.");
    
    const isMatch = await Compare(password, user.password);
    if(!isMatch) throw new Error("Invalid credentials.");

    const token = await new SignJWT({ email: user.email, id: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .setIssuedAt()
    .sign(SECRET);

    return token;

}

