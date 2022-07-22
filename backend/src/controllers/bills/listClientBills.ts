import prisma from "../../database/client";

const listClientBills = async (req, res) => {
    try {
        const { client_id } = req.params;

        const clientBills = await prisma.transaction.findFirst({
            where: {
                client_id
            }
        })

        return res.status(200).json(clientBills);
    } catch (error) {
        return res.status(400).json("Falha ao detalhar o cliente.");
    }
};

export default listClientBills;