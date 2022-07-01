import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import PrivateRoute from './components/Privacy/PrivateRoute'
import Profile from './pages/Profile'
import Recipe from './pages/Recipe'
import CreateRecipe from './pages/RecipeForms/CreateRecipe'
import UpdateRecipe from './pages/RecipeForms/UpdateRecipe'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='recipe/:id' element={<Recipe/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
