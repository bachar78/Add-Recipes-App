import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const { chefe } = useSelector((state) => state.auth)
  useEffect(() => {
    if (chefe) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setLoading(false)
  }, [chefe])

  return { loggedIn, loading }
}
