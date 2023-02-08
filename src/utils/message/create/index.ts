import { faunaDb } from '@/services/fauna'
import { query as q } from 'faunadb'

import { v4 as uuid } from 'uuid'

interface Message {
  to: string
  from: string
  message: string
  timestamp: string
}

async function CreateMessage(data: Message) {
  await faunaDb.query(
    q.Create(q.Collection('messages'), {
      data: {
        id: uuid(),
        to: data.to,
        from: data.from,
        timestamp: data.timestamp,
        message: data.message,
        visualized: false
      }
    })
  )
}
export default CreateMessage
