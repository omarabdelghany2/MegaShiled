import {
  Facebook,
  Instagram,
  Mail,
} from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { FaTiktok } from "react-icons/fa";


const Contact = () => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen container mt-20 p-5 flex flex-col items-center justify-center">
      <section className="-m-5">
        <div className="flex-1 p-5 text-white text-center">
        {/* <div className="flex-1 flex items-end justify-center max-md:hidden">
          <img
            src={illustration}
            alt="illustration"
            className="sm:w-[400px] mb-5"
          />
        </div> */}
          <h1 className={`sm:text-5xl text-3xl text-primary ${t("locale.lang") === "ar" ? "font-arabic": "font-landling"} `}>
            { t("contact.title") }
          </h1>
          <p className={`sm:text-lg text-base my-5 text-primary ${t("locale.lang") === "ar" ? "font-arabic": "font-landling"} `}>
            { t("contact.description") }
          </p>
        </div>
      </section>
      <ContactTable />
    </div>
  )
}
export default Contact

const ContactTable = () => {
  const emailRef = useRef<HTMLSpanElement>(null)
  const phoneRef = useRef<HTMLSpanElement>(null)
  return (
    <div className=" w-full bg-[#111214] relative z-20">
      <div className="flex items-center py-5 px-3 border-b border-solid border-primary-gray text-white">
        <Mail
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={emailRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          info@megashieldeg.com
        </span>
        <a
          href="mailto:info@megashieldeg.com"
          className="hover:scale-110 cursor-pointer"
        >
          {/* <Link
            size={35}
            className="text-primary"
            color="#d80032"
          /> */}
        </a>
      </div>
      
      <a target="_blank" href="https://www.instagram.com/megashieldd/" className="flex items-center py-5 px-3 text-white border-b border-solid border-primary-gray">
        <Instagram
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={phoneRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          Instagram
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
        >
          {/* <Link
            size={35}
            className="text-primary"
            color="#d80032"
          /> */}
        </span>
      </a>
      <a target="_blank" href="https://www.facebook.com/MegashEg?mibextid=LQQJ4d" className="flex items-center py-5 px-3 text-white border-b border-solid border-primary-gray">
        <Facebook
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={phoneRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          Facebook
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
        >
          {/* <Link
            size={35}
            className="text-primary"
            color="#d80032"
          /> */}
        </span>
      </a>
      <a target="_blank" href="https://www.tiktok.com/@mega.shield.egypt" className="flex items-center py-5 px-3 text-white border-b border-solid border-primary-gray">
        <FaTiktok
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={phoneRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          TikTok
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
        >
          {/* <Link
            size={35}
            className="text-primary"
            color="#d80032"
          /> */}
        </span>
      </a>
      {/* <div className="flex items-center py-5 px-3 text-white">
        <MapPin
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={locationRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          Location
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
          onClick={() => {
            if (phoneRef.current) {
              navigator.clipboard.writeText(
                "https://www.google.com/maps/place/Mega+shield/@31.2334896,29.9568813,17z/data=!3m1!4b1!4m6!3m5!1s0x14f5c514e95ed835:0x4b90810d59faca2d!8m2!3d31.2334896!4d29.9594562!16s%2Fg%2F11vqrlqxw1?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
              )
              open(
                "https://www.google.com/maps/place/Mega+shield/@31.2334896,29.9568813,17z/data=!3m1!4b1!4m6!3m5!1s0x14f5c514e95ed835:0x4b90810d59faca2d!8m2!3d31.2334896!4d29.9594562!16s%2Fg%2F11vqrlqxw1?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
                "_blank"
              )
            }
          }}
        >
          // <Link
          //   size={35}
          //   className="text-primary"
          //   color="#d80032"
          // />
        </span>
      </div> */}
    </div>
  )
}
