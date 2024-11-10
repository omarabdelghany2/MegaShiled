import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Navbar } from "."
import logo from "/logo.png"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="h-20 bg-[#111214]/70 fixed inset-x-0 top-0 z-[10000000]">
      <div className="container mx-auto h-20 flex items-center sm:justify-center justify-end gap-2">
        <motion.div
          initial={{ y: "-100%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="w-[120px] sm:hidden block ml-auto"
        >
          <NavLink to={"/"}><img src={logo}  alt="logo" /></NavLink>
        </motion.div>
        <Navbar />
      </div>
    </header>
  )
}
export default Header
