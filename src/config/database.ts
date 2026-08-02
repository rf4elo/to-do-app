import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

import { config } from "dotenv";
config();

const db_key = await process.env.DATABASE_URL;
if(!db_key) throw new Error("DATABASE_URL is missing on env file.");


const adapter = new PrismaPg({ connectionString: db_key });


export const prisma = new PrismaClient({
    adapter: adapter
});


