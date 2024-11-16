import React, { useState } from 'react'
import useFetchData from '../../Hooks/useFetchData'
import { BASE_URL } from '../../config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import Tabs from './Tabs'
import { PiWarningCircleFill } from "react-icons/pi";
import Overview from './Overview'
import Appointments from './Appointments'
import Profile from './Profile'

const Dashboard = () => {
  const {data,loading,error} = useFetchData(`${BASE_URL}/doctors/profile/me`)
  console.log(data);
  const [tab,setTab] = useState('overview')
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto ">
        {loading && !error && <Loading/>}
        {error && !loading && <Error/>}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[40px]">
            <Tabs tab={tab} setTab={setTab}/>
            <div className="lg:col-span-2  rounded-md py-6 px-7 mt-16 lg:mt-0">
              {data.isApproved==='pending' && (
                <div className="flex p-3 mb-16 mt-2 text-yellow-800 bg-yellow-50 rounded-lg">
                  <span className=''><PiWarningCircleFill size={25} /></span>
                  <div className="ml-3 font-medium text-sm">To get approval please complete your profile. We&apos;ll review manually and approve within 3 working days</div>
                </div>
              )}
              <div className="mt-2">
                {tab==='overview' && <Overview data={data}/>}
                {tab==='appointments' && <Appointments data={data?.appointments} />}
                {tab==='settings' && <Profile doctorData={data} tab={tab} setTab={setTab}/>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard