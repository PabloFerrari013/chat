import { NextApiRequest, NextApiResponse } from 'next'

import { faunaDb } from '@/services/fauna'
import { query as q } from 'faunadb'

import { v4 as uuid } from 'uuid'

interface User {
  data: {
    name: string
    email: string
    photoURL: string
    contacts: string[]
  }
}

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userExists = await faunaDb.query<User>(
      q.If(
        q.Exists(
          q.Match(q.Index('user_by_email'), q.Casefold(req.body.data.email))
        ),
        q.Get(
          q.Match(q.Index('user_by_email'), q.Casefold(req.body.data.email))
        ),
        false
      )
    )

    if (userExists) {
      return res.status(200).json({
        user: {
          name: userExists.data.name,
          email: userExists.data.email,
          photoURL: userExists.data.photoURL,
          contacts: userExists.data.contacts
        }
      })
    }

    await faunaDb.query(
      q.Create(q.Collection('users'), {
        data: {
          id: uuid(),
          name: req.body.data.name,
          email: req.body.data.email,
          photoURL: req.body.data.photoURL,
          timestamp: new Date(),
          contacts: []
        }
      })
    )

    return res.status(200).json({ user: false })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default Login
