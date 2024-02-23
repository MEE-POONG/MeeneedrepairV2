import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const products = await prisma.products.findMany({
                    include: {
                        Categories: true // ต้องรวมข้อมูลของหมวดหมู่ด้วย
                    },
                });

                res.status(200).json({ products });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the product" });
            }
            break;

        case 'POST':
            try {
                const newproduct = await prisma.products.create({
                    data: req.body,
                });

                res.status(201).json(newproduct);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the product" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
