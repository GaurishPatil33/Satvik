"use client"
import ExploreOils from '@/src/components/landing_page/ExploreOils'
import ShopByConcern from '@/src/components/landing_page/ShopByConcern'
import Reviews from '@/src/components/landing_page/Reviews'
import AllProducts from '@/src/components/landing_page/AllProducts'
import HeroSection from '@/src/components/landing_page/HeroSection'
import MarqueeBanner from '@/src/components/landing_page/MarqueeBanner'
import MostLoved from '@/src/components/landing_page/MostLoved'
import TrustBanner from '@/src/components/landing_page/TrustBanner'
import VideoSection from '@/src/components/landing_page/VideoSection'
import WhySatvik from '@/src/components/landing_page/WhySatvik'
import CategoryRow from '../../components/landing_page/CategoryRow'
import { useAdminUsers } from '@/src/hooks/useAdminUsers'
import { useUser } from '@/src/hooks/useUser'
import MobilUser from '@/src/components/login&register/MobilUser'
import { getAllUsers } from '@/src/services/user.services'
import { useEffect, useState } from 'react'
import { IUser } from '@/src/types/user-types'

export default function Home() {
  const [users, setusers] = useState<IUser[]|null>()
  // useEffect(() => {
  //   const fetch = async () => await getAllUsers()
  //   if (fetch) {
  //     // setusers(fetch)
  //   }
  //   fetch()
  // }, [])


  return (
    <main className="min-h-screen bg-cream">
      <HeroSection />
      <CategoryRow />
      <TrustBanner />

      <MarqueeBanner />

      <MostLoved />
      <VideoSection />
      <AllProducts />
      <WhySatvik />
      <ExploreOils />
      <ShopByConcern />



      <Reviews />

    </main>
  )
}

