import React, { useState } from "react"
import ServicePackageCard from "./ServicePackageCard"
import { useGetAllMainServicesQuery, useGetSubServicePackagesQuery } from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"
import { useTranslation } from "react-i18next"

type PackagesProps = {
  packages: { title: string; price: number }[]
  setPackages: React.Dispatch<
    React.SetStateAction<{ title: string; price: number }[]>
  >
  carSize: 0 | 1 | 2
  selectedService: string
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  mainServicesData: {
    mainServices: MainService[]
    count: number
  } | undefined
}

const Packages = ({
  setPackages,
  packages,
  carSize,
  selectedService,
  setSelectedService,
  mainServicesData
}: PackagesProps) => {
  const [subServiceID, setSubServiceID] = useState("")
  const { data: subServicePackages } = useGetSubServicePackagesQuery({ id: subServiceID })
  const { t } = useTranslation();
  

  return (
    <div className="text-center mt-14">
      {/* <ServicesSlider
        setSubServiceID={setSubServiceID}
        subServiceID={subServiceID}
      /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3 auto-cols-auto ">
      {
        mainServicesData?.mainServices.map((itm) => {
          if (itm.isAdditional === false) {
            return (
              <div
                key={itm.id}
                onClick={() => setSelectedService(itm.id)}
                className={`border border-primary font-bold text-2xl text-white p-2 hover:bg-primary cursor-pointer transition duration-500 ${
                  selectedService === itm.id ? "bg-primary" : "bg-transparent"
                }`}
              >
                {t('locale.lang') === "ar" ? itm.arabicName : itm.name}
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
          subServicePackages.packages.map((packagely, i) => {
            // Use find to get the matching item from mainServices
            const matchingService = mainServicesData?.mainServices.find(
              (item) => item.name === packagely.belongTo && item.isAdditional == false && item.id === selectedService
            );
            return matchingService ? (
              <ServicePackageCard
                key={i} 
                packages={packages}
                setPackages={setPackages}
                title={t('locale.lang') === "ar" ? packagely.arabicName : packagely.name}
                features={t('locale.lang') === "ar" ? packagely.arabicDescription : packagely.description}
                price={
                  carSize === 0
                    ? packagely.smallPrice
                    : carSize === 1
                    ? packagely.mediumPrice
                    : packagely.bigPrice
                }
              />
            ) : null;
          })
        }
      </div>
    </div>
  )
}
export default Packages
