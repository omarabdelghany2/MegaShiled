import {  CarFront } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { useAddBookingMutation, useGetAllReservedDatesQuery } from "@/app/api/ServicesApiSlice"
import { toast } from "react-toastify"
import Calendar from 'react-calendar';
import styles from "../components/styles/components/PersonalInfo.module.scss"
import { isFriday, isSunday , format, isSameDay, addDays, setHours, setMinutes, parse } from 'date-fns';

import "../styles/calendar/calendar.scss"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { clearCart } from "@/app/features/BookingCartSlice"

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
}: PersonalInfoProps) => {
  const tomorrow = addDays(new Date(), 1)
  const minDate = isSunday(tomorrow) ? addDays(tomorrow, 1) : tomorrow;
  const { t } = useTranslation();
  const { data: dates } = useGetAllReservedDatesQuery("")
  const cart = useSelector((state: RootState) => state.bookingCart);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [value, onChange] = useState<Value>(minDate);
  const [time, setTime] = useState('');

  const availableTimeFriday = [
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ]
  
  const availableTimeWeek = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ]
  
  const [book] = useAddBookingMutation()

  const handleAddBooking = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!firstName || !lastName || !phone || !city || !value || !time) {
      toast("يرجى ملء جميع الحقول", { type: "error" });
      return;
    }

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
      date: `${concatenateDateAndTime(format(value as Date, 'yyyy-MM-dd'), time)}`,
      services: cart.items.map(itm => itm.id),
    })
      .unwrap()
      .then(() => {
        toast("تم اتمام حجزك بنجاح", { type: "success" })
        setFirstName('')
        setLastName('')
        setPhone('')
        setCity('')
        setTime('')
        dispatch(clearCart())
      })
      .catch(err => {
        toast(err.data.msg, { type: "error" })
      })
  }

  const concatenateDateAndTime = (dateStr: string, timeStr: string): string => {
    // Step 1: Parse the date string into a Date object
    const date = parse(dateStr, 'yyyy-MM-dd', new Date());
  
    // Step 2: Extract the hour and period (AM/PM) from the time string
    const [time, period] = timeStr.split(/(AM|PM)/i);
    const [hour, minutes] = time.split(':').map(Number);
    
    // Step 3: Convert to 24-hour format if needed
    const hour24 = period.toLowerCase() === 'pm' && hour !== 12 ? hour + 12 : (period.toLowerCase() === 'am' && hour === 12 ? 0 : hour);
  
    // Step 4: Set the extracted hour and minutes on the date
    const dateTime = setMinutes(setHours(date, hour24), minutes || 0);
  
    // Step 5: Format the result as 'yyyy-MM-dd-HH'
    return format(dateTime, 'yyyy-MM-dd-HH');
  }

  const handleResetTime = (time: Value) => {
    onChange(time);
    setTime('');
  };


  return (
    <div
      id="personal-info"
      className={styles.personalinfo}
    >
      <form
        className={styles.form}
      >
        <h1 className={`w-fit mx-auto text-primary text-2xl mb-6 font-semibold ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>
          {t('reserve.sectionThree.title')}
        </h1>
        <Input
          className={`my-4 font-arabic text-lg placeholder:text-white text-white ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
          placeholder={t('reserve.sectionThree.fname')}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <Input
          className={`my-4 font-arabic text-lg placeholder:text-white text-white ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
          placeholder={t('reserve.sectionThree.lname')}
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <Input
          className={`my-4 font-arabic text-lg placeholder:text-white text-white ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
          placeholder={t('reserve.sectionThree.city')}
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <Input
          type="tel"
          className={`my-4 font-arabic text-lg  ltr text- placeholder:text-white placeholder:text-right text-white ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
          placeholder={t('reserve.sectionThree.phone')}
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </form>
      <div className="flex-1 grid grid-cols-2 gap-3 z-10">
        <div className={styles.carsize}>
          <h1 className={`w-fit mx-auto text-xl text-primary ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
          {t('reserve.sectionFour.carSize')}
          </h1>
          <div className="my-5">
            <CarFront
              className="text-primary"
              color="#d80032"
              size={50}
            />
          </div>
          <span className={`text-xl font-bold ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
            {carSize === 0
              ? (t('locale.lang') === "ar" ? "صغير": "Small")
              : carSize === 1
              ? (t('locale.lang') === "ar" ? "وسط": "Medium")
              : (t('locale.lang') === "ar" ? "كبير": "Large")
              }
          </span>
        </div>
        <div className={styles.service}>
          <h1 className={`w-fit mx-auto text-xl font-bold text-primary ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`} >
            {t('reserve.sectionFour.service')}
          </h1>
          <p className="flex flex-col items-end gap-4">
            {
              cart.items.map(itm => (
                <div key={itm.id} className={`text-lg text-white ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>{itm.name}</div>
              ))
            }
          </p>
        </div>
        <div className={styles.total}>
          <h1 className={`w-fit mx-auto text-xl font-bold text-primary ${t('locale.lang') === "ar" ? "font-arabic" : "font-landing"}`}>
          {t('reserve.sectionFour.total')}
          </h1>
          <span className={`text-2xl my-auto flex flex-row-reverse gap-2  ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
            <div>{cart.totalAmount}</div>
            <div>{ t("currency.short") }</div>
          </span>
        </div>
        <div className={styles.date}>
          <h1 className={`w-fit mx-auto text-xl font-bold text-primary ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
          {t('reserve.sectionFour.date')}
          </h1>
          <p className="flex items-center h-full justify-center gap-3">
            <span className={`font-arabic text-2xl my-auto  ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}>
              {value ? `${format(value as Date, 'yyyy-MM-dd')}` : "اختر تاريخ الحجز"}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.datesection}>
      <Calendar onChange={handleResetTime} value={value}  className={`p-4 h-80 text-lg ${styles.calendar}`} locale={t('locale.lang')} tileClassName={({ date,  view }) => { 
        if( isSameDay (date, value as Date)) {
          return  styles.highlight
        }
      }}
      minDate={minDate}
      tileDisabled={({ date }) => isSunday(date)}
      />
      </div>
        <div className={styles.timing}>
        {value && isFriday(value as Date) ? availableTimeFriday.map((itm, index) => {
          const formattedDate = format(value as Date, 'yyyy-MM-dd');
          const isBusy = dates?.dates.includes(concatenateDateAndTime(formattedDate, itm));

          return (
            <div 
              key={index}
              onClick={!isBusy ? () => setTime(itm) : undefined}
              className={`${styles.timedate} ${isBusy ? styles.busy : styles.free} ${itm === time ? styles.clicked: ''}`}
            >
              {itm}
            </div>
          );
        }) : availableTimeWeek.map((itm, index) => {
          const formattedDate = format(value as Date, 'yyyy-MM-dd');
          const isBusy = dates?.dates.includes(concatenateDateAndTime(formattedDate, itm));

          return (
            <div 
              key={index}
              onClick={!isBusy ? () => setTime(itm) : undefined}
              className={`${styles.timedate} ${isBusy ? styles.busy : styles.free} ${itm === time ? styles.clicked: ''}`}
            >
              {itm}
            </div>
          );
        })}
        </div>
        <Button
          className={`${styles.send} text-lg w-full bg-transparent border-2 border-primary ${t("locale.lang") === "ar" ? "font-arabic": "font-landing"}`}
          onClick={handleAddBooking}
        >
          {t('reserve.sectionFive.button')}
        </Button>
    </div>
  )
}
export default PersonalInfo
