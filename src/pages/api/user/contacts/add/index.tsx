import { faunaDb } from '@/services/fauna'
import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'

interface Contact {
  id: string
  name: string
  email: string
  photoURL: string
}

interface Response {
  ref: string
  data: {
    id: string
    name: string
    email: string
    photoURL: string[]
    contacts: Contact[]
  }
}

const UpdateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userExists = await faunaDb.query<Response | false>(
      q.If(
        q.Exists(
          q.Match(q.Index('user_by_email'), q.Casefold(req.body.newContact))
        ),
        q.Get(
          q.Match(q.Index('user_by_email'), q.Casefold(req.body.newContact))
        ),
        false
      )
    )

    if (!userExists) return res.status(404).end()

    const response = await faunaDb.query<Response>(
      q.Get(q.Match(q.Index('user_by_email'), req.body.email))
    )

    const findByEmail = response.data.contacts.find(
      c => c.email === req.body.newContact
    )

    if (findByEmail) {
      return res.status(403).end()
    }

    await faunaDb.query(
      q.Update(response.ref, {
        data: {
          contacts: [
            ...response.data.contacts,
            {
              id: userExists.data.id,
              name: userExists.data.name,
              email: userExists.data.email,
              photoURL: userExists.data.photoURL
            }
          ]
        }
      })
    )

    return res.status(200).json({
      contacts: [
        ...response.data.contacts,
        {
          id: userExists.data.id,
          name: userExists.data.name,
          email: userExists.data.email,
          photoURL: userExists.data.photoURL
        }
      ]
    })
  } catch (error) {
    return res.status(500).end()
  }
}

export default UpdateUser
