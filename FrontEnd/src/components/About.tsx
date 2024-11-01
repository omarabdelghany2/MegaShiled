import { useGetAllMainServicesQuery } from "@/app/api/ServicesApiSlice"
import { API } from "@/utils/server"
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "../components/styles/About.module.scss"
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


const About = () => {
  // Fetch main services
  const { data: mainServices, isSuccess } = useGetAllMainServicesQuery("")

  return (
    <section id="about" className={styles.main}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        className={` ${styles.swiper}`}
        loop
      >
        {isSuccess &&
          mainServices.mainServices.map((item, i) => (
            <SwiperSlide className={styles.slide} key={i}>
              <div className={styles.image}>
                <img src={`${API.media}/slides/${item.image}`} alt={item.name} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}

export default About
