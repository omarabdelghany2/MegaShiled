import {
  useAddProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "@/app/api/ProductsApiSlice"
import {
  IsProductOpenSelector,
  toggleIsProductOpen,
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

type ProductModalProps = {
  mode: "add" | "edit"
  id?: string
  withButton?: boolean
}

const ProductModal = ({
  mode,
  id,
  withButton = false,
}: ProductModalProps) => {
  const [labelContent, setLabelContent] = useState("اختر صورة")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")

  const isOpen = useAppSelector(IsProductOpenSelector)
  const dispatch = useAppDispatch()

  const [addProduct] = useAddProductMutation()
  const [] = useUpdateProductMutation()
  const [uploadImage] = useUploadImageMutation()

  // Handle form submission
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (mode === "add") {
      addProduct({
        name,
        description,
        imageFileName: image,
        price,
      })
        .unwrap()
        .then(() => {
          setDescription("")
          setImage("")
          setLabelContent("اختر صورة")  // Reset the label content
          setName("")
          setPrice("")
          dispatch(toggleIsProductOpen(false))
        })
        .catch((err) => {
          console.error("Error adding product:", err)
        })
    }
  }

  // Handle file input change and image upload
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      const file = files[0];
      formData.append("ImageFileName", file);  // Append the selected image file

      // Log form data for debugging (optional)
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });

      // Update label content to show the selected file name
      setLabelContent(file.name);

      // Upload the image to the server
      uploadImage(formData)
        .unwrap()
        .then((data) => {
          if (data?.imageName) {
            setImage(data.imageName);  // Set the image URL returned from the API
            setLabelContent("Uploaded");
          }
        })
        .catch((err) => {
          console.error("Upload failed:", err);
        });
    } else {
      console.warn("No file selected for upload.");
    }
  };

  useEffect(() => {
    if (mode === "edit" && id) {
      // Logic for editing product (fetch product details and populate fields)
    }
  }, [id, mode]);

  return (
    <Dialog open={isOpen}>
      {withButton && (
        <DialogTrigger
          className="font-arabic text-lg px-4 py-3 border border-solid border-primary
        rounded-lg relative overflow-hidden group"
          onClick={() =>
            dispatch(toggleIsProductOpen(!isOpen))
          }
        >
          <div className="absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          {mode === "add" ? "اضف منتج" : "تعديل"}
        </DialogTrigger>
      )}
      <DialogContent className="font-arabic bg-[#333] border-none text-center text-white text-[1.5rem]">
        <DialogHeader>
          <DialogTitle className="w-fit mx-auto text-primary mb-4 text-2xl">
            {mode === "add" ? "اضافة منتج جديد" : "تعديل المنتج"}
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 text-white"
              encType="multipart/form-data"  // Correct encoding type for file upload
            >
              <Input
                type="text"
                placeholder="اسم المنتج"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="السعر"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              <Label
                htmlFor="image"
                className="w-full h-9 border border-solid text-right flex items-center px-3 border-primary-gray rounded-lg
                font-arabic"
              >
                {labelContent}
              </Label>
              <Input
                type="file"
                placeholder="الصورة"
                id="image"
                className="hidden"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="الوصف"
                className="block w-full min-h-[80px] resize-none rounded-md p-3 text-lg"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
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

export default ProductModal
