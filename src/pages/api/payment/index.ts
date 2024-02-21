import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 1000000000;

                const payment = await prisma.payment.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalproduct = await prisma.payment.count();
                
                res.status(200).json({ payment });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the product" });
            }
            break;

        case 'POST':
            try {
                const newpayment = await prisma.products.create({
                    data: req.body,
                });

                res.status(201).json(newpayment);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the product" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}