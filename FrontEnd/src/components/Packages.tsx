import React, { useState } from "react"
import { ServicesSlider } from "."
import ServicePackageCard from "./ServicePackageCard"
import { useGetAllMainServicesQuery, useGetSubServicePackagesQuery } from "@/app/api/ServicesApiSlice"

type PackagesProps = {
  packages: { title: string; price: number }[]
  setPackages: React.Dispatch<
    React.SetStateAction<{ title: string; price: number }[]>
  >
  carSize: 0 | 1 | 2
}

const Packages = ({
  setPackages,
  packages,
  carSize,
}: PackagesProps) => {
  const [subServiceID, setSubServiceID] = useState("")

  const { data: subServicePackages } = useGetSubServicePackagesQuery({ id: subServiceID })
  const { data: mainServicesData } = useGetAllMainServicesQuery("")

  

  return (
    <div className="text-center">
      <ServicesSlider
        setSubServiceID={setSubServiceID}
        subServiceID={subServiceID}
      />

      <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
      {subServicePackages && subServicePackages.count > 0 &&
        subServicePackages.packages.map((packagely, i) => {
          // Use find to get the matching item from mainServices
          const matchingService = mainServicesData?.mainServices.find(
            (item) => item.name === packagely.belongTo && item.isAdditional == false
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
