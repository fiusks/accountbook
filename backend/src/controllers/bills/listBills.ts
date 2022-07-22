import prisma from "../../database/client";
import { IClients } from "../../models/clients";

function checkLength(value) {
    return value < 10 ? `0${String(value)}` : String(value);
}
const listBills = async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const getPaidBills = await prisma.transaction.findMany({
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }, where: {
                status: "paid"
            }
        })


        getPaidBills.forEach(bill => {
            bill.amount = BigInt(Number(bill.amount) / 100);
        })
        const quantityPaidBills = getPaidBills.length;

        const totalAmountPaidSUM = await prisma.transaction.aggregate({
            where: {
                status: "paid"
            },
            _sum: {
                amount: true
            }
        })

        const getUnpaidBills = await prisma.transaction.findMany({
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }, where: {
                status: "pending",
                due_date: {
                    gte: today
                }
            }
        })

        getUnpaidBills.forEach(bill => {
            bill.amount = BigInt(Number(bill.amount) / 100);
        })

        const quantityUnpaidBills = getUnpaidBills.length;

        const totalAmountUnpaidSUM = await prisma.transaction.aggregate({
            where: {
                status: "pending",
                due_date: {
                    gte: today
                }
            }, _sum: {
                amount: true
            }
        })

        const getOverdueBills = await prisma.transaction.findMany({
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }, where: {
                status: "pending",
                due_date: {
                    lt: today
                }
            }
        })

        getOverdueBills.forEach((bill) => {
            bill.status = "overdue";
            bill.amount = BigInt(Number(bill.amount) / 100);
        });

        const quantityOverdueBills = getOverdueBills.length;
        const totalAmountOverdueSUM = await prisma.transaction.aggregate({
            where: {
                status: "pending",
                due_date: {
                    lt: today
                }
            },
            _sum: {
                amount: true
            }
        })

        const totalAmountOverdue = totalAmountOverdueSUM._sum.amount;
        const totalAmountUnpaid = totalAmountUnpaidSUM._sum.amount;
        const totalAmountPaid = totalAmountPaidSUM._sum.amount;

        const clients = await prisma.client.findMany({
            select: {
                id: true, name: true, cpf: true, email: true, phone: true
            }, orderBy: {
                id: "desc"
            }
        })
        const clientsWithStatus: IClients[] = clients

        for (const client of clientsWithStatus) {
            const cobrancas = await prisma.transaction.findMany({
                where: {
                    client_id: client.id,
                    status: "pending"
                }
            })

            const overdue = cobrancas.filter((cobranca) => cobranca.due_date < today);
            if (overdue.length !== 0) {
                client.status = "Inadimplente";
            } else {
                client.status = "Em dia";
            }
        }
        const ondueClients = clientsWithStatus.filter((client) => client.status === "Em dia");
        const overdueClients = clientsWithStatus.filter(
            (client) => client.status === "Inadimplente"
        );

        return res.status(200).json({
            client: {
                overdueClients: overdueClients.slice(0, 4),
                quantityOverdueClients: `${checkLength(overdueClients.length)}`,
                ondueClients: ondueClients.slice(0, 4),
                quantityOndueClients: `${checkLength(ondueClients.length)}`,
                overdueBills: getOverdueBills.slice(0, 4),
                quantityOverdueBills: `${checkLength(quantityOverdueBills)}`,
                paidBills: getPaidBills.slice(0, 4),
                quantityPaidBills: `${checkLength(quantityPaidBills)}`,
                unpaidBills: getUnpaidBills.slice(0, 4),
                quantityUnpaidBills: `${checkLength(quantityUnpaidBills)}`,
                totalAmountPaid: Number(totalAmountPaid) / 100,
                totalAmountUnpaid: Number(totalAmountUnpaid) / 100,
                totalAmountOverdue: Number(totalAmountOverdue) / 100,
            },
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};

export default listBills;
