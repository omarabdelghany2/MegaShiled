import { ReactNode, useState } from "react"
import bigCar from "/bigCar.png"
import mediumCar from "/mediumCar.png"
import smallCar from "/smallCar.png"
import {
  AdditionalServices,
  Packages,
  PersonalInfo,
} from "@/components"
import { useGetAllMainServicesQuery } from "@/app/api/ServicesApiSlice"


const Services = () => {
  const [active, setActive] = useState<0 | 1 | 2>(0)
  const [className, setClassName] = useState("opacity-1")
  const [packages, setPackages] = useState<{ title: string; price: number }[]>([])

  const { data: mainServicesData } = useGetAllMainServicesQuery("")
  const [selectedService, setSelectedService] = useState("")

  return (
    <section className="text-center py-20 bg-neutral-950">
      <div className="text-center bg-room bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/20 z-[-1]" />
        <div className="text-center flex flex-col z-40 bg-gradient-to-r from-cyan-500 to-blue-500">
          <Heading content="الخطوة الاولي" />
          <span className="font-arabic text-xl text-white font-bold">
            اختر حجم سيارتك
          </span>
          <div className="flex items-center gap-3 font-bold text-center  justify-center my-5 mx-5">
            <SelectCard
              img={smallCar}
              setActive={setActive}
              id={0}
              active={active === 0}
              setClassName={setClassName}
            >
              صغير
            </SelectCard>
            <SelectCard
              img={mediumCar}
              setActive={setActive}
              id={1}
              active={active === 1}
              setClassName={setClassName}
            >
              وسط
            </SelectCard>
            <SelectCard
              img={bigCar}
              setActive={setActive}
              id={2}
              active={active === 2}
              setClassName={setClassName}
            >
              كبير
            </SelectCard>
          </div>
        </div>
        <div className="w-[50vw]  aspect-auto mx-auto">
          <img
            src={
              active === 0
                ? smallCar
                : active === 1
                ? mediumCar
                : bigCar
            }
            alt={`car-size-${active}`}
            className={`${className} transition-all duration-300`}
          />
        </div>
      </div>
      <div className="container p-5">
        <Packages
          packages={packages}
          setPackages={setPackages}
          carSize={active}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          mainServicesData={mainServicesData}
        />
        <AdditionalServices
          carSize={active}
          packages={packages}
          setPackages={setPackages}
        />
        <PersonalInfo
          setPackages={setPackages}
          packages={packages}
          carSize={active}
        />
      </div>
    </section>
  )
}
export default Services

const Heading = ({ content }: { content: string }) => {
  return (
    <h1 className="text-2xl font-semibold font-arabic text-primary w-fit mx-auto py-5">
      {content}
    </h1>
  )
}

type SelectCardProps = {
  children: ReactNode
  active?: boolean
  id: 0 | 1 | 2
  setActive: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
  setClassName: React.Dispatch<React.SetStateAction<string>>
  img: string
}

const SelectCard = ({
  children,
  active = false,
  setActive,
  setClassName,
  id,
  img,
}: SelectCardProps) => {
  return (
    <button
      type="button"
      className={`font-arabic text-white text-lg border-solid bg-white border-[5px] shadow-xl ${
        active ? "border-primary" : "border-transparent"
      } hover:text-primary px-5 py-3 rounded-md transition-colors duration-200
      `}
      onClick={() => {
        setClassName("opacity-0 translate-y-[15px]")
        setTimeout(() => {
          setClassName("opacity-1 translate-y-0")
          setActive(id)
        }, 600)
      }}
    >
      <h1 className="w-fit mx-auto text-2xl text-black text-primary">
        {children}
      </h1>
      <img
        src={img}
        alt="car-size"
        className="block my-5 w-[200px]"
      />
    </button>
  )
}
