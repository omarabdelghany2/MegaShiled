import { MailOpen, MapPin, Phone } from "lucide-react"
import { NavLink } from "."
import logo from "/logo.png"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleMenu } from "@/app/features/MenuSlice";

const Footer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()

  return (
    <footer className="pb-20 pt-5 relative w-full bg-carbon z-50 bottom-0">
      <div className="sm:px-8 px-4 text-center flex justify-center items-center">
        <div className="text-center px-4 flex gap-4 flex-col items-center w-[250px]">
          <img
            src={logo}
            alt="logo"
            className="max-w-full"
          />
        </div>
      </div>
      <div className="sm:px-8 sm:grid-cols-3 container px-4 border-solid border-primary grid grid-cols-1  sm:gap-8 gap-3 flex-wrap max-sm:mb-10">
        <span className="flex items-center sm:justify-center justify-start  gap-5 my-3">
          <a className="bg-primary p-3 rounded-full">
            <Phone size={30} color="#fff" />
          </a>
          <h1 className={`text-md text-right flex flex-col ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>
            <a href="tel:201080001059">201080001059 - {t("footer.short1")} </a>
            <a href="tel:201080001058">201080001058 - {t("footer.short2")}</a>
            <a href="tel:201080001052">201080001052 - {t("footer.short3")}</a>
            <a href="tel:201080001057">201080001057 - {t("footer.short4")}</a>
          </h1>
        </span>
        <span className="flex sm:justify-center justify-start  items-center gap-5 my-3">
          <a className="bg-primary p-3 rounded-full">
            <MapPin size={30} color="#ffff" />
          </a>
          <p className={`text-md flex flex-col gap-2 justify-start text-end gap-2 font-semibold ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>
            <a target="_blank" href="https://maps.app.goo.gl/F57gKBMC72W4FzxMA">{t('footer.address3')}</a>
            <a target="_blank" href="https://maps.app.goo.gl/RG1hD1E2qAdJhrM26">{t('footer.address1')}</a>
            <a target="_blank" href="https://maps.app.goo.gl/2kouaYR9dMB1QKKA8" >{t('footer.address2')}</a>
            <a target="_blank" href="https://maps.app.goo.gl/u3kv153izMienHpk8">{t('footer.address4')}</a>
          </p>
        </span>
        <span className="flex justify-start items-center gap-5">
          <a className="bg-primary p-3 rounded-full" href="mailto:info@megashieldeg.com">
            <MailOpen size={30} color="#fff" />
          </a>

          <p className={`text-md flex flex-col sm:justify-center justify-start text-end gap-2 font-semibold ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>
            <a>info@megashieldeg.com</a>
            <a>sales@megashieldeg.com</a>
            <a>hr@megashieldeg.com</a>

          </p>
        </span>
      </div>
      <div className="text-center px-4 flex gap-4 justify-center border-t border-solid border-primary py-4 mt-20 items-center sm:mb-0 mb-5 absolute w-full bottom-0 flex-wrap">
        <Link  to="/" onClick={() => dispatch(toggleMenu())} className="text-xl">
          {t('header.home')}
        </Link>
        <Link to="/insurance" onClick={() => dispatch(toggleMenu())} className="text-xl">
          {t('header.insurance')}
        </Link>
        <Link  to="/who" onClick={() => dispatch(toggleMenu())} className="text-xl">
          {t('header.about')}
        </Link>
        <Link  to="/contact" onClick={() => dispatch(toggleMenu())} className="text-xl">
          {t('header.contact')}
        </Link>
        <Link  to="/service" onClick={() => dispatch(toggleMenu())} className="text-xl">
          {t('header.reserve')}
        </Link>
        <Link  to="/shopping" onClick={() => dispatch(toggleMenu())} className="text-xl">
          {t('header.shopping')}
        </Link>
      </div>
    </footer>
  )
}
export default Footer
