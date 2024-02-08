// import { PrismaClient } from "@prisma/client";
// import type { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { method } = req;

//     switch (method) {
//         case 'GET':
//             try {
//                 const id = req.query.id;

//                 const data = await prisma.user.findUnique({
//                     where: {
//                         id: id as string,
//                     },
//                 });

//                 res.status(200).json(data);
//             } catch (error) {
//                 res.status(500).json({ error: "An error occurred while fetching the data" });
//             }
//             break;

//         case 'PUT':
//             try {
//                 const id = req.query.id;
//                 const userData = await prisma.user.findUnique({
//                     where: {
//                         id: id as string,
//                     },
//                 });

//                 if (!userData) {
//                     res.status(404).json({ error: "User not found" });
//                     return;
//                 }

//                 // นี่คือข้อมูลใหม่ที่คุณต้องการเพิ่มใน ProductsItems
//                 const newProductsItems = req.body.ProductsItems; // หรือแบบอื่น ๆ ตามที่คุณต้องการ

//                 // เพิ่มข้อมูลในฟิลด์ ProductsItems ของผู้ใช้
//                 const updatedUserData = await prisma.user.update({
//                     where: {
//                         id: id as string,
//                     },
//                     data: {
//                         ProductsItems: {
//                             push: newProductsItems,
//                         },
//                     },
//                 });

//                 res.status(200).json(updatedUserData);
//             } catch (error) {
//                 res.status(500).json({ error: "An error occurred while updating the data" });
//             }
//             break;

//             case 'DELETE':
//             try {
//                 const id = req.query.id;
//                 const userData = await prisma.user.findUnique({
//                     where: {
//                         id: id as string,
//                     },
//                 });
        
//                 if (!userData) {
//                     res.status(404).json({ error: "User not found" });
//                     return;
//                 }
        
//                 // นี่คือข้อมูลที่คุณต้องการลบจาก ProductsItems
//                 const itemsToRemove = req.body.ProductsItems; // หรือแบบอื่น ๆ ตามที่คุณต้องการ
        
//                 // สร้างรายการใหม่โดยลบรายการที่ต้องการถอด
//                 const updatedProductsItems = userData.ProductsItems.filter(item => !itemsToRemove.includes(item));
        
//                 // อัปเดตข้อมูลในฟิลด์ ProductsItems ของผู้ใช้
//                 const updatedUserData = await prisma.user.update({
//                     where: {
//                         id: id as string,
//                     },
//                     data: {
//                         ProductsItems: updatedProductsItems,
//                     },
//                 });
        
//                 res.status(200).json(updatedUserData);
//             } catch (error) {
//                 res.status(500).json({ error: "An error occurred while updating the data" });
//             }
//             break;
        
//         default:
//             res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//             res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }