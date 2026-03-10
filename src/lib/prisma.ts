import { PrismaClient } from "../generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "askeet",
});

const prisma = new PrismaClient({ adapter });
export default prisma;