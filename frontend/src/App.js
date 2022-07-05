import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/users/login/Login'
import Register from './pages/users/register/Register'
import PrivateRoute from './components/Privacy/PrivateRoute'
import ChefeRoute from './components/Privacy/ChefeRoute'
import Profile from './pages/Profile'
import Recipe from './pages/Recipe'
import CreateRecipe from './pages/RecipeForms/CreateRecipe'
import UpdateRecipe from './pages/RecipeForms/UpdateRecipe'
import NavBar from './components/Nav/NavBar'

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='recipe/:id' element={<Recipe />} />
          </Route>
          <Route path='/createRecipe' element={<CreateRecipe />} />
          <Route path='/updateRecipe' element={<UpdateRecipe />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
