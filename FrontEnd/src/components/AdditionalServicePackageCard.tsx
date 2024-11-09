import { Package } from "@/types"
import { For } from "@dev-amr/react-sugartax"
import { Check } from "lucide-react"
import { Button } from "./ui/button"
import { useTranslation } from "react-i18next"

const AdditionalServicePackageCard = ({
  servicePackage,
  packages,
  setPackages,
  price,
}: {
  servicePackage: Package
  packages: { title: string; price: number }[]
  setPackages: React.Dispatch<
    React.SetStateAction<{ title: string; price: number }[]>
  >
  price: number
}) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        backgroundImage: `url(/polishers.jpg)`,
      }}
      className="w-[300px] h-[250px] bg-slate-950 rounded-md shadow-md relative overflow-hidden
      bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute top-0 h-full w-[70px] z-0 bg-primary/70 left-8 -skew-x-12" />
      <div className="absolute z-10 bg-black/50 inset-0 " />
      <div className="relative z-30 h-full">
        <h1 className="font-arabic text-white text-xl my-3">
          {t('locale.lang') === "ar" ? servicePackage.arabicName : servicePackage.name}
        </h1>
        <span className="mx-auto text-primary text-xl font-bold relative z-50">
          {price + " "}جنيه
        </span>
        <ul className="p-5 text-green-600 font-arabic font-bold text-sm">
          <For each={t("locale.lang") === "ar" ? servicePackage.arabicDescription : servicePackage.description}>
            {(item, i) => (
              <li
                key={i}
                className="flex items-center gap-2"
              >
                <Check />
                <span>{item}</span>
              </li>
            )}
          </For>
        </ul>

        <Button
          className="font-arabic"
          onClick={() => {
            if (
              !packages.find(
                item => item.title === servicePackage.name
              )
            ) {
              setPackages(prev => [
                ...prev,
                {
                  title: servicePackage.name,
                  price: +price,
                },
              ])
            } else {
              const filteredPackages = packages.filter(
                item => item.title !== servicePackage.name
              )

              setPackages(filteredPackages)
            }
          }}
        >
          {packages.find(
            item => item.title === servicePackage.name
          ) ? (
            <div className="absolute bottom-5 bg-green-600 p-2 rounded-md	">اضافت</div>
          ) : (
            <div className="absolute bottom-5 bg-primary p-2 rounded-md	">اضافة</div>
          )}
        </Button>
      </div>
    </div>
  )
}
export default AdditionalServicePackageCard
