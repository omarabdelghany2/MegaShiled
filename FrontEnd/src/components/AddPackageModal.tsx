import {
  IsServiceModalOpenSelector,
  toggleServiceModal,
} from "@/app/features/ProductSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useAddPackageMutation, useGetPackageByIDQuery } from "@/app/api/ServicesApiSlice"

type ServiceModalProps = {
  mode: "add" | "edit"
  id?: string
  withButton?: boolean
  setId?: React.Dispatch<React.SetStateAction<string>>
}

const AddPackageModal = ({
  withButton = false,
  id = "",
}: ServiceModalProps) => {
  const [englishFeatures, setEnglishFeatures] = useState("")
  const [arabicFeatures, setArabicFeatures] = useState("")
  const [smallPrice, setSmallPrice] = useState<number | undefined>()
  const [mediumPrice, setMediumPrice] = useState<number | undefined>()
  const [bigPrice, setBigPrice] = useState<number | number>()

  const isOpen = useAppSelector(IsServiceModalOpenSelector)
  const dispatch = useAppDispatch()

  const [addPackage] = useAddPackageMutation()
  const { data: packages } = useGetPackageByIDQuery({ id: id })


  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    addPackage({
      id,
      props: {
        description: englishFeatures.split(","),
        arabicDescription: arabicFeatures.split(","),
        smallPrice,
        bigPrice,
        mediumPrice,
      },
    })
      .unwrap()
      .then(() => {
        dispatch(toggleServiceModal(false))
        setEnglishFeatures("")
        setArabicFeatures("")
        setSmallPrice(undefined)
        setMediumPrice(undefined)
        setBigPrice(undefined)
      })
  }

  useEffect(() => {
    const singlePackage = packages?.packages[0]

    if (singlePackage) {
      setEnglishFeatures(singlePackage?.description.join(","))
      setArabicFeatures(singlePackage?.arabicDescription.join(","))
      setSmallPrice(singlePackage?.smallPrice)
      setMediumPrice(singlePackage?.mediumPrice)
      setBigPrice(singlePackage?.bigPrice)
    }

  }, [packages])

  return (
    <Dialog open={isOpen}>
      {withButton && (
        <DialogTrigger
          className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
          onClick={() =>
            dispatch(toggleServiceModal(!isOpen))
          }
        >
          <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          تعديل الباقة
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <div className="w-full flex cursor-pointer" onClick={() => dispatch(toggleServiceModal(false))}>x</div>
        <DialogHeader>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            تعديل الباقة
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 text-white"
              encType="multipart/from-data"
            >
              <Input
                type="number"
                placeholder="السعر للسيارات الصغيرة"
                value={smallPrice}
                onChange={e =>
                  setSmallPrice(parseInt(e.target.value))
                }
              />
              <Input
                type="number"
                placeholder="السعر للسيارات المتوسطة"
                value={mediumPrice}
                onChange={e =>
                  setMediumPrice(+e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="السعر للسيارات الكبيرة"
                value={bigPrice}
                onChange={e => setBigPrice(+e.target.value)}
              />

              <textarea
                placeholder="اضف مزايا الباقة بالانجليزية"
                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                value={englishFeatures}
                onChange={e => {
                  setEnglishFeatures(e.target.value)
                }}
              />
              <textarea
                placeholder="اضف مزايا الباقة بالعربية"
                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                value={arabicFeatures}
                onChange={e => {
                  setArabicFeatures(e.target.value)
                }}
              />
              <Button type="submit" onClick={handleSubmit}>
                اضافة
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default AddPackageModal
