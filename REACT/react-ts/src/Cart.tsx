import React from 'react'


interface CardProps{
  title :string,
  description:string,
  isPublished:boolean
}
const Cart :React.FC<CardProps> = ( {title  ,description, isPublished}) => {
  return (
    <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
    </div>
  )
}

export default Cart