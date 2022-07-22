import prisma from "../../database/client";

const getBills = async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const bills = await prisma.transaction.findMany({
            include: {
                client: {
                    select: {
                        name: true
                    }
                }
            }, orderBy: {
                id: "desc"
            }, take: 10
        })

        for (const bill of bills) {
            if (bill.due_date < today && bill.status !== "paid") {
                bill.status = "overdue";
            }

            bill.amount = BigInt(Number(bill.amount) / 100);
        }

        return res.status(200).json({
            bills,
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};

export default getBills;
