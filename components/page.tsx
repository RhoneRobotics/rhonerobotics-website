import Hero from '@/components/Hero'
import { InfiniteMarquee } from '@/components/InfiniteMarquee'
import { Services } from '@/components/Services'
import { OurProcesses } from '@/components/OurProcesses'
import { Team } from '@/components/Team'
import CaseStudies from '@/components/CaseStudies'
import Contact from '@/components/Contact'
const Home = () => {
  return (
    <div className='min-h-screen w-full '>
      <Hero />
      <InfiniteMarquee />
      <Services />
      <OurProcesses />
      <Team />
      <CaseStudies />
      <Contact />
    </div>
  )
}

export default Home