import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // โค้ดสำหรับการดึงข้อมูล Order จากฐานข้อมูล
                // สามารถปรับแก้ตามความต้องการของคุณได้
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while fetching the orders" });
            }
            break;

        case 'POST':
            try {
                const { date, userId, productIds } = req.body; // ดึงข้อมูลวันที่และเวลา, userId, และรหัสสินค้าทั้งหมดจาก req.body

                const newOrder = await prisma.order.create({
                    data: {
                        date,
                        
                        userId, // บันทึก userId ลงใน Order
                        // ส่วนอื่น ๆ ของข้อมูล Order สามารถเพิ่มตามต้องการ
                    },
                });

                const orderId = newOrder.id; // เก็บรหัส orderId ที่สร้างได้จากการสร้าง Order

                // สร้าง OrderList สำหรับแต่ละสินค้าที่มีในตะกร้า
                const newOrderLists = [];
                for (const productId of productIds) {
                    const newOrderList = await prisma.orderList.create({
                        data: {
                            date,
                            orderId,
                            productId,
                            // ส่วนอื่น ๆ ของข้อมูล OrderList สามารถเพิ่มตามต้องการ
                        },
                    });
                    newOrderLists.push(newOrderList);
                }

                res.status(201).json({ orderId, newOrderLists }); // ส่งข้อมูล orderId และ newOrderLists กลับไปยังผู้ใช้
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while creating the Order and OrderLists" });
            }

            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
