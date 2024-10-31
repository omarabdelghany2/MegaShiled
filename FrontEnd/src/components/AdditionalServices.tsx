import { useGetAllMainServicesQuery } from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"
import { For } from "@dev-amr/react-sugartax"
import { useEffect, useState } from "react"
import AdditionalServiceCard from "./AdditionalServiceCard"

type PackagesProps = {
  packages: { title: string; price: number }[]
  setPackages: React.Dispatch<
    React.SetStateAction<{ title: string; price: number }[]>
  >
  carSize: 0 | 1 | 2
  selectedService: string
  mainServicesData: {
    mainServices: MainService[]
    count: number
  } | undefined
}

const AdditionalServices = ({
  packages,
  setPackages,
  carSize,
  selectedService,
  mainServicesData
}: PackagesProps) => {
  const [additionalServices, setAdditionalServices] = useState<MainService[]>([])

  
  useEffect(() => {
    if (mainServicesData) {
      const filtered = mainServicesData.mainServices.filter(itm => itm.isAdditional  === true)
      setAdditionalServices(filtered)
    }
  }, [mainServicesData])

  // if (isLoading) return "loading...  "
  console.log(additionalServices.length);
  return (
    <section className="">
     {
      additionalServices.length < 0 ? (
        <>
           <h1 className="text-primary font-arabic font-bold text-2xl my-5">
              الخدمات الاضافية
            </h1>
            <div className="flex justify-center gap-4 flex-col">
              <For each={additionalServices}>
                {(item, i) => (
                  <AdditionalServiceCard
                  selectedService={selectedService}
                  carSize={carSize}
                  packages={packages}
                  setPackages={setPackages}
                  mainService={item}
                  key={i}
                  />
                )}
              </For>
            </div>
        </>
      ): null
     }
    </section>
  )
}
export default AdditionalServices
