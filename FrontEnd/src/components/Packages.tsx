import React, { useState } from "react"
import ServicePackageCard from "./ServicePackageCard"
import { useGetAllMainServicesQuery, useGetSubServicePackagesQuery } from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"

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

  

  return (
    <div className="text-center">
      {/* <ServicesSlider
        setSubServiceID={setSubServiceID}
        subServiceID={subServiceID}
      /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3 auto-cols-auto ">
        
        {
          mainServicesData?.mainServices.map((itm, idx) => {
            return (
              <div onClick={() => setSelectedService(itm.name)} className={` border border-primary font-bold text-2xl text-white p-2 hover:bg-primary cursor-pointer transition duration-500 ${selectedService === itm.name ? "bg-primary": "bg-transparent"}`}>{itm.name}</div>
            )
          })
        }
      </div>
      <div className="flex flex-wrap gap-8 items-center justify-center sm:justify-start p-5 ">
        {
        subServicePackages && subServicePackages.count > 0 && 
          subServicePackages.packages.map((packagely, i) => {
            // Use find to get the matching item from mainServices
            const matchingService = mainServicesData?.mainServices.find(
              (item) => item.name === packagely.belongTo && item.isAdditional == false && item.name === selectedService
            );
            
            // If matchingService is found, render the ServicePackageCard
            return matchingService ? (
              <ServicePackageCard
                key={i} // use i as a unique key here, although a unique id is better if available
                packages={packages}
                setPackages={setPackages}
                title={packagely.name}
                features={packagely.description}
                price={
                  carSize === 0
                    ? packagely.smallPrice
                    : carSize === 1
                    ? packagely.mediumPrice
                    : packagely.bigPrice
                }
              />
            ) : null; // return null if no matching service is found
          })
        }
      </div>
    </div>
  )
}
export default Packages
