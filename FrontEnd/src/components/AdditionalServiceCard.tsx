import {
  useGetSubServicePackagesQuery,
  useGetSubServicesQuery,
} from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"
import AdditionalServicePackageCard from "./AdditionalServicePackageCard"
import { For } from "@dev-amr/react-sugartax"

const AdditionalServiceCard = ({
  mainService,
  carSize,
}: {
  mainService: MainService
  carSize: 0 | 1 | 2
}) => {
  const { data: subservices } = useGetSubServicesQuery({ id: mainService.id })
  const { data: servicePackages } = useGetSubServicePackagesQuery({ id: subservices?.packages[0]._id || ""})

  return (
    <div
      className="flex-1 bg-cover bg-center bg-no-repeat  p-5  border border-solid border-transparent" >
      <div className="overflow-y-scroll no-scroll">
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          {servicePackages?.packages && (
            <For each={servicePackages?.packages}>
              {(item, i) => (
                  item.belongTo === mainService.name ? (
                    <AdditionalServicePackageCard
                      id={item._id}
                      title={item.name}
                      price={ carSize === 0 ? item.smallPrice : carSize === 1  ? item.mediumPrice : item.bigPrice }
                      servicePackage={item}
                      key={i}
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
