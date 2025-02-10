import { FieldApi, Validator } from '@tanstack/react-form'
import { z } from 'zod'

export type Contact = {
  id: string
  name: string
  lastName: string
  userName: string
  info: string
  image?: string
}

export type ContactProp = {
  data: Contact[] | Contact
  isLoading: boolean
  error: Error | null
  handleSelectedContact: (id: string) => void
  selectedContactId: string
  resetSelectedContactId: () => void
}

export type AddFormProps = {
  handleSelectContact: (id: string) => void
  data: Contact[] | Contact
  contact?: Contact | null
}

export type DetailProp = {
  contactId: string
  handleEdit: (d: Contact) => void
}

export type fieldType = FieldApi<
  Contact | Omit<Contact, 'id'>,
  'name',
  undefined,
  Validator<unknown, z.ZodType<Contact, z.ZodTypeDef, Contact>>,
  string
>
