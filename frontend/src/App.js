import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/users/login/Login'
import Register from './pages/users/register/Register'
import Profile from './pages/Profile'
import Recipe from './pages/recipe/Recipe'
import CreateRecipe from './pages/RecipeForms/CreateRecipe'
import UpdateRecipe from './pages/RecipeForms/UpdateRecipe'
import NavBar from './components/Nav/NavBar'
import Filter from './components/filter/Filter'
import FilterCategory from './pages/filterCategory/FilterCategory'
import SearchBar from './components/searchBaar/SearchBar'
import Search from './pages/search/Search'
import ChefeRecipe from './pages/chefe/ChefeRecipe'
import { AnimatePresence } from 'framer-motion'
function App() {
  const location = useLocation()
  return (
    <div>
      <NavBar />
      <SearchBar />
      <Filter />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/searched/:search' element={<Search />} />
          <Route path='/filter/:Category' element={<FilterCategory />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreateRecipe />} />
          <Route path='/update' element={<UpdateRecipe />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='/chefe/:chefId' element={<ChefeRecipe />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
