import { useQuery } from '@tanstack/react-query'
import { getContactById, getContacts } from '../http.ts'
import { Contact } from '../types/type.ts'

export default function useContact(id?: string): {
  data: Contact | Contact[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
} {
  const { data, isLoading, error, refetch } = useQuery({
    initialData: undefined,
    queryKey: id ? ['contact', id] : ['contacts'],
    queryFn: id
      ? (): Promise<Contact | Contact[]> => getContactById(id)
      : getContacts,
    staleTime: 5 * 60 * 1000,
  })

  return { data: data ?? [], isLoading, error, refetch }
}
