import './searchbar.scss'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    navigate(`/searched/${input}`)
  }
  return (
    <form className='form' onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  )
}

export default SearchBar
