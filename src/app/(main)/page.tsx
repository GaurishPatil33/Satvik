import ExploreOils from '@/src/components/landing_page/ExploreOils'
import ShopByConcern from '@/src/components/landing_page/ShopByConcern'
import Reviews from '@/src/components/landing_page/Reviews'
import Footer from '@/src/components/Footer'
import AllProducts from '@/src/components/landing_page/AllProducts'
import CategoryNav from '@/src/components/landing_page/CategoryNav'
import HeroSection from '@/src/components/landing_page/HeroSection'
import MarqueeBanner from '@/src/components/landing_page/MarqueeBanner'
import MostLoved from '@/src/components/landing_page/MostLoved'
import TrustBanner from '@/src/components/landing_page/TrustBanner'
import VideoSection from '@/src/components/landing_page/VideoSection'
import WhySatvik from '@/src/components/landing_page/WhySatvik'
import TrustBadges from '../../components/landing_page/TrustBadges'
import WhyChoose from '../../components/landing_page/WhyChoose'
import WhyChooseSatvik from '../../components/landing_page/WhyChooseSatvik'
import HeroBanner from '../../components/landing_page/HeroBanner'
import CategoryRow from '../../components/landing_page/CategoryRow'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      
      <HeroSection />
      {/* <CategoryNav /> */}
      <CategoryRow/>
      {/* <TrustBadges/> */}
      <TrustBanner />
      <MarqueeBanner />
    
      <MostLoved />
      <VideoSection />
      <AllProducts />
      <WhySatvik />
      {/* <WhyChoose/> */}
      {/* <WhyChooseSatvik/> */}
      <ExploreOils />
      <ShopByConcern />
    </main>
  )
}
