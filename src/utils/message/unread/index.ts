import { faunaDb } from '../../../services/fauna'
import { query as q } from 'faunadb'

interface Data {
  ref: { id: string }
  data: {
    message: string
    whereof: 'user' | 'admin'
    room: string
    timestamp: Date
  }
}

interface MessagesResponse {
  data?: Data[]
}

interface UnreadParams {
  currentUser: string
  otherUser: string
}

const Unread = async function ({ currentUser, otherUser }: UnreadParams) {
  try {
    const response = await faunaDb.query<MessagesResponse>(
      q.Filter(
        q.Map(
          q.Paginate(q.Documents(q.Collection('messages'))),
          q.Lambda('messages', q.Get(q.Var('messages')))
        ),
        q.Lambda(
          'all',
          q.Equals(
            q.ContainsValue(
              otherUser,
              q.SelectAll(['data', 'from'], q.Var('all'))
            ),
            q.ContainsValue(
              currentUser,
              q.SelectAll(['data', 'to'], q.Var('all'))
            ),
            q.ContainsValue(
              false,
              q.SelectAll(['data', 'visualized'], q.Var('all'))
            ),
            true
          )
        )
      )
    )

    if (response?.data) return response.data
    else return []
  } catch (error) {
    console.log(error)
    return []
  }
}

export default Unread
