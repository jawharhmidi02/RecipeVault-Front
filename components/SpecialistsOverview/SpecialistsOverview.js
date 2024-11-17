import React from 'react'
import SpecialistCard from '../SpecialistCard/SpecialistCard'

const SpecialistsOverview = () => {

    const specialists = [
        {
            fullName: "Lafi Raed",
            email: "lafiraed04@gmail.com",
            accepted: 5,
            rejected: 10,
            telephone: "56 620 075"
        },
        {
            fullName: "Lafi Raed",
            email: "lafiraed04@gmail.com",
            accepted: 5,
            rejected: 10,
            telephone: "56 620 075"
        },
        {
            fullName: "Lafi Raed",
            email: "lafiraed04@gmail.com",
            accepted: 5,
            rejected: 10,
            telephone: "56 620 075"
        },
        {
            fullName: "Lafi Raed",
            email: "lafiraed04@gmail.com",
            accepted: 5,
            rejected: 10,
            telephone: "56 620 075"
        },
        {
            fullName: "Lafi Raed",
            email: "lafiraed04@gmail.com",
            accepted: 5,
            rejected: 10,
            telephone: "56 620 075"
        },
        {
            fullName: "Lafi Raed",
            email: "lafiraed04@gmail.com",
            accepted: 5,
            rejected: 10,
            telephone: "56 620 075"
        },
        {
            fullName: "Lafi Raed",
            email: "lafiraed04@gmail.com",
            accepted: 5,
            rejected: 10,
            telephone: "56 620 075"
        },
        {
            fullName: "Lafi Raed",
            email: "lafiraed04@gmail.com",
            accepted: 5,
            rejected: 10,
            telephone: "56 620 075"
        },

    ]
  return (
    <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2">
      {specialists.map((specialist, index) => (
        <SpecialistCard specialist={specialist} key={index}/>
      ))}
    </div>
  )
}

export default SpecialistsOverview
