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
import { useState } from "react"
import { Button } from "./ui/button"
import { useAddPackageMutation } from "@/app/api/ServicesApiSlice"

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
  const [name, setName] = useState("")
  const [smallPrice, setSmallPrice] = useState<number | undefined>()
  const [mediumPrice, setMediumPrice] = useState<number | undefined>()
  const [bigPrice, setBigPrice] = useState<number | number>()

  const isOpen = useAppSelector(IsServiceModalOpenSelector)
  const dispatch = useAppDispatch()

  const [addPackage] = useAddPackageMutation()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    // console.log({
    //     description: englishFeatures,
    //     smallPrice,
    //     bigPrice,
    //     mediumPrice,
    // });
    addPackage({
      id,
      props: {
        // name,
        description: englishFeatures.split(","),
        arabicDescription: arabicFeatures.split(","),
        smallPrice,
        bigPrice,
        mediumPrice,
        // belongTo: id,
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
        <DialogHeader>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            تعديل الباقة
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 text-white"
              encType="multipart/from-data"
            >
              {/* <Input
                type="text"
                placeholder="اسم الباقة"
                value={name}
                onChange={e => setName(e.target.value)}
              /> */}

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
                onChange={e => {
                  setEnglishFeatures(e.target.value)
                }}
              />
              <textarea
                placeholder="اضف مزايا الباقة بالعربية"
                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                onChange={e => {
                  setArabicFeatures(e.target.value)
                }}
              />
              {/* <Input
                type="text"
                placeholder="الميزة الثانية"
                onChange={e => {
                  setFeatures(prev => {
                    prev[1] = e.target.value

                    return [...prev]
                  })
                }}
              />
              <Input
                type="text"
                placeholder="الميزة الثالثة"
                onChange={e => {
                  setFeatures(prev => {
                    prev[2] = e.target.value

                    return [...prev]
                  })
                }}
              /> */}
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
