import { Client } from 'faunadb'

export const faunaDb = new Client({
  secret: process.env.FAUNA_SECRET_KEY!
})
