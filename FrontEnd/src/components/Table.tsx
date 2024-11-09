import {
  useDeleteMainServiceMutation,
  // useDeletePackageMutation,
  useDeleteSubServiceMutation,
  useToggleBookingStateToDoneMutation,
} from "@/app/api/ServicesApiSlice"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Booking,
  MainService,
  Package,
  Service,
} from "@/types"
import { For } from "@dev-amr/react-sugartax"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAppDispatch } from "@/app/hooks"
import {
  toggleEditServiceModal,
  toggleEditSubServiceModal,
} from "@/app/features/ProductSlice"
import EditServiceModal from "./EditService"
import { EditSubServiceModal } from "."
import { format, parse } from "date-fns"

type ContentTableProps =
  | {
      headers: string[]
      mode: "main-services"
      items: MainService[]
    }
  | {
      headers: string[]
      mode: "services"
      items: Service[]
    }
  | {
      headers: string[]
      mode: "booking"
      items: Booking[]
    }
  | {
      headers: string[]
      mode: "packages"
      items: Package[]
    }

const ContentTable = ({
  headers,
  mode,
  items,
}: ContentTableProps) => {
  const [id, setId] = useState("")
  const [subServiceID, setSubServiceID] = useState("")
  const [deleteMainService] = useDeleteMainServiceMutation()
  const [toggleState] = useToggleBookingStateToDoneMutation()
  const [deleteSubService] = useDeleteSubServiceMutation()
  // const [deletePackage] = useDeletePackageMutation()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formatToHumanReadable = (dateString: string) => {
    // Parse the date string
    const date = parse(dateString, "yyyy-MM-dd-HH", new Date());
  
    // Format to human-readable format
    return format(date, "MMMM d, yyyy, h:mm a");
  }

  return (
    <>
      {id !== "" && (
        <EditServiceModal id={id} mode="main" />
      )}
      {subServiceID !== "" && (
        <EditSubServiceModal id={subServiceID} />
      )}
      <Table className="font-arabic my-5 min-w-[767px]">
        <TableHeader>
          <TableRow>
            <For each={headers}>
              {(item, i) => (
                <TableHead
                  className="text-right text-primary"
                  key={i}
                >
                  {item}
                </TableHead>
              )}
            </For>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mode === "main-services" &&
          items &&
          items.length > 0
            ? items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  {/* <TableCell>
                    <div className="w-[150px] h-[100px] overflow-y-scroll no-scroll">
                      <p>{item.description}</p>
                    </div>
                  </TableCell> */}
                  {/* <TableCell>
                    <img
                      src={item.photo}
                      alt="service-photo"
                      className="w-[250px] sm:m-3"
                    />
                  </TableCell> */}
                  {/* <TableCell>{item.__v}</TableCell> */}
                  <TableCell>
                    {item.isAdditional
                      ? "تصنيف اضافي"
                      : "تصنيف اساسي"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        className="font-arabic"
                        onClick={() => {
                          navigate(
                            `/dash/services/subservices/${item.name}`
                          )
                        }}
                      >
                        التصنيفات الفرعية
                      </Button>
                      <Button
                        className="font-arabic"
                        onClick={() => {
                          setId(item.id)
                          dispatch(
                            toggleEditServiceModal(true)
                          )
                        }}
                      >
                        تعديل
                      </Button>
                      <Button
                        className="font-arabic"
                        onClick={() => {
                          deleteMainService({
                            id: item.id,
                          })
                        }}
                      >
                        حذف
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : mode === "booking" && items.length > 0
            ? items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {item.customerFname +
                      " " +
                      item.customerLname}
                  </TableCell>
                  <TableCell>
                    {item.customerPhone}
                  </TableCell>
                  <TableCell>
                    {formatToHumanReadable(item.date)}
                  </TableCell>
                  <TableCell>{item.carSize}</TableCell>
                  <TableCell className="flex items-center gap-4 flex-wrap text-primary">
                    {item.services.map((service, i) => (
                      <span key={i}>{service}</span>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        toggleState({ id: item._id, isCompleted: !item.isCompleted })
                      }}
                    >
                      {!item.isCompleted
                      ? "تغيير كمنجز"
                      : "تغيير كغير منجز"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {item.isCompleted
                      ? "منجز"
                      : "غير منجز"}
                  </TableCell>
                </TableRow>
              ))
            : mode === "services" && items.length > 0
            ? items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  {/* <TableCell>
                    <div className="w-[150px] h-[100px] overflow-y-scroll">
                      <p>{item.description}</p>
                    </div>
                  </TableCell> */}
                  {/* <TableCell>
                    <img
                      src={item.photo}
                      alt="service-photo"
                      className="w-[250px] m-3"
                    />
                  </TableCell>
                  <TableCell>{item.__v}</TableCell> */}
                  <TableCell className="">
                    <div className="flex items-center gap-2 flex-wrap text-primary justify-center">
                      <Button
                        onClick={() => {
                          navigate(
                            `/dash/services/packages/${item._id}`
                          )
                        }}
                      >
                        الباقات
                      </Button>
                      <Button
                        onClick={() => {
                          setSubServiceID(item._id)
                          dispatch(
                            toggleEditSubServiceModal(true)
                          )
                        }}
                      >
                        تعديل
                      </Button>
                      <Button
                        onClick={() => {
                          deleteSubService({ id: item._id })
                        }}
                      >
                        حذف
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : mode === "packages" && items.length > 0
            ? items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-start justify-center gap-3 flex-col">
                      {item.description.map(
                        (feature, i) => (
                          <span
                            key={i}
                            className={
                              i !==
                              item.description?.length - 1 
                                ? "border-b border-solid border-primary pb-3"
                                : ""
                            }
                          >
                            {feature}
                          </span>
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.smallPrice}EGP</TableCell>
                  <TableCell>{item.mediumPrice}EGP</TableCell>
                  <TableCell>{item.bigPrice}EGP</TableCell>
                  {/* <TableCell>{item.__v}</TableCell> */}
                  {/* <TableCell className="">
                    <div className="flex items-center gap-4 flex-wrap text-primary justify-center">
                      <Button
                        onClick={() => {
                          deletePackage({ id: item._id })
                        }}
                      >
                        حذف
                      </Button>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </>
  )
}
export default ContentTable
