import { MailOpen, MapPin, Phone } from "lucide-react"
import { NavLink } from "."
import logo from "/logo.png"
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="pb-20 pt-5 relative w-full bg-carbon z-50 bottom-0">
      <div className="sm:px-8 px-4 text-center flex justify-center items-center">
        <div className="text-center px-4 flex gap-4 flex-col items-center w-[200px]">
          <img
            src={logo}
            alt="logo"
            className="max-w-full"
          />
        </div>
      </div>
      <div className="sm:px-8 px-4 border-solid border-primary flex items-center justify-center sm:gap-8 gap-3 flex-wrap max-sm:mb-10">
        <span className="flex items-center gap-2 my-3">
          <Phone size={30} color="#d80032" />
          <h1 className="text-xl text-right ltr">
            +966 53 937 3016
          </h1>
        </span>
        <span className="flex items-center gap-2 my-3">
          <MapPin size={30} color="#d80032" />
          <p className="text-sm font-arabic font-semibold">
            {t('footer.address')}
          </p>
        </span>
        <span className="flex items-center gap-2">
          <MailOpen size={30} color="#d80032" />

          <p className="text-sm font-arabic font-semibold">
            info@megashield.com
          </p>
        </span>
      </div>
      <div className="text-center px-4 flex gap-4 justify-center border-t border-solid border-primary py-4 mt-20 items-center sm:mb-0 mb-5 absolute w-full bottom-0 flex-wrap">
        <NavLink to="/" className="text-sm">
          {t('header.home')}
        </NavLink>
        <NavLink to="/insurance" className="text-sm">
          {t('header.insurance')}
        </NavLink>
        <NavLink to="/who" className="text-sm">
          {t('header.about')}
        </NavLink>
        <NavLink to="/contact" className="text-sm">
          {t('header.contact')}
        </NavLink>
        <NavLink to="/service" className="text-sm">
          {t('header.reserve')}
        </NavLink>
        <NavLink to="/shopping" className="text-sm">
          {t('header.shopping')}
        </NavLink>
      </div>
    </footer>
  )
}
export default Footer
