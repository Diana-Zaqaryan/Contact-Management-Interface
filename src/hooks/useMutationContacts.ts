import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addContact, deleteContact, updateContact } from '../http.ts'
import { useNavigate } from 'react-router-dom'

export default function useMutationContacts() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const addMutation = useMutation({
    mutationKey: ['add contact'],
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ['delete contact'],
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      navigate(`/`)
    },
  })

  const updateMutation = useMutation({
    mutationKey: ['update contact'],
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })

  return {
    addContact: addMutation.mutate,
    deleteContact: deleteMutation.mutate,
    updateContact: updateMutation.mutate,
  }
}
