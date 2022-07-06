import './categories.scss'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { Link } from 'react-router-dom'

function Categories({ type }) {
  return (
    type && (
      <div className='wrapper'>
        <h1>{`${type[0].category.toUpperCase()}S RECIPES`}</h1>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
          }}
        >
          {type.map((recipe) => (
            <SplideSlide key={recipe._id}>
              <Link to={`/recipe/${recipe._id}`}>
                <div className='card'>
                  <p>{recipe.title}</p>

                  <img src={recipe.image} alt={recipe.title} />

                  <h3>Posted By: {recipe.author.name}</h3>
                  <div className='gradient'></div>
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    )
  )
}

export default Categories
