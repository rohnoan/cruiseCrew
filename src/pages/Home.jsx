import React from 'react'
import TextCarousel from '../components/TextCarousel'
import { Link } from 'react-router-dom'
import MyComponent from '../components/MyComponent'
import {ImagaCarouselWithText} from '../components/ImageCarouselWithText'

import c1 from '../../public/cruisers/1.jpg'
import c2 from '../../public/cruisers/2.jpg'
import c3 from '../../public/cruisers/3.jpg'
import c4 from '../../public/cruisers/4.jpg'

import s1 from '../../public/sports/1.jpg'
import s2 from '../../public/sports/2.png'
import s3 from '../../public/sports/3.jpg'
import s4 from '../../public/sports/4.jpg'

import g1 from '../../public/gear/1.jpg'
import g2 from '../../public/gear/2.jpg'
import g3 from '../../public/gear/3.webp'
import g4 from '../../public/gear/4.jpg'
import TestimonialGrid from '../components/Testimonials'


const cruiserImages = [
    {
      src: c1, // Image URL
      alt: "Image 3",
      title: "",
      description: "", // Description for the image
    },
    {
      src: c2,
      alt: "Image 3",
      title: "",
      description: "",
    },
    {
      src: c3,alt: "Image 3",
      title: "",
      description: "",
    },{
      src: c4,alt: "Image 3",
      title: "",
      description: "",
    },
    // Add more slides as needed
  ]
  const sportImages = [
    {
      src: s1, // Image URLalt: "Image 3",
      title: "",
      description: "", // Description for the image
    },
    {
      src: s2,alt: "Image 3",
      title: "",
      description: "",
    },
    {
      src: s3,alt: "Image 3",
      title: "",
      description: "",
    },
    {
      src: s4,alt: "Image 3",
      title: "",
      description: "",
    }
    // Add more slides as needed
  ]
  const gearImages = [
    {
      src: g1, // Image URL
      alt: "Image 1", // Alt text for the image
      title: "Slide 1", // Title of the image
      description: "Description of Slide 1", // Description for the image
    },
    {
      src: g2,
      alt: "Image 2",
      title: "Slide 2",
      description: "Description of Slide 2",
    },
    {
      src: g3,
      alt: "Image 3",
      title: "",
      description: "",
    },{
      src: g4,
      alt: "Image 3",
      title: "Slide 3",
      description: "Description of Slide 3",
    },
    // Add more slides as needed
  ]

export default function Home() {
  return (
    <div className='flex mb-24 font-syne flex-col items-center justify-center'>
      <TextCarousel />
      <div className="flex flex-col sm:flex-row m-4 w-full">
  <button className="border-2 hover:scale-105 rounded-full text-5xl mx-4 sm:mx-24 flex-1 border-black">
    <Link to="/shop" className="w-full h-full flex justify-center items-center text-black">
      BUY
    </Link>
  </button>
  
  <div className='sm:flex text-6xl hidden my-8 justify-center items-center sm:my-4 '>
    /
  </div>
  
  <button className="border-2 hover:scale-105 rounded-full text-5xl mx-4 sm:mx-24 flex-1 border-black">
    <Link to="/shop" className="w-full  h-full flex justify-center items-center text-black">
      RENT
    </Link>
  </button>
</div>
      <div className='font-syne text-6xl my-10 '>
        CHECK OUT OUR CRUISERS!
      </div>
      <ImagaCarouselWithText images={cruiserImages}/>
      <div className='font-syne text-6xl my-10 '>
        CHECK OUT OUR SPORTS BIKES!
      </div>
      <ImagaCarouselWithText images={sportImages}/>
      <div className='font-syne text-5xl my-10'>
        ENTER YOUR LOCATION
      </div>
      <MyComponent/>
      <TestimonialGrid/>
    </div>
  )
}
