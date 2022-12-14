import Head from 'next/head'
import Image from 'next/image'
import { AiOutlineSmile } from 'react-icons/ai'

export default function Home() {
  return (
    <div>
      <div className='flex justify-center items-center flex-col gap-2 w-full h-screen bg-center bg-no-repeat bg-cover '>
          <AiOutlineSmile size={100} color="#ffce00" />
          <h3 className='text-center font-bold text-5xl text-gray-900'>¡Buen dia!</h3>
          <p className='text-center font-bold text-xl text-gray-900'>Bienvenido a tu admin dashboard</p>
      </div>
    </div>
  )
}
