/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Page = () => {
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center p-4 overflow-hidden">
      <img
        src="/coding.jpg"
        alt="Coding Background"
        className="absolute w-full h-full object-cover z-0 opacity-100"
      />
      <div className="relative z-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 w-full max-w-2xl flex flex-col items-center text-center">
      <h1 className="text-xl font-extrabold bg-gradient-to-r from-yellow-500 to-amber-300 text-transparent bg-clip-text">
  BRAHMA&apos;S DEVSCRIPT
</h1>

        <h1 className="text-4xl md:text-6xl font-extrabold text-amber-600 mb-4">QR Code 14</h1>
        <p className="text-sm md:text-lg text-gray-700 mb-6">
          Access the debugging file from the specified file path below.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg w-full">
          <code className="text-xs md:text-base text-gray-800 break-words">
            File path://Desktop/Coding/Agni_Pariksha/debugging.txt
          </code>
        </div>
      </div>
    </div>
  )
}

export default Page
