export interface IClients extends IFullAddress {
    id: number
    name: string
    email: string
    cpf: string
    phone: string
}

interface IFullAddress {
    address?: string
    complement?: string
    zipcode?: string
    district?: string
    city?: string
    state?: string
}