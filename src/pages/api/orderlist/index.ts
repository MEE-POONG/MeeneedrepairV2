import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const orderlists = await prisma.orderList.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    include: {
                        Order: true,
                        Products: true,
                    },
                });

                const totalorderlists = await prisma.orderList.count();
                const totalPage: number = Math.ceil(totalorderlists / pageSize);

                res.status(200).json({ orderlists, totalPage, currentPage: page });
            } catch (error) {
                console.error('An error occurred:', error);
                res.status(500).json({ error: "An error occurred while fetching the product" });
            }
            break;

        case 'POST':
            try {
                const newOrderList = await prisma.orderList.create({
                    include: {
                        Order: true,
                        Products: true,
                    },
                    data: req.body,
                });

                res.status(201).json(newOrderList);
            } catch (error) {
                console.error('An error occurred:', error);
                res.status(500).json({ error: "An error occurred while creating the product" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
