import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

const Locations = () => {
  return (
    <section className="cut-viewport overflow-hidden bg-map bg-cover bg-center flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <motion.div className="block m-auto  w-full cut-viewport relative" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className=" flex flex-col absolute z-[60] items-center justify-center gap-5">
        <div className=" text-3xl font-arabic text-primary font-bold">
          موقعنا
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
          className="overflow-hidden hover:scale-125  transition-transform duration-200"
        >
          <a href="https://www.google.com/maps/place/Mega+shield/@31.2334896,29.9594562,17z/data=!3m1!4b1!4m6!3m5!1s0x14f5c514e95ed835:0x4b90810d59faca2d!8m2!3d31.2334896!4d29.9594562!16s%2Fg%2F11vqrlqxw1?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D">
            <MapPin color="#d80032" size={70} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
export default Locations
