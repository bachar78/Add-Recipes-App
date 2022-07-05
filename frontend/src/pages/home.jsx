import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {getRecipesHome} from '../features/recipes/recipeSlice'

function Home() {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getRecipesHome())
  },[])
  return <div>home</div>
}

export default Home
