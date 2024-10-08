import useCarousel from "@/hooks/useCarousel"
import DotsGroup from "./DotsGroup"
import { useEffect, useMemo, useState } from "react"
import { Button } from "./ui/button"
import { MoreDialog } from "."
import { Link } from "react-router-dom"
import { useGetAllMainServicesQuery } from "@/app/api/ServicesApiSlice"

const About = () => {
  const [percentage, setPercentage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState("")

  const { data: mainServices } =
    useGetAllMainServicesQuery("")

  useEffect(() => {
    const interval = setInterval(() => {
      if (percentage < 100) {
        setPercentage(prev => prev + 1)
      } else {
        setPercentage(0)
      }
    }, 40)

    return () => {
      clearInterval(interval)
    }
  }, [mainServices])

  const { page, next, go } = useCarousel({
    time: 5000,
    pages: mainServices?.count!,
    autoPlay: true,
  })

  useEffect(() => {
    setPercentage(0)
  }, [page])

  const count = useMemo(
    () => (mainServices ? mainServices.count : 3),
    [mainServices]
  )

  return (
    <section
      id="about"
      className="cut-viewport overflow-hidden relative"
    >
      <div
        onClick={() => {
          next()
          setPercentage(0)
        }}
        className="absolute z-[60] top-5 left-1/2 -translate-x-1/2 w-14 cursor-pointer flex flex-col justify-center items-center gap-1 rotate-180"
      >
        <svg
          width="40"
          height="15"
          viewBox="0 0 40 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arrow"
        >
          <path
            d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
            fill="#fff"
          ></path>
        </svg>
        <svg
          width="40"
          height="15"
          viewBox="0 0 40 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arrow"
        >
          <path
            style={{ animationDelay: "0.5s" }}
            d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
            fill="#fff"
          ></path>
        </svg>
      </div>

      {mainServices &&
        mainServices.mainServices.map((item, i) => (
          <Slide
            isOpen={isOpen}
            setContent={setContent}
            img={item.photo}
            pageNumber={i! + 1}
            currentPageNumber={page}
            description={item.description}
            key={i}
            title={item.name}
            setIsOpen={setIsOpen}
          />
        ))}
      <div className="absolute z-[40] bottom-5 left-1/2 -translate-x-1/2">
        <DotsGroup
          count={count}
          page={page}
          percentage={percentage}
          go={go}
          setPercentage={setPercentage}
        />
      </div>
      <MoreDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={content}
      />
    </section>
  )
}

export default About

type SlideProps = {
  pageNumber: number
  img: string
  currentPageNumber: number
  title: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  setContent: React.Dispatch<React.SetStateAction<string>>
  description: string
}

const Slide = ({
  pageNumber,
  currentPageNumber,
  img,
  title,
  setIsOpen,
  setContent,
  description,
  isOpen,
}: SlideProps) => {
  useEffect(() => {
    if (pageNumber === currentPageNumber && !isOpen)
      setContent(description)
  }, [currentPageNumber, isOpen])
  return (
    <div
      style={{ backgroundImage: `url("${img}")` }}
      className={`absolute w-full h-full z-40 bg-cover bg-center bg-no-repeat flex items-center justify-center
      ${
        pageNumber === currentPageNumber
          ? "bottom-0"
          : "-bottom-full delay-500"
      }
      transition-all duration-500`}
    >
      <div className="inset-0 absolute bg-black/40" />
      <div className="relative w-full h-full flex items-center justify-center z-50">
        <div className="text-center">
          <span className="font-arabic text-lg text-primary mx-auto w-fit block">
            خدمة
          </span>
          <h1 className=" font-arabic text-5xl font-bold mx-auto w-fit block sm:my-4 my-5 h-[80px]">
            {title}
          </h1>

          <div className="flex items-center gap-7 justify-center">
            <Link to={"/service"}>
              <Button
                className={`font-arabic text-lg transition-all hover:text-primary hover:scale-125 relative group flex h-[65px] w-[150px]`}
              >
                <div className="inset-0 absolute bg-black/40 hidden group-hover:block" />
                <span className="z-50 text-2xl font-arabic">
                  أحجز الآن
                </span>
              </Button>
            </Link>
            <Button
              className="px-5 py-[7px] rounded-lg bg-orange-400 transition-all hover:text-primary hover:scale-125 relative group flex text-2xl font-arabic h-[65px] w-[150px]"
              onClick={() => setIsOpen(prev => !prev)}
            >
              المزيد
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
