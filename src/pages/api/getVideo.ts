import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'POST':
      const { muscle, equipment } = req.body;
      const video = await prisma.ejercicios.findFirst({
        where: {
          grupoMuscular: {
            nombre: muscle
          },
          equipamiento: equipment
        },
        select: {
          url_video: true
        }
      });
      res.status(200).json(video);
      break;
    default:
      res.status(200).send("Need another method");
  }
}

export default handler;
