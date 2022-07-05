import { GiCakeSlice, GiFruitBowl } from 'react-icons/gi'
import { RiPlantFill } from 'react-icons/ri'
import { BiDish } from 'react-icons/bi'
import {NavLink} from 'react-router-dom'
import './filter.scss'
function Filter() {
  return (
    <div className='list'>
      <NavLink to='/filter/desert'>
        <GiCakeSlice />
        <h4>Desert</h4>
      </NavLink>
      <NavLink to='/filter/salad'>
        <GiFruitBowl />
        <h4>Salad</h4>
      </NavLink>
      <NavLink to='/filter/vegetarian'>
        <RiPlantFill />
        <h4>Vegan</h4>
      </NavLink>
      <NavLink to='/filter/mainCourse'>
        <BiDish />
        <h4>Main</h4>
      </NavLink>
    </div>
  )
}

export default Filter
