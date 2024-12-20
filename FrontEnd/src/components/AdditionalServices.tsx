import { useGetAllMainServicesQuery } from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"
import { For } from "@dev-amr/react-sugartax"
import { useEffect, useState } from "react"
import AdditionalServiceCard from "./AdditionalServiceCard"
import styles from "../components/styles/components/AdditionalServices.module.scss"
import { useTranslation } from "react-i18next"

type PackagesProps = {
  carSize: 0 | 1 | 2
}

const AdditionalServices = ({
  carSize,
}: PackagesProps) => {
  const [additionalServices, setAdditionalServices] = useState<MainService[]>([])
  const { data: mainServices, isLoading } = useGetAllMainServicesQuery("")
  const { t } = useTranslation();
  
  useEffect(() => {
    if (mainServices) {
      const filtered = mainServices.mainServices.filter(itm => itm.isAdditional  === true)
      setAdditionalServices(filtered)
    }
  }, [mainServices])

  if (isLoading) return "loading...  "

  return (
    <section className="">
     {
      additionalServices.length ? (
        <>
            <h1 className={` ${styles.title}`}>
              <span className={styles.line}></span>
              <div className={`${styles.text} text-primary font-bold text-2xl my-5 ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>{t('reserve.sectionTwo.title')}</div>
              <span className={styles.line}></span>
            </h1>
            <div className={`${styles.additional} `}>
              <For each={additionalServices}>
                {(item, i) => (
                  <AdditionalServiceCard
                  carSize={carSize}
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
