import prisma from "../../database/client";

const searchBill = async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const { params } = req.body.filterBill;

        const bills = await prisma.transaction.findMany({
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }, where: {
                client: {
                    name: {
                        contains: params,
                        mode: "insensitive"

                    }
                },
                OR: {
                    id: isNaN(params) ? undefined : params
                }
            },
            orderBy: {
                id: "desc"
            }, take: 10
        })

        for (const bill of bills) {
            if (bill.due_date < today && bill.status !== "paid") {
                bill.status = "overdue";
            }

            bill.amount = BigInt(Number(bill.amount) / 100);
        }
        if (bills.length === 0) {
            return res.status(404).json({ message: "Bill not found" });
        }
        return res.status(200).json(bills);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export default searchBill;
