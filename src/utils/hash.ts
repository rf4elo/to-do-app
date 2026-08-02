import { hash, compare } from "bcrypt-ts";



export async function Hash(text: string) {
    const saltRounds = 10;
    const hashedText = await hash(text, saltRounds);
    return hashedText;
}


export async function Compare(text: string, hashedText: string) {
    const isMatch = await compare(text, hashedText);
    return isMatch;
}


