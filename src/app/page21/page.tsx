/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Page = () => {
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center p-4 overflow-hidden">
      <img
        src="/coding.jpg"
        alt="Coding Background"
        className="absolute w-full h-full object-cover z-0 opacity-20"
      />
      <div className="relative z-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 w-full max-w-2xl flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-amber-600 mb-4">QR Code 11</h1>
        <p className="text-sm md:text-lg text-gray-700 mb-6">
        You’ve unlocked the path to moksha... just kidding, it’s a text file full of bugs.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg w-full">
          <code className="text-xs md:text-base text-gray-800 break-words">
          File path://mythical_drive/404_salvation_not_found.txt
          </code>
        </div>
      </div>
    </div>
  )
}

export default Page
