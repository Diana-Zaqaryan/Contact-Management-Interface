import { Contact } from './types/type'

export const URL = 'http://localhost:3001/contacts'

export const getContacts = async (): Promise<Contact[] | undefined> => {
  try {
    const response: Response = await fetch(URL)
    return (await response.json()) as Promise<Contact[]>
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

export const getContactById = async (id: string): Promise<Contact> => {
  try {
    const response = await fetch(`${URL}/?id=${id}`)
    const data = await response.json()
    return data[0]
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

export const addContact = async (body: Contact) => {
  try {
    const response: Response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data: Promise<Contact> = await response.json()
    return data
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }
}

export const deleteContact = async (id: string) => {
  try {
    const deleteUrl = `${URL}/${id}`
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
    })
    return response.json()
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }
}

export const updateContact = async ({
  id,
  body,
}: {
  id: string
  body: Contact
}) => {
  try {
    const updateUrl = `${URL}/${id}`
    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json()
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    }
    throw e
  }
}
