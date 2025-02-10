import { ChangeEvent } from 'react'

function Search({ handleInput }: { handleInput: (e: string) => void }) {
  return (
    <input
      type="string"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleInput(e.target.value)
      }
    />
  )
}

export default Search
