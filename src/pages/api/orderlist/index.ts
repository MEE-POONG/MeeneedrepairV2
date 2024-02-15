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
                const orders = await prisma.order.findMany({
                    include: {
                        OrderList: {
                            include: {
                                Products: true // เรียกข้อมูลสินค้าที่เกี่ยวข้องในแต่ละรายการ OrderList
                            }
                        }
                    },
                });

                const totaluser = await prisma.order.count();
                const totalPage: number = Math.ceil(totaluser / pageSize);
                res.status(200).json({ orders });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while fetching the orders" });
            }
            break;


        case 'POST':
            try {
                const { date, userId, productIds, quantities } = req.body; // ดึงข้อมูลวันที่และเวลา, userId, รหัสสินค้าทั้งหมด และจำนวนสินค้าจาก req.body

                const newOrder = await prisma.order.create({
                    data: {
                        date,
                        status: "ยังไม่ชำระเงิน",
                        userId, // บันทึก userId ลงใน Order
                        // ส่วนอื่น ๆ ของข้อมูล Order สามารถเพิ่มตามต้องการ
                    },
                });

                const orderId = newOrder.id; // เก็บรหัส orderId ที่สร้างได้จากการสร้าง Order

                // สร้าง OrderList สำหรับแต่ละสินค้าที่มีในตะกร้า
                const newOrderLists = [];
                for (let i = 0; i < productIds.length; i++) {
                    const productId = productIds[i];
                    const quantity = quantities[i];
                    const newOrderList = await prisma.orderList.create({
                        data: {
                            date,
                            orderId,
                            productId,
                            userId,
                            quantity,
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
