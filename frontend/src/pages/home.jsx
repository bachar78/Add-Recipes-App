import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipesHome } from '../features/recipes/recipeSlice'
import Spinner from '../components/spinner/Spinner'
import Categories from '../components/categories/Categories'
import Chefes from '../components/chefes/Chefes'
import { motion } from 'framer-motion'

function Home() {
  const { chefe } = useSelector((state) => state.auth)
  const { recipesHome, isLoading, isError, message, isHome } = useSelector(
    (state) => state.recipes
  )
  const { vegetarian, desert, chefes } = recipesHome

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRecipesHome())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .5 }}
    >
      <Categories type={vegetarian} />
      <Categories type={desert} />
      <Chefes chefes={chefes} />
    </motion.div>
  )
}

export default Home
