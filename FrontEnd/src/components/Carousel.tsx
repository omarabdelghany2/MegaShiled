import { motion } from "framer-motion"

import { CarIcon, Fingerprint   } from "lucide-react"
import { useTranslation } from "react-i18next";

const Carousel = () => {
  const { t } = useTranslation();


  return (
    <div className="overflow-hidden">
      <motion.div
        className="relative h-[100vh] bg-carCabin bg-cover bg-no-repeat bg-center flex flex-col items-center font-arabic justify-center"
        initial={{ scale: 1.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="z-10 bg-white rounded-full p-3 mb-2">
          <CarIcon  
            size={55}
            color="#d80032"
            className="z-10"
          />
        </div>
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + 0.1 }}
          className="text-2xl mb-2 text-primary z-10 font-semibold"
        >
          {t('home.icon')}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + 0.3 }}
          className="z-10 text-5xl font-bold text-center mb-2 text-white leading-[70px]"
          dangerouslySetInnerHTML={{ __html: t('home.title') }}
        >
         
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + 0.5 }}
          className="w-[100px] h-1 bg-primary z-10 my-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + 0.7 }}
          className="max-w-[220px] text-lg z-10 text-white text-center"
        >
         {t('home.description')}
        </motion.p>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-14 cursor-pointer flex flex-col justify-center items-center gap-4">
          <a href={"#welcome"}>
            <svg
              width="40"
              height="15"
              viewBox="0 0 40 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow"
            >
              <path
                d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
                fill="#fff"
              ></path>
            </svg>
            <svg
              width="40"
              height="15"
              viewBox="0 0 40 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow"
            >
              <path
                style={{ animationDelay: "0.5s" }}
                d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
                fill="#fff"
              ></path>
            </svg>
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default Carousel
