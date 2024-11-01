import {  CarFront } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { useAddBookingMutation } from "@/app/api/ServicesApiSlice"
import { toast } from "react-toastify"
import Calendar from 'react-calendar';
import styles from "../components/styles/components/PersonalInfo.module.scss"
import { isFriday, isSunday , format, isSameDay, addDays } from 'date-fns';


import "../styles/calendar/calendar.scss"

type PersonalInfoProps = {
  carSize: 0 | 1 | 2

  packages: { title: string; price: number }[]
  setPackages: React.Dispatch<
    React.SetStateAction<{ title: string; price: number }[]>
  >
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const PersonalInfo = ({
  carSize,
  packages,
}: PersonalInfoProps) => {
  const [packagesName, setPackagesName] = useState<
    string[]
  >([])
  const tommorrow = addDays(new Date(), 1)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")
  const [value, onChange] = useState<Value>(tommorrow);
  const [time, setTime] = useState('');

  const availableTimeFriday = [
    "4:00PM",
    "5:00PM",
    "6:00PM",
    "7:00PM",
    "8:00PM",
  ]
  
  const availableTimeWeek = [
    "10:00AM",
    "11:00AM",
    "12:00PM",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "4:00PM",
    "5:00PM",
    "6:00PM",
    "7:00PM",
    "8:00PM",
  ]
  

  useEffect(() => {
    setPackagesName([])
    packages.forEach(item => {
      setPackagesName(prev => [...prev, item.title])
    })
  }, [packages])

  const [book] = useAddBookingMutation()

  const handleAddBooking = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    book({
      carSize:
        carSize === 0
          ? "small"
          : carSize === 1
          ? "medium"
          : carSize === 2
          ? "large"
          : "",
      city,
      customerFname: firstName,
      customerLname: lastName,
      customerPhone: phone,
      date,
      services: packagesName,
    })
      .unwrap()
      .then(() => {
        toast("تم اتمام حجزك بنجاح", { type: "success" })
      })
      .catch(err => {
        toast(err.data.msg, { type: "error" })
      })
  }
  return (
    <div
      id="personal-info"
      className={styles.personalinfo}
    >
      <form
        className={styles.form}
      >
        <h1 className="w-fit mx-auto text-primary text-2xl mb-6 font-arabic font-semibold">
          أدخل بياناتك لاكمال الحجز
        </h1>
        <Input
          className="my-4 font-arabic text-lg placeholder:text-white text-white"
          placeholder="الاسم الاول"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <Input
          className="my-4 font-arabic text-lg placeholder:text-white text-white"
          placeholder="الاسم الثاني"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <Input
          className="my-4 font-arabic text-lg placeholder:text-white text-white"
          placeholder="المدينة"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <Input
          type="tel"
          className="my-4 font-arabic text-lg  ltr text- placeholder:text-white placeholder:text-right text-white"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        {/* <Input
          className="my- placeholder:text-white text-white mb-4"
          type="datetime-local"
          onChange={e =>
            setDate(
              new Date(e.target.value).toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            )
          }
        /> */}
      </form>
      <div className="flex-1 grid grid-cols-2 gap-3 z-10">
        <div className={styles.carsize}>
          <h1 className="w-fit mx-auto text-xl text-primary font-arabic">
            حجم السيارة
          </h1>
          <div className="my-5">
            <CarFront
              className="text-primary"
              color="#d80032"
              size={50}
            />
          </div>
          <span className="font-arabic text-xl font-bold">
            {carSize === 0
              ? "صغير"
              : carSize === 1
              ? "وسط"
              : "كبير"}
          </span>
        </div>
        <div className={styles.service}>
          <h1
            className="w-fit mx-auto text-xl font-bold
          text-primary font-arabic"
          >
            الخدمات
          </h1>
          <p className="flex items-center justify-center font-arabic flex-wrap gap-4 text-lg">
            {packagesName.join(" + ")}
          </p>
        </div>
        <div className={styles.total}>
          <h1 className="w-fit mx-auto text-xl font-bold text-primary font-arabic">
            السعر الاجمالي
          </h1>
          <span className=" font-arabic text-2xl my-auto">
            {packages.reduce((a, b) => a + +b.price, 0)}L.E
          </span>
        </div>
        <div className={styles.date}>
          <h1 className="w-fit mx-auto text-xl font-bold text-primary font-arabic">
            تاريخ و توقيت الحجز
          </h1>
          <p className="flex items-center justify-center gap-3">
            <span className="font-arabic text-2xl my-auto mt-8">
              {value ? `${format(value as Date, 'yyyy-MM-dd')}` : "اختر تاريخ الحجز"}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.datesection}>
      <Calendar onChange={onChange} value={value}  className={`p-4 h-80 text-lg ${styles.calendar}`}  tileClassName={({ date,  view }) => { 
        if( isSameDay (date, value as Date)) {
          return  styles.highlight
        }
      }}
      minDate={tommorrow}
      
      />
      </div>
        <div className={styles.timing}>
        {value && isFriday(value as unknown as Date) ? availableTimeFriday.map((itm, index) => (
          <div key={index} onClick={() => setTime(itm)} className={`${styles.timedate} ${itm === time ? styles.clicked: null}`}>{itm}</div>
        )): availableTimeWeek.map((itm,index) => (
          <div key={index}  onClick={() => setTime(itm)} className={`${styles.timedate} ${itm === time ? styles.clicked: null}`}>{itm}</div>
        ))
        }
        </div>
        <Button
          className={`${styles.send} text-lg font-arabic w-full bg-transparent border-2 border-primary`}
          onClick={handleAddBooking}
        >
          إكمال الحجز
        </Button>
    </div>
  )
}
export default PersonalInfo
