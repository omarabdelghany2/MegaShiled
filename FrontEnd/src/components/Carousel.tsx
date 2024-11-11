import { API } from "@/utils/server";
import { motion } from "framer-motion"

import { CarIcon } from "lucide-react"
import { useTranslation } from "react-i18next";

const Carousel = () => {
  const { t } = useTranslation();

  //bg-carCabin bg-cover bg-no-repeat bg-center backdrop-blur-sm
  return (
    <div className="overflow-hidden">

      <motion.div
        className="relative h-[100vh]  flex flex-col items-center fontn-arabic justify-center"
        initial={{ scale: 1.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <video src={`${API.media}video/vid.webm`} className="absolute w-full object-cover bg-red-500 h-[100vh] z-8" autoPlay muted loop playsInline></video>
        <div className="absolute z-9 inset-0 bg-black/20 " />
        <div className="z-10 bg-white/20 rounded-full p-3 mb-2">
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
          className={`text-2xl mb-2 text-primary z-10 font-semibold ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
        >
          {t('home.icon')}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + 0.3 }}
          className={`z-10 text-6xl ${ t("locale.lang") === "en" ? "tracking-wider text-7xl font-bold font-landing": "font-arabic" } text-center mb-2 text-white leading-[70px]`}
          dangerouslySetInnerHTML={{ __html: t('home.title') }}
        >
         
        </motion.h1>
        {/* <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + 0.5 }}
          className="w-[100px] h-1 bg-primary z-10 my-6"
        /> */}

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + 0.7 }}
          className={`max-w-[450px] font-bold text-2xl z-10 text-white text-center ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
        >
         {t('home.description')}
        </motion.p>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-14 cursor-pointer flex flex-col justify-center items-center gap-4">
          <a href={"#adds"}>
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
