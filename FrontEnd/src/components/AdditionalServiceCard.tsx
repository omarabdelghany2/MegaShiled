import {
  useGetSubServicePackagesQuery,
  useGetSubServicesQuery,
} from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"
import AdditionalServicePackageCard from "./AdditionalServicePackageCard"
import { For } from "@dev-amr/react-sugartax"

const AdditionalServiceCard = ({
  mainService,
  packages,
  setPackages,
  carSize,
  selectedService
}: {
  mainService: MainService
  packages: { title: string; price: number }[]
  setPackages: React.Dispatch<
    React.SetStateAction<{ title: string; price: number }[]>
  >
  carSize: 0 | 1 | 2
  selectedService: string
}) => {
  const { data: subservices } = useGetSubServicesQuery({
    id: mainService.id,
  })
  const { data: servicePackages } = useGetSubServicePackagesQuery({ id: subservices?.services[0]?._id || ""})

  return (
    <div
      className="flex-1 bg-cover bg-center bg-no-repeat  p-5  border border-solid border-transparent"
      // style={{
      //   backgroundImage: `url("/carbonfiber.jpg")`,
      // }}
    >
      {/* <h1 className="mx-auto w-fit text-3xl font-arabic text-primary">
        {mainService.name}
      </h1> */}

      <div className="overflow-y-scroll no-scroll">
        <div className="grid grid-columns p-5">
          {servicePackages?.packages && (
            <For each={servicePackages?.packages}>
              {(item, i) => (
                  item.belongTo === mainService.name && item.belongTo === selectedService ? (
                    <AdditionalServicePackageCard
                      price={
                        carSize === 0
                          ? item.smallPrice
                          : carSize === 1
                          ? item.mediumPrice
                          : item.bigPrice
                      }
                      servicePackage={item}
                      key={i}
                      packages={packages}
                      setPackages={setPackages}
                    />
                  ) : <></>
              )}
            </For>
          )}
        </div>
      </div>
    </div>
  )
}
export default AdditionalServiceCard
