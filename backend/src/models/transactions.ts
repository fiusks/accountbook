export interface ITransaction {
    id: number,
    amount: number,
    type: "credit" | "debit"
    due_date: Date
    status: "paid" | "pending" | "overdue" | null
    description: string
    client_id: number
    created_at?: Date
    updated_at?: Date
}