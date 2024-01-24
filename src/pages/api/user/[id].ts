import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const id = req.query.id;

                if (!id || typeof id !== 'string') {
                    res.status(400).json({ error: "Invalid or missing 'id' parameter" });
                    return;
                }

                const data = await prisma.user.findUnique({
                    where: {
                        id: id,
                    },
                });

                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the data" });
            }
            break;

        case 'PUT':
            try {
                const id = req.query.id;

                if (!id || typeof id !== 'string') {
                    res.status(400).json({ error: "Invalid or missing 'id' parameter" });
                    return;
                }

                const data = await prisma.user.update({
                    where: {
                        id: id,
                    },
                    data: JSON.parse(req.body),
                });

                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the data" });
            }
            break;

        case 'DELETE':
            try {
                const id = req.query.id;

                if (!id || typeof id !== 'string') {
                    res.status(400).json({ error: "Invalid or missing 'id' parameter" });
                    return;
                }

                const data = await prisma.user.delete({
                    where: {
                        id: id,
                    },
                });

                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the data" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
