import React, { useState } from 'react'
import styled from 'styled-components'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
}

const Review = ({ review }) => {
  const { user } = useSelector((state) => state.auth)
  const stars = Array(5).fill(0)
  const rating = stars.map((rate, index) => (
    <FaStar
      key={index}
      color={review.rating > index ? colors.orange : colors.grey}
    />
  ))
  return (
    <Container>
      <h4 className='reviewer'>
        {' '}
        <span>
          Reviewed By: <br></br>
        </span>
        {review.author.username}
      </h4>
      <h4 className='stars'>{rating}</h4>
      <h4 className='review'>{review.review}</h4>
      {user && user._id === review.author._id ? (
        <Links>
          <Link className='left' to='/contacts'>
            Update
          </Link>
          <Link to='/contacts'>Delete</Link>
        </Links>
      ) : null}
    </Container>
  )
}

const Container = styled(motion.div)`
  border: 1px solid #23d997;
  padding: 1rem 0;
  width: 250px;
  border-radius: 5px;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-right: 1rem;
  .reviewer {
    text-align: center;
    line-height: 1.7;
  }
  .review {
    text-align: center;
    line-height: 1.6;
    background-color: rgba(169, 169, 169, .4);
    padding: 1rem;
    margin: 1rem 0;
    padding: 0 0.5rem;
    z-index: -10;
    width: 100%;
  }
  .stars {
    margin: 1rem 0;
  }
`
const Links = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: .1rem;
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;


  a {
    font-size: 0.8rem;
    transition: all 0.3s ease-out;
    padding: 0.5rem 1rem;
    &:hover {
      background-color: #23d997;
      transform: translateY(-3px) scale(1.1);
    }
  }
`
export default Review
