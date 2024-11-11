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
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import {
  useAddMainServiceMutation,
  useUpdateMainServiceMutation,
} from "@/app/api/ServicesApiSlice"

type ServiceModalProps = {
  mode: "add" | "edit"
  id?: string
  withButton?: boolean
  setId?: React.Dispatch<React.SetStateAction<string>>
}

const ServiceModal = ({
  mode,
  id = "",
  setId,
  withButton = false,
}: ServiceModalProps) => {
  const [englishName, setEnglishName] = useState("")
  const [arabicName, setArabicName] = useState("")
  const [isAdditional, setIsAdditional] = useState(false)

  const isOpen = useAppSelector(IsServiceModalOpenSelector)
  const dispatch = useAppDispatch()

  // const { data: mainService } = useGetServiceByIDQuery({
  //   id: id,
  // })

  const [addMainService] = useAddMainServiceMutation()
  const [updateMainService] = useUpdateMainServiceMutation()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (mode === "add") {
      addMainService({
        slide: {
          name: englishName,
          arabicName: arabicName,
          isAdditional,
        }
      })
        .unwrap()
        .then(() => {
          dispatch(toggleServiceModal(false))
          setEnglishName("")
          setArabicName("")
          setIsAdditional(false)
        })
    } else if (mode === "edit" && id) {
      updateMainService({
        arg: {
          slide: {
              name: englishName,
              arabicName: arabicName,
              isAdditional,
          }
        },
        id,
      })
        .unwrap()
        .then(() => {
          if (setId) setId("")
          dispatch(toggleServiceModal(false))
        })
    }
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
          {mode === "add" ? "اضف تصنيف" : "تعديل"}
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
        <div className="flex items-center cursor-pointer w-full" onClick={() => dispatch(toggleServiceModal(false))}>x</div>

          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            {mode === "add"
              ? "اضافة تصنيف جديد"
              : "تعديل التصنيف"}
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 text-white"
              encType="multipart/from-data"
            >
              <Input
                type="text"
                placeholder="اسم التصنيف بالانجليزية"
                value={englishName}
                onChange={e => setEnglishName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="اسم التصنيف بالعربية"
                value={arabicName}
                onChange={e => setArabicName(e.target.value)}
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="cursor-pointer w-4 h-4 accent-primary"
                  checked={isAdditional}
                  onChange={e =>
                    setIsAdditional(e.target.checked)
                  }
                />
                <Label
                  htmlFor="image"
                  className=" 
                font-arabic"
                >
                  خدمة اضافية
                </Label> 
              </div>
              <Button type="submit" onClick={handleSubmit}>
                {mode === "add" ? "اضافة" : "تعديل"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default ServiceModal
