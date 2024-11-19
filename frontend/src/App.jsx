import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Notifications from './pages/Notification'
import MedicalHistory from './pages/MedicalHistory'
import WorkSchedule from './pages/WorkSchedule'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mx-4 sm:mx-[10%]">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/account' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/medical-history' element={<MedicalHistory />} />
          <Route path='/work-schedule' element={<WorkSchedule />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
