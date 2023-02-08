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

interface UpdateMessageParams {
  currentUser: string
  otherUser: string
}

const UpdateMessage = async function ({
  currentUser,
  otherUser
}: UpdateMessageParams): Promise<void> {
  try {
    const response = await faunaDb.query<MessagesResponse>(
      q.Foreach(
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
        ),
        q.Lambda(
          'data',
          q.Update(q.Select(['ref'], q.Var('data')), {
            data: {
              visualized: true
            }
          })
        )
      )
    )
  } catch (error) {
    console.log(error)
    return
  }
}

export default UpdateMessage
