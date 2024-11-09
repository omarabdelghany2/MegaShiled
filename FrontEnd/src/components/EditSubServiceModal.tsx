import {
  IsEditSubServiceModalOpenSelector,
  toggleEditSubServiceModal,
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
import {
  useGetSubServiceByIDQuery,
  useUpdateSubServiceMutation,
} from "@/app/api/ServicesApiSlice"

type EditServiceModalProps = {
  id?: string
  withButton?: boolean
}

const EditSubServiceModal = ({
  id = "",
  withButton = false,
}: EditServiceModalProps) => {
  const [mainServiceID, setMainServiceId] = useState("")
  const [englishName, setEnglishName] = useState("")
  const [arabicName, setArabicName] = useState("")

  const isOpen = useAppSelector(
    IsEditSubServiceModalOpenSelector
  )
  const dispatch = useAppDispatch()

  const { data: mainService } = useGetSubServiceByIDQuery({
    id: id,
  })
  const [updateMainService] = useUpdateSubServiceMutation()

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    updateMainService({
      props: {
        name: englishName,
        arabicName: arabicName,
        belongsTo: mainServiceID,
      },
      id,
    })
      .unwrap()
      .then(() => {
        dispatch(toggleEditSubServiceModal(false))
      })
  }

  useEffect(() => {
    const singleMainService = mainService?.packages[0]

    if (id && singleMainService) {
      setEnglishName(singleMainService.name)
      setArabicName(singleMainService.arabicName)
      setMainServiceId(singleMainService.belongsTo)
    }
  }, [id, mainService])

  return (
    <Dialog open={isOpen}>
      {withButton && (
        <DialogTrigger
          className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
          onClick={() =>
            dispatch(toggleEditSubServiceModal(!isOpen))
          }
        >
          <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          تعديل
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
          <div className="w-full flex cursor-pointer" onClick={() => dispatch(toggleEditSubServiceModal(false))}>x</div>
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
export default EditSubServiceModal
