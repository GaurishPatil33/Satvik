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

export default function Home() {
  const { users } = useAdminUsers()
  const { user } = useUser()
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

      <div className="">{users.map(u => (
        <div className="">{u.email}</div>
      ))}</div>

      <div className="">{user?.email}</div>
      <Reviews />
    </main>
  )
}

