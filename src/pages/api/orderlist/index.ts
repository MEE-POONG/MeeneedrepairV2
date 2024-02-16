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
                const { date, userId, productIds, quantities, addressId, paymentType, name, lname, phonenumber, typeaddress, addressline, zipcode, province, district, subdistrict, note, vat } = req.body;

                const newPayment = await prisma.payment.create({
                    data: {
                        img: '', // รูปภาพหรือข้อมูลที่เกี่ยวข้องกับการชำระเงิน (ถ้ามี)
                        paymentType,
                        name,
                        lname,
                        phonenumber,
                        typeaddress,
                        addressline,
                        zipcode,
                        province,
                        district,
                        subdistrict,
                        note,
                        vat,
                    },
                });

                const paymentId = newPayment.id;

                const newOrder = await prisma.order.create({
                    data: {
                        date,
                        status: "ยังไม่ชำระเงิน",
                        userId,
                        addressId,
                        paymentId,
                    },
                });

                const orderId = newOrder.id;

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
                        },
                    });
                    newOrderLists.push(newOrderList);
                }

                res.status(201).json({ orderId, newOrderLists });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while creating the Payment, Order, and OrderLists" });
            }

            break;



        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
