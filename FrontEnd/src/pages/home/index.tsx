import {
  Adds,
  Carousel,
} from "@/components"
import { Route, Routes } from "react-router-dom"
import Services from "./nested-pages/Services"

const Home = () => {
  return (
    <Routes>
      <Route index element={<Page />} />
      <Route path="/service" element={<Services />} />
    </Routes>
  )
}

const Page = () => (
  <main>
    <Carousel />
    {/* <About /> */}
    {/* <Welcome /> */}
    <Adds />
    {/* <Locations /> */}
  </main>
)

export default Home
