import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    switch (requestMethod) {
        case 'GET':
            const equipamientos = await prisma.equipamientos.findMany({
                select: {
                    nombre: true,
                    url_foto: true
                }
            });
            res.status(200).json(equipamientos);
            break;
        default:
            res.status(200).send("Need another method");
    }
}

export default handler;
