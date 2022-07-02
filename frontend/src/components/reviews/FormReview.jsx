// import React, { useState, useEffect } from 'react'
// import styled from 'styled-components'
// import { useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import Spinner from '../Spinner'
// import { FaStar } from 'react-icons/fa'
// import { motion } from 'framer-motion'


// const colors = {
//   orange: '#FFBA5A',
//   grey: '#a9a9a9',
// }
// const FormReview = () => {
//   const stars = Array(5).fill(0)
//   const [reviewData, setReviewData] = useState({ review: '', rating: 0 })
//   const [hoverValue, setHoverValue] = useState(null)
//   const { review } = reviewData
//   const { id } = useParams()
//   const dispatch = useDispatch()
//   const onChange = (e) => {
//     setReviewData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }
//   const { isLoading, isError, message} = useSelector(
//     (state) => state.reviews
//   )

//   const handleHover = (value) => {
//     setReviewData((prev) => ({ ...prev, rating: value }))
//   }
//   const handleMouseOver = (value) => {
//     setHoverValue(value)
//   }
//   const handleMouseLeave = () => {
//     setHoverValue(null)
//   }
//   const onSubmit = (e) => {
//     e.preventDefault()
//     const data = { recipeId: id, reviewData }
//     // dispatch(createReview(data))
//     setReviewData({ review: '', rating: 1 })
//   }
//   useEffect(() => {
//     if (isError) {
      
//     }
//   }, [isError, message])

//   if (isLoading) {
//     return <Spinner />
//   }
//   return (
//     <Container>
//       <motion.h1 layout='position'>
//         Leave a Review
//       </motion.h1>
//         <motion.div>
//           <motion.div className='stars'>
//             {stars.map((_, index) => {
//               return (
//                 <FaStar
//                   key={index}
//                   size={30}
//                   style={{
//                     marginRight: 10,
//                     cursor: 'pointer',
//                   }}
//                   color={
//                     (hoverValue || reviewData.rating) > index
//                       ? colors.orange
//                       : colors.grey
//                   }
//                   onClick={() => handleHover(index + 1)}
//                   onMouseOver={() => handleMouseOver(index + 1)}
//                   onMouseLeave={() => handleMouseLeave()}
//                 />
//               )
//             })}
//           </motion.div>
//           <Form onSubmit={onSubmit}>
//             <textarea
//               id='review'
//               type='textarea'
//               name='review'
//               rows='3'
//               cols='25'
//               value={review}
//               onChange={onChange}
//             />
//             <button type='submit'>Click</button>
//           </Form>
//         </motion.div>
//     </Container>
//   )
// }

// const Container = styled(motion.div)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 100%;
//   justify-content: center;
//   textarea {
//     background-color: #eadede;
//     outline: none;
//     padding: 1rem;
//     font-size: 1.3rem;
//     border-radius: 1rem;
//     &:focus {
//       background: white;
//     }
//   }
//   h1 {
//     margin-bottom: 1rem;
//     color: #23d997;
//     span {
//       font-weight: lighter;
//       font-size: 1.4rem;
//       color: #aaa;
//       text-decoration: underline;
//       cursor: pointer;
//     }
//   }
//   .stars {
//     margin-bottom: 1rem;
//     text-align: center;
//   }
// `

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   button {
//     font-weight: lighter;
//     margin-top: 1rem;
//     font-size: 1rem;
//     cursor: pointer;
//     width: 5rem;
//     padding: 0.7rem 1.2rem;
//     border: 1px solid #23d997;
//     border-radius: 10px;
//     background: transparent;
//     color: white;
//     transition: all 0.2s ease;
//     &:hover {
//       background-color: #23d997;
//     }
//   }
// `
// export default FormReview
