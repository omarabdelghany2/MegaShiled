import React, { useState } from "react"
import ServicePackageCard from "./ServicePackageCard"
import {  useGetSubServicePackagesQuery } from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"
import { useTranslation } from "react-i18next"

type PackagesProps = {
  carSize: 0 | 1 | 2
  selectedService: string
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  mainServicesData: {
    mainServices: MainService[]
    count: number
  } | undefined
}

const Packages = ({
  carSize,
  selectedService,
  setSelectedService,
  mainServicesData
}: PackagesProps) => {
  const [subServiceID, _] = useState("")
  const { data: subServicePackages } = useGetSubServicePackagesQuery({ id: subServiceID })
  const { t } = useTranslation();
  

  return (
    <div className="text-center mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-3 auto-cols-auto ">
      {
        mainServicesData?.mainServices.map((itm) => {
          if (itm.isAdditional === false) {
            return (
              <div
                key={itm.id}
                onClick={() => setSelectedService(itm.id)}
                className={`${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"} border border-primary font-bold text-2xl text-white p-2 hover:bg-primary cursor-pointer transition duration-500 flex items-center justify-center gap-4 ${
                  selectedService === itm.id ? "bg-primary" : "bg-transparent"
                }`}
              >
                <div>{t('locale.lang') === "ar" ? itm.arabicName : itm.name}</div>
                <img className="w-14" src={ itm.name.toLowerCase() === "thermal tint" ? "./thermaltint.svg": itm.name.toLowerCase() === "paint protection film" ? "./protectionfilm.svg": itm.name.toLowerCase() === "polishing" ? "./polishing.svg" : itm.name.toLowerCase() === "nano ceramic" ? "./nanoceramic.svg" : ""} alt="" />
              </div>
            );
          } else {
            return null;
          }
        })
      }
      </div>
      <div className="flex flex-wrap gap-8 items-center justify-center sm:justify-start p-8  ">
        {
        subServicePackages && subServicePackages.count > 0 && 
          subServicePackages.packages.map((packagely, _) => {
            const matchingService = mainServicesData?.mainServices.find(
              (item) => item.name === packagely.belongTo && item.isAdditional == false && item.id === selectedService
            );
            
            return matchingService ? (
              <ServicePackageCard
                key={packagely._id} 
                id={packagely._id}
                title={t('locale.lang') === "ar" ? packagely.arabicName : packagely.name}
                features={t('locale.lang') === "ar" ? packagely.arabicDescription : packagely.description}
                price={ carSize === 0 ? (packagely.smallPrice || 0)  : carSize === 1 ? (packagely.mediumPrice || 0) : (packagely.bigPrice || 0) }
              />
            ) : null;
          })
        }
      </div>
    </div>
  )
}
export default Packages
