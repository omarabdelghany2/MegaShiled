import {
  Instagram,
  Link,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import illustration from "/contact.png"
import { useRef } from "react"
import { toast } from "react-toastify"

const Contact = () => {
  return (
    <div className="min-h-screen mt-20 p-5">
      <section className="sm:h-[50vh] bg-[#090200] -m-5 flex">
        <div className="flex-1 p-5 text-white max-sm:text-center">
          <h1 className="sm:text-5xl text-3xl font-arabic text-primary">
            تواصل معنا.
          </h1>
          <p className="sm:text-lg text-base font-arabic my-5 text-primary">
            نسعي لاجابة كل اسئلة و استفسارات عملائنا من خلال
            وسائل التواصل الخاصة بنا.
          </p>
        </div>
        <div className="flex-1 flex items-end justify-center max-md:hidden">
          <img
            src={illustration}
            alt="illustration"
            className="sm:w-[400px] mb-5"
          />
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
  const locationRef = useRef<HTMLSpanElement>(null)
  return (
    <div className="shadow-box rounded-md bg-black relative z-20">
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
          megashieldeg@gmail.com
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
          onClick={() => {
            if (emailRef.current) {
              navigator.clipboard.writeText(
                emailRef.current?.innerText
              )
              toast(
                "تم نسخ البريد الالكتروني الي الحافظة",
                {
                  type: "success",
                }
              )
            }
          }}
        >
          <Link
            size={35}
            className="text-primary"
            color="#d80032"
          />
        </span>
      </div>
      <div className="flex items-center py-5 px-3  border-b border-solid border-primary-gray text-white">
        <Phone
          size={35}
          className="text-primary"
          color="#d80032"
        />
        <span
          ref={phoneRef}
          className="flex-1  text-lg mx-4 font-bold text-white"
        >
          <bdo dir="ltr">+201080001058</bdo>
        </span>
        <span
          className="hover:scale-110 cursor-pointer"
          onClick={() => {
            if (phoneRef.current) {
              navigator.clipboard.writeText(
                phoneRef.current?.innerText
              )
              toast("تم نسخ الهاتف ف الحافظة", {
                type: "success",
              })
            }
          }}
        >
          <Link
            size={35}
            className="text-primary"
            color="#d80032"
          />
        </span>
      </div>
      <div className="flex items-center py-5 px-3 text-white border-b border-solid border-primary-gray">
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
          onClick={() => {
            if (phoneRef.current) {
              navigator.clipboard.writeText(
                "https://instagram.com/megashieldd?igshid=MzMyNGUyNmU2YQ=="
              )
              open(
                "https://instagram.com/megashieldd?igshid=MzMyNGUyNmU2YQ==",
                "_blank"
              )
            }
          }}
        >
          <Link
            size={35}
            className="text-primary"
            color="#d80032"
          />
        </span>
      </div>
      <div className="flex items-center py-5 px-3 text-white">
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
                "https://www.google.com/maps?q=Mega+shield%D8%8C+28+El-Fath,+Fleming,+El+Raml+1,+Alexandria+Governorate+00203&ftid=0x14f5c514e95ed835:0x4b90810d59faca2d&entry=gps&lucs=,94224825,94227247,94227248,47071704,47069508,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTM4LjIuOTAyNDAYACDXggMqWiw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICRUc%3D&g_st=com.google.maps.preview.copy"
              )
              open(
                "https://www.google.com/maps?q=Mega+shield%D8%8C+28+El-Fath,+Fleming,+El+Raml+1,+Alexandria+Governorate+00203&ftid=0x14f5c514e95ed835:0x4b90810d59faca2d&entry=gps&lucs=,94224825,94227247,94227248,47071704,47069508,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTM4LjIuOTAyNDAYACDXggMqWiw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICRUc%3D&g_st=com.google.maps.preview.copy",
                "_blank"
              )
            }
          }}
        >
          <Link
            size={35}
            className="text-primary"
            color="#d80032"
          />
        </span>
      </div>
    </div>
  )
}
