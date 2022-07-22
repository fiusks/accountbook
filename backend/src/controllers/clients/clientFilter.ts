import prisma from "../../database/client";

const clientNameFilter = async (req, res) => {
    const { pesquisa } = req.query;

    try {
        const nameSearch = await prisma.client.findFirst({
            where: {
                name: pesquisa
            }
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export default clientNameFilter;