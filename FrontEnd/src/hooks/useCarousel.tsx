import { useEffect, useState } from "react"

const useCarousel = ({
  time,
  pages,
  autoPlay,
}: {
  time: number
  pages: number
  autoPlay: boolean
}) => {
  const [page, setPage] = useState(1)

  // const canScrollNext = page < pages
  // const canScrollPrev = page > 1

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (autoPlay) {
      interval = setInterval(() => {
        setPage(prevPage => (prevPage < pages ? prevPage + 1 : 1))
      }, time)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoPlay, time, pages])

  function next() {
    setPage(prev => (prev < pages ? prev + 1 : 1))
  }

  function prev() {
    setPage(prev => (prev > 1 ? prev - 1 : pages))
  }

  function go(num: number) {
    setPage(num)
  }

  return {
    page,
    next,
    prev,
    go,
  }
}

export default useCarousel
