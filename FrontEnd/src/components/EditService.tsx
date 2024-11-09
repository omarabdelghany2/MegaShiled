import {
  IsEditServiceModalOpenSelector,
  toggleEditServiceModal,
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
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useUploadImageMutation } from "@/app/api/ProductsApiSlice"
import {
  useGetServiceByIDQuery,
  useUpdateMainServiceMutation,
} from "@/app/api/ServicesApiSlice"

type EditServiceModalProps = {
  id?: string
  withButton?: boolean
  mode: "main" | "sub"
}

const EditServiceModal = ({
  id = "",
  withButton = false,
  mode,
}: EditServiceModalProps) => {
  const [labelContent, setLabelContent] =
    useState("اختر صورة")
  const [englishName, setEnglishName] = useState("")
  const [arabicName, setArabicName] = useState("")
  const [description, setDescription] = useState("")
  const [isAdditional, setIsAdditional] = useState(false)
  const [image, setImage] = useState("")

  const isOpen = useAppSelector(
    IsEditServiceModalOpenSelector
  )
  const dispatch = useAppDispatch()

  const { data: mainService } = useGetServiceByIDQuery({
    id: id,
  })
  const [updateMainService] = useUpdateMainServiceMutation()
  const [uploadImage] = useUploadImageMutation()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (mode === "main") {
      updateMainService({
        arg: {
          slide: {
            name: englishName,
            arabicName: arabicName,
            isAdditional: isAdditional
          }
        },
        id,
      })
        .unwrap()
        .then(() => {
          dispatch(toggleEditServiceModal(false))
        })
    }
  }

  useEffect(() => {
    if (id && mainService) {
      setEnglishName(mainService.name)
      setArabicName(mainService.arabicName)
      setIsAdditional(mainService.isAdditional)
    }
  }, [id, mainService])

  return (
    <Dialog open={isOpen}>
      {withButton && (
        <DialogTrigger
          className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
          onClick={() =>
            dispatch(toggleEditServiceModal(!isOpen))
          }
        >
          <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          تعديل
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
          <div className="w-full flex cursor-pointer" onClick={() => dispatch(toggleEditServiceModal(false))}>x</div>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            تعديل الخدمة
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 text-white"
              encType="multipart/from-data"
            >
              <Input
                type="text"
                placeholder="اسم الخدمة بالانجليزية"
                value={englishName}
                onChange={e => setEnglishName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="اسم الخدمة بالعربية"
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
                تعديل
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default EditServiceModal
