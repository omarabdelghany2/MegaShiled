import { ReactNode } from "react"

export type User = {
  name: string
  id: string
  role: string
}

export type LoginInfo = {
  email: string
  password: string
}

export interface RegisterInfo extends LoginInfo {
  name: string
}

export type DashboardLinkProps = {
  to: string
  children: ReactNode
  activeKey: string
}

export interface ProductProps {
  name: string
  price: string
  imageFileName: string
  description: string
}

export interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: string
  colors: string[]
  featured: boolean
  freeShiping: boolean
  inventory: number
  averageRating: number
  numOfReviews: number
  user: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export type CloudinaryImage = {
  imageName: string
  message: string
}

export type MainServiceProps = {
  slide: {
    name: string
    arabicName: string
    isAdditional: boolean
  }
}

export type MainService = {
  id: string
  name: string
  arabicName: string
  description: "test here please change me"
  image: string
  isAdditional: boolean
}

export type Service = {
  belongsTo: string
  description: string
  arabicName: string
  name: string
  photo: string
  __v: number
  _id: string
}

export type BookingProps = {
  customerFname: string
  customerLname: string
  customerPhone: string
  services: string[]
  city: string
  date: string
  isCompleted?: string
  carSize: string
}

export interface Booking extends BookingProps {
  _id: string
  __v: number
}

export type AddSubServiceProps = {
  name: string
  description: string
  photo: string
  belongsTo: string
}

export type AddPackageProps = {
  name?: string
  arabicName?: string
  belongTo?: string
  description: string[]
  arabicDescription: string[]
  smallPrice?: number
  bigPrice?: number
  mediumPrice?: number
}

export interface Package extends AddPackageProps {
  _id: string
  __v: number
}


export interface Verfiy {
  token: string
}