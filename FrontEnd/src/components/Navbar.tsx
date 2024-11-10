import { MenuSheet, NavLink } from "@/components"

import logo from "/logo.png"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "@/i18n/i18n";

const Navbar = () => {
  const { t } = useTranslation();


  return (
    <>
      <nav className={`sm:flex hidden items-center justify-center gap-6 ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"} `}>
        <div className="h-14 grid place-content-center">
          <NavLink to="/" className={`${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>{t('header.home')}</NavLink>
        </div>

        <div className="h-14 grid place-content-center">
          <NavLink
            to="/insurance"
            className={`relative text-slate-200 transition-colors duration-500 font-bold text-lg hover:text-primary before:content-[''] before:absolute before:w-full before:h-1 before:bg-primary before:-bottom-2 before:duration-500 before:transition-transform before:scale-y-0 hover:before:scale-y-100 before:origin-top ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`} >
            {t('header.insurance')}
          </NavLink>
        </div>

        <div className="h-14 grid place-content-center">
          <NavLink to="/who" className={`${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>{t('header.about')}</NavLink>
        </div>

        <Link to={"/"}>
          <motion.div
            initial={{ y: "-220%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="w-[120px] sm:block hidden"
          >
            <img src={logo} alt="logo" />
          </motion.div>
        </Link>

        <div className="h-14 grid place-content-center">
          <NavLink to="/contact" className={`${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>{t('header.contact')}</NavLink>
        </div>

        <div className="h-14 grid place-content-center">
          <NavLink to="/shopping" className={`${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>{t('header.shopping')}</NavLink>
        </div>

        <div className="h-14 grid place-content-center">
          <NavLink to="/service" className={`${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`} children={t('header.reserve')} />
        </div>
      </nav>
        <div className="flex">
          {/* <button onClick={() => changeLanguage('ar')}>Arabic</button> */}
          <img src={`${t('locale.lang') === "ar" ? "/arabic-flag.png": "/english-flag.png"}`} onClick={() => changeLanguage(t('locale.lang') === "ar" ? "en": "ar")} alt="arabic flag" className="w-5" />
        </div>
      <MenuSheet />
      {/* <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>Arabic</button> */}
    </>
  )
}

export default Navbar
