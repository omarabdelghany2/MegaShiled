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
import { useAddSubServiceMutation } from "@/app/api/ServicesApiSlice"

type ServiceModalProps = {
  mode: "add" | "edit"
  id?: string
  withButton?: boolean
  setId?: React.Dispatch<React.SetStateAction<string>>
}

const AddSubServiceModal = ({
  withButton = false,
  id = "",
}: ServiceModalProps) => {
  
  const [englishName, setEnglishName] = useState("")
  const [arabicName, setArabicName] = useState("")
  const [englishDescription, setEnglishDescription] = useState("")
  const [arabicDescription, setArabicDescription] = useState("")
  const [smallPrice, setSmallPrice] = useState<number | undefined>()
  const [mediumPrice, setMediumPrice] = useState<number | undefined>()
  const [bigPrice, setBigPrice] = useState<number | undefined>()


  const isOpen = useAppSelector(IsServiceModalOpenSelector)
  const dispatch = useAppDispatch()

  const [addSubService] = useAddSubServiceMutation()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    addSubService({
      service: {
        name: englishName,
        arabicName: arabicName,
        belongTo: id,
        description: englishDescription.split(","),
        arabicDescription: arabicDescription.split(","),
        smallPrice,
        mediumPrice,
        bigPrice
      },
    })
      .unwrap()
      .then(() => {
        dispatch(toggleServiceModal(false))
        setEnglishName("")
        setArabicName("")
        setArabicDescription("")
        setEnglishDescription("")
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
          اضف باكدج
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
          <div className="w-full flex cursor-pointer" onClick={() => dispatch(toggleServiceModal(false))}>x</div>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            اضافة باكدج جديد
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 text-white"
              encType="multipart/from-data"
            >
              <Input
                type="text"
                placeholder="اسم الخدمة بالانجلزية"
                value={englishName}
                onChange={e => setEnglishName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="اسم الخدمة بالعربية"
                value={arabicName}
                onChange={e => setArabicName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="سعر السيارة الصغيرة"
                value={smallPrice}
                onChange={e => setSmallPrice(+e.target.value)}
              />
              <Input
                type="number"
                placeholder="سعر السيارة الوسط"
                value={mediumPrice}
                onChange={e => setMediumPrice(+e.target.value)}
              />
              <Input
                type="number"
                placeholder="سعر السيارة الكبيرة"
                value={bigPrice}
                onChange={e => setBigPrice(+e.target.value)}
              />
              <textarea
                placeholder="الوصف بالانجليزية"
                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                value={englishDescription}
                onChange={e =>
                  setEnglishDescription(e.target.value)
                }
              ></textarea>
              <textarea
                placeholder="الوصف بالعربية"
                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                value={arabicDescription}
                onChange={e =>
                  setArabicDescription(e.target.value)
                }
              ></textarea>
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
export default AddSubServiceModal
