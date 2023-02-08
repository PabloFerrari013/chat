import { NextApiRequest, NextApiResponse } from 'next'

import { faunaDb } from '@/services/fauna'
import { query as q } from 'faunadb'

interface Response {
  data: {
    email: string
    name: string
    photoURL: string
    contacts: string[]
  }
}

const FindUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query.email) return res.status(500).end()

    const userExists = await faunaDb.query<Response | false>(
      q.If(
        q.Exists(
          q.Match(q.Index('user_by_email'), q.Casefold(req.query.email))
        ),
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold(req.query.email))),
        false
      )
    )

    if (userExists) {
      return res.status(200).json({
        user: {
          email: userExists.data.email,
          name: userExists.data.name,
          photoURL: userExists.data.photoURL,
          contacts: userExists.data.contacts
        }
      })
    } else {
      return res.status(200).json({
        user: false
      })
    }
  } catch (error) {
    return res.status(500).end()
  }
}

export default FindUser
