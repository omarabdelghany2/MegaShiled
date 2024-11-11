import { For } from "@dev-amr/react-sugartax"
import { Check} from "lucide-react"
import { Button } from "./ui/button"
import {  useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { toggleItem } from "@/app/features/BookingCartSlice"
import { useTranslation } from "react-i18next"

const packImagesURLS = [
  "/pack-1.jpg",
  "/pack-2.jpg",
  "/pack-3.jpg",
]

type ServicePackageCardProps = {
  title: string | undefined
  id: string
  features: string[]
  price: number 
}

const ServicePackageCard = ({
  id,
  title,
  features,
  price,
}: ServicePackageCardProps) => {
  const random = useMemo( () => Math.floor(Math.random() * 3), [])
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.bookingCart);
  const { t } = useTranslation()

  const handleAddItem = () => {
    dispatch(toggleItem({ id, name: (title || ""), price }));
  };

 
  return (
    <div key={id} className="overflow-hidden relative flex flex-col rounded-lg w-[300px] h-[450px]" style={{ border: "2px solid #2b2c2e" }}>
      <div
        className="absolute h-[50px] w-52 border-y-2 border-solid border-slate-400 flex items-center justify-center
      -rotate-45 top-5 -left-12 z-[25] bg-slate-400/20 backdrop-blur-lg text-white text-md
      tracking-widest"
      >
        MEGA PRICE
      </div>
      <div className="absolute inset-0 bg-black/40 z-20 " />
      <div className="z-40 p-5 peer h-full">
        <h1 className={`text-right text-3xl drop-shadow-lg text-white font-bold my-5 h-14 ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>
          {title}
        </h1>
        <div className="flex my-5 w-fit gap-1 text-primary">
          <div className=" aspect-square flex items-start text-xl font-bold shadow-sm">
            EGP
          </div>
          <div className="flex-1 items-center justify-center text-white font-bold text-6xl">
            {price}
          </div>
          <div className=" aspect-square flex items-end text-xl font-bold shadow-sm font-arabic">
            جنيه
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-center my-14">
          <For each={features}>
            {(item, i) => (
              <div
                className="flex items-center gap-2"
                key={i}
              >
                <Check
                  size={25}
                  color="#d80032"
                  className="font-bold"
                />
                <span className="text-white font-arabic text-base">
                  {item}
                </span> 
              </div>
            )}
          </For>
        </div>
        <Button
          className={` font-arabic text-xl  flex items-center mt-auto justify-center absolute bottom-2 left-2 right-2  ${
          cart.items.filter(p => p.id === id).length > 0  ? "bg-white" : "bg-transparent"  }  border-2 border-solid border-primary`}
          onClick={handleAddItem}
        >
          {cart.items.filter(p => p.id === id).length > 0 ? (
            <div className={`text-primary ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>{t("reserve.sectionTwo.remove")}</div>
          ) : (
            <div className={`${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>{t("reserve.sectionTwo.add")}</div>
          )}
        </Button>
      </div>
      <div
        className="p-5 bg-cover bg-no-repeat rounded-lg overflow-hidden absolute inset-0 z-10 transition-transform duration-500 peer-hover:scale-110 "
        style={{
          backgroundImage: `url(${packImagesURLS[random]})`,
        }}
      ></div>
    </div>
  )
}
export default ServicePackageCard
