import { Package } from "@/types"
import { For } from "@dev-amr/react-sugartax"
import { Check } from "lucide-react"
import { Button } from "./ui/button"
import { useTranslation } from "react-i18next"
import { toggleItem } from "@/app/features/BookingCartSlice"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"

const AdditionalServicePackageCard = ({
  id,
  servicePackage,
  title,
  price,
}: {
  id: string
  title: string | undefined
  servicePackage: Package
  price: number | undefined
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.bookingCart);

  const handleToggleItem = () => {
    dispatch(toggleItem({ id, name: (title || ""),  price: (price || 0) }));
  };

  return (
    <div
      style={{
        backgroundImage: `url(/polishers.jpg)`,
      }}
      className="min-w-[400px] bg-slate-950 rounded-md shadow-md relative overflow-hidden
      bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute top-0 h-full w-[70px] z-0 bg-primary/70 left-8 -skew-x-12" />
      <div className="absolute z-10 bg-black/50 inset-0 " />
      <div className="relative z-30 h-full">
        <h1 className={`text-white text-2xl my-3 ${t("locale.lang") === "ar" ? "font-arabic" : "font-landing"}`}>
          {t('locale.lang') === "ar" ? servicePackage.arabicName : servicePackage.name}
        </h1>
        <span className={`mx-auto text-primary text-xl font-bold relative z-50 ${t("locale.lang") === "ar" ? "font-arabic" : "font-landing"}`}>
          {price + " "}{t('currency.short')}
        </span>
        <ul className={`p-1 text-green max-w-[350px] text-right font-bold text-xl ${t("locale.lang") === "ar" ? "font-arabic" : "font-landing"}`}>
          <For each={t("locale.lang") === "ar" ? servicePackage.arabicDescription : servicePackage.description}>
            {(item, i) => (
              <li
                key={i}
                className="grid grid-cols-[40px_1fr] gap-3"
              >
                <Check className="w-[4rem]" />
                <span>{item}</span>
              </li>
            )}
          </For>
        </ul>

        <Button
          className="font-arabic bg-transparent"
          onClick={handleToggleItem}
        >
          {cart.items.find( item => item.id === servicePackage._id ) ? (
            <div className="absolute bottom-5 bg-green-600 p-2 rounded-md	">{t("reserve.sectionTwo.remove")}</div>
          ) : (
            <div className="absolute bottom-5 bg-primary p-2 rounded-md	">{t("reserve.sectionTwo.add")}</div>
          )}
        </Button>
      </div>
    </div>
  )
}
export default AdditionalServicePackageCard
