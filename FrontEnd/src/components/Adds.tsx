import { SearchCheck } from "lucide-react"
import mobileCar from "/reservation-mobile.png"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Adds = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();



  return (
    <section
      id="adds"
      className="cut-viewport md:flex-row flex-col flex overflow-x-hidden"
    >
      <motion.div
        initial={{ translateX: "100%" }}
        whileInView={{
          translateX: 0,
          transition: { delay: 1, duration: 2 },
        }}
        viewport={{ once: true }}
        className="flex-1 flex justify-center items-center bg-wheel bg-cover bg-no-repeat bg-blend-overlay
      relative"
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="z-10 text-center">
          <h1 className={`text-white sm:text-5xl text-4xl mb-4 font-bold ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
            {t('sectionRight.shopping')}
          </h1>

          <ul
            className="flex flex-col justify-center items-start gap-4 list-none
          mb-6"
          >
            <li className="flex items-center gap-2">
              <SearchCheck color="#d80032" />
              <span className={`text-xl font-bold ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
                {t('sectionRight.titleone')}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <SearchCheck color="#d80032" />
              <span className={`text-xl font-bold ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
              {t('sectionRight.titletwo')}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <SearchCheck color="#d80032" />
              <span className={`text-xl font-bold ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
              {t('sectionRight.titlethree')}
              </span>
            </li>
          </ul>
          <Link to={"/shopping"}>
            <button
              className={`flex items-center justify-center text-3xl font-bold h-20 w-[220px] bg-primary hover:scale-90 mx-auto my-5 border-4 border-solid border-transparent transition-colors ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
            >
              {t('sectionRight.button')}
            </button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ translateX: "-100%" }}
        whileInView={{
          translateX: 0,
          transition: { delay: 1, duration: 2 },
        }}
        viewport={{ once: true }}
        className="flex-1 flex justify-center items-center bg-shopping bg-cover bg-no-repeat bg-blend-overlay relative"
      >
        <div className="z-10 text-center flex flex-col">
          <div className="absolute inset-0 bg-black/25" />
          <h1 className={`text-white sm:text-5xl text-4xl z-50 font-bold mb-4 ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
          {t('sectionLeft.book')}
          </h1>

          <img
            src={mobileCar}
            alt="reserve"
            className="block mx-auto z-50 h-40"
          />

          <button
            className={`flex items-center justify-center z-50 text-3xl font-bold font-arabic h-20 w-[220px] bg-black mx-auto my-5
          border-4 border-solid border-transparent
          transition-colors hover:scale-90 ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
            onClick={() => navigate("/service")}
          >
            {t('sectionLeft.button')}
          </button>
        </div>
      </motion.div>
    </section>
  )
}
export default Adds
