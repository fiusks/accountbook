export interface IClients extends IFullAddress {
    id: number
    name: string
    email: string
    cpf: string
    phone: string
    status?: "Inadimplente" | "Em dia"
}

interface IFullAddress {
    address?: string
    complement?: string
    zipcode?: string
    district?: string
    city?: string
    state?: string
}