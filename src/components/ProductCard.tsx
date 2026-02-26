import { Product } from '@/lib/types'
import React from 'react'

interface ProductCardProps{
    product:Product
}

const ProductCard:React.FC<ProductCardProps> = ({product}) => {

  return (
    <div>{product.title}</div>
  )
}

export default ProductCard