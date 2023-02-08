import { faunaDb } from '@/services/fauna'
import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'

interface Response {
  ref: string
  data: {
    contacts: string[]
  }
}

const UpdateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await faunaDb.query<Response>(
      q.Get(q.Match(q.Index('user_by_email'), req.body.email))
    )

    await faunaDb.query(
      q.Update(response.ref, {
        data: {
          ...req.body
        }
      })
    )

    return res.status(200).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export default UpdateUser
