"use client"
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/src/lib/types'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/src/store/cart.store'
interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)
  const [selectedVariant, setselectedVariant] = useState(product.variants[0] ?? null)
  const price = Number(selectedVariant?.price ?? 0);
  const variantDiscount = Number(selectedVariant?.discount ?? 0);
  const couponDiscount = Number(product.coupons?.[0]?.discount ?? 0);
  const router = useRouter()
  const finalPrice =
    price - (price * variantDiscount) / 100;

  const finalCouponPrice = Math.round(finalPrice - (finalPrice * couponDiscount) / 100
  );

  const { addToCart } = useCartStore()

  const handleAdd = () => {
    if (!selectedVariant) return;

    setAdded(true);

    addToCart({
      productId: product.id,
      product,
      quantity:1,
      variant: {
        size: selectedVariant.size,
        price: finalCouponPrice,
        discount: 0,
      },
    });

    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-cream-dark/80 hover:border-forest/30 hover:shadow-xl hover:shadow-forest/10 relative">
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-body font-bold uppercase tracking-wide badge-pulse ${product.badge === 'Best Seller' ? 'bg-gold text-bark' :
          product.badge === 'Trending' ? 'bg-terra text-white' :
            'bg-forest text-white'
          }`}>
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={() => setWished(!wished)}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${wished ? 'bg-red-50 text-red-500' : 'bg-white/80 text-bark/40 hover:text-red-400'
          }`}
      >
        <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <div className="overflow-hidden bg-cream h-52 flex items-center justify-center" onClick={() => router.push(`/product/${product.id}`)}>
        <Image
          width={100}
          height={200}
          src={product.media[0].url}
          alt={product.media[0].public_id}
          className="product-img w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-body font-semibold text-bark text-sm leading-snug mb-0.5 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-xs font-body text-bark/50 mb-2">{product.brand}</p>

        {/* Key benefits */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.KeyBenefits.slice(0, 2).map((b) => (
            <span key={b} className="text-[10px] font-body bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
              {b}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={11} className={s <= Math.floor(Number(product.rating)) ? 'text-gold fill-gold' : 'text-bark/20'} fill={s <= Math.floor(Number(product.rating)) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-xs font-body font-medium text-bark">{product.rating}</span>
          <span className="text-xs font-body text-bark/40">({product.reviews.length})</span>
        </div>

        {/* product variants(sizes) */}
        <div className=" flex gap-2">
          {product.variants.map((p, i) => (
            <div className="mb-3" key={i}>
              <span className={`text-xs cursor-pointer font-body border border-bark/20 text-bark/60 px-3 py-1 rounded-full ${selectedVariant.size === p.size ? "bg-green-100" : ""}`} onClick={() => setselectedVariant(p)}>{p.size}</span>
            </div>
          ))
          }
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg  font-bold text-bark"  >
            ₹{finalPrice}
          </span>
          <span className="text-xs font-body text-bark/40 line-through">₹{price}</span>
          {Number(selectedVariant.discount) > 0 && (
            <span className="text-xs font-body font-semibold text-terra">{selectedVariant.discount}% off</span>
          )}
        </div>

        {product.coupons && (
          <p className="text-xs font-body text-forest font-medium mb-3 flex items-center gap-1">
            <Zap size={11} fill="currentColor" />
            Best price ₹{finalCouponPrice} with coupon
          </p>
        )}
        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center border-[1px] gap-2 py-2.5 rounded-xl text-sm font-body font-semibold transition-all duration-300 ${added
            ? 'bg-forest text-cream-100 border-forest-800 scale-95'
            : 'bg-cream text-bark border-cream-400 hover:bg-forest hover:scale-[1.02] hover:text-cream-50 '
            }`}
        >
          <ShoppingCart size={15} />
          {added ? 'Added! ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
