export interface ITransaction {
    id: number,
    amount: number,
    type: "credit" | "debit"
    date: Date
    due_date: Date | null
    status: "paid" | "pending" | null
    user_id: number
    created_at?: Date
    updated_at?: Date
}