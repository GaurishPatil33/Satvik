"use client"
import { getCurrentUser } from '@/src/services/auth.service'
import { useAuthStore } from '@/src/store/auth.store'
import { IUser } from '@/src/types/user-types'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

const tabs = ["Profile", "Orders", "Help & Support", "Logout"];

const page = () => {

  const [activeTab, setactiveTab] = useState("profile")
  const router = useRouter()
  // const [user, setUser] = useState<IUser>()
  const { user } = useAuthStore()
  // const fetchUser = async () => {
  //   try {
  //     const user = await getCurrentUser()
  //     setUser(user)
  //   } catch (err) { console.log(err) }
  // }
  // useEffect(() => {
  //   fetchUser()
  // }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <div className=" ">
          <div className=" px-2 py-3 border-forest-700 ">
            <div className="flex justify-between">
              <p className='text-gray-600'>Name</p>
              <p className='text-forest-800'>{user?.first_name + " " + user?.last_name}</p>
            </div>
            <div className="flex justify-between">
              <p className='text-gray-600'>Email</p>
              <p className='text-forest-800'>{user?.email}</p>
            </div>
            <div className="flex justify-between">
              <p className='text-gray-600'>Mobile no. </p>
              <p className='text-forest-800'>{user?.phone}</p>
            </div>
          </div>
        </div>
      case "orders":
        return <div className=""></div>
      case "support":
        return <div className=""></div>
      case "logout":
        return <div className=""></div>
      default: return
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Header */}
      <header className="bg-white border-b border-cream-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className=" h-16" alt="" />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/")}
            className="text-xs font-dm font-semibold text-earth-400 hover:text-forest-500 transition-colors">
            ← {"Back to Store"}
          </button>
        </div>
      </header>


      {/* main */}
      <div className="flex md:flex-col">
        <div className=""></div>
        <div className="">{renderContent()}</div>
      </div>
    </div>
  )
}

export default page
