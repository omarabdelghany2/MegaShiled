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
          <a href="tel: +201080001058">
            <Phone size={30} color="#d80032" />
          </a>
          <h1 className="text-xl text-right ltr">
            +2010 80001058
          </h1>
        </span>
        <span className="flex items-center gap-2 my-3">
          <a target="_blank" href="https://www.google.com/maps/place/Mega+shield/@31.2334896,29.9568813,17z/data=!3m1!4b1!4m6!3m5!1s0x14f5c514e95ed835:0x4b90810d59faca2d!8m2!3d31.2334896!4d29.9594562!16s%2Fg%2F11vqrlqxw1?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D">
            <MapPin size={30} color="#d80032" />
          </a>
          <p className="text-sm font-arabic font-semibold">
            {t('footer.address')}
          </p>
        </span>
        <span className="flex items-center gap-2">
          <a href="mailto:megashieldeg@gmail.com">
            <MailOpen size={30} color="#d80032" />
          </a>

          <p className="text-sm font-arabic font-semibold">
            megashieldeg@gmail.com
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
