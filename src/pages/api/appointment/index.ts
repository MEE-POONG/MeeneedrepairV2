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

                const Appointment = await prisma.appointment.findMany({
                    // skip: (page - 1) * pageSize,
                    // take: pageSize,
                    include: {
                        User: true
                    },
                });

                const totaluser = await prisma.appointment.count();
                const totalPage: number = Math.ceil(totaluser / pageSize);
                res.status(200).json({ Appointment });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the user" });
            }
            break;

        case 'POST':
            try {

                // Create a new appointment instance
                const { fname, lname, time, tel, request, message, email, video, status, addressId, repairmanId, userId } = req.body;

                // Create a new appointment instance
                const newAppointment = await prisma.appointment.create({
                    data: {
                        fname,
                        lname,
                        time,
                        tel,
                        request,
                        message,
                        email,
                        video,
                        status,
                        addressId,
                        // repairmanId, ยังไม่ลงคิว
                        userId
                    }
                });

                res.status(201).json(newAppointment);
            } catch (error) {
                console.log(error);
                
                res.status(500).json({ error: "An error occurred while creating the Appointment" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}