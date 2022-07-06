import './chefe.scss'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { Link } from 'react-router-dom'
function Chefes({ chefes }) {
  return (
    chefes && (
      <div className='wrapper'>
        <h1>CHOOSE CHEF</h1>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '1rem',
          }}
        >
          {chefes.map((chef) => (
            <SplideSlide key={chef._id}>
              <Link to={`/chefe/${chef._id}`}>
                <div className='chef-card'>
                  <p>
                    Chef <br />
                    {chef.name}
                  </p>
                  <img src={chef.image} alt={chef.name} />
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

export default Chefes
