import prisma from "../../database/client";

const deleteBill = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.transaction.delete({
            where: {
                id
            }
        })

        return res.status(200).json("Cobrança deletada com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

export default deleteBill;
