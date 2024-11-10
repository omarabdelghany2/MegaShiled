import { Description } from "@/components"
import { insuranceTerms } from "@/constants"

const Insurance = () => {
  return (
    <div className=" h-[100vh] bg-black">
     
       <div className="absolute bg-slate-400/20 backdrop-blur-md inset-0 z-30 	"></div>
      <div
        className="absolute h-52 aspect-square flex place-items-center justify-center text-center text-5xl text-primary font-bold rounded-full border-4 z-40 border-solid border-primary
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        Coming <br /> Soon
      </div>
      <Description
        title="شروط الضمان"
        content={insuranceTerms}
      />
    </div>
  )
}
export default Insurance
