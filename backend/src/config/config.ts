import * as dotenv from 'dotenv'

dotenv.config()
export const config = {
    "secret": process.env.JWT_SECRET
}
