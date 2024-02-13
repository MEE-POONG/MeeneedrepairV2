// api/orderlist.ts
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

                const orderLists = await prisma.orderList.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    include: {
                        Products: true,
                    },
                });

                const totalOrders = await prisma.orderList.count();
                const totalPage: number = Math.ceil(totalOrders / pageSize);
                res.status(200).json({ orderLists, totalPage });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while fetching the order lists" });
            }
            break;

        case 'POST':
            try {
                const { date, orderId, productIds } = req.body; // ดึงข้อมูลวันที่และเวลา, orderId, และรหัสสินค้าทั้งหมดจาก req.body

                const newOrderLists = [];
                for (const productId of productIds) {
                    const newOrderList = await prisma.orderList.create({
                        data: {
                            date,
                            orderId,
                            productId,
                            // ส่วนอื่น ๆ ของข้อมูลรายการสั่งซื้อสามารถเพิ่มตามต้องการ
                        },
                    });
                    newOrderLists.push(newOrderList);
                }

                res.status(201).json(newOrderLists);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while creating the OrderList" });
            }

            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
