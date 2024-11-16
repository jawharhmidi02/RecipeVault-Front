import { cn } from "@/lib/utils";
import React from "react";
import RequestCard from "../RequestCard/RequestCard";

const ApplicationRequests = ({ user }) => {
  const requests = [
    // {
    //   id: 1234567,
    //   fullName: "Lafi Raed",
    //   email: "lafiraed04@gmail.com",
    //   telephone: "56 620 075",
    //   reason:
    //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate dolores sed obcaecati illum vitae fuga tempora voluptatibus dolore ipsa porro est ratione fugit? Corrupti optio nihil quisquam voluptatum consequuntur.",
    //   resume: "/images/RaedLafiResume.pdf",
    // },
    // {
    //   id: 1234567,
    //   fullName: "Lafi Raed",
    //   email: "lafiraed04@gmail.com",
    //   telephone: "56 620 075",
    //   reason:
    //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate dolores sed obcaecati illum vitae fuga tempora voluptatibus dolore ipsa porro est ratione fugit? Corrupti optio nihil quisquam voluptatum consequuntur.",
    //   resume: "/images/RaedLafiResume.pdf",
    // },
    // {
    //   id: 1234567,
    //   fullName: "Lafi Raed",
    //   email: "lafiraed04@gmail.com",
    //   telephone: "56 620 075",
    //   reason:
    //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate dolores sed obcaecati illum vitae fuga tempora voluptatibus dolore ipsa porro est ratione fugit? Corrupti optio nihil quisquam voluptatum consequuntur.",
    //   resume: "/images/RaedLafiResume.pdf",
    // },
    // {
    //   id: 1234567,
    //   fullName: "Lafi Raed",
    //   email: "lafiraed04@gmail.com",
    //   telephone: "56 620 075",
    //   reason:
    //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate dolores sed obcaecati illum vitae fuga tempora voluptatibus dolore ipsa porro est ratione fugit? Corrupti optio nihil quisquam voluptatum consequuntur.",
    //   resume: "/images/RaedLafiResume.pdf",
    // },
  ];
  return (
    <div className={cn("grid w-full gap-6 min-[750px]:grid-cols-2")}>
      {requests.length == 0 ? (
        <div className="col-span-full flex w-full flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="#262626"
                className="bi bi-slash-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
              </svg>
            </div>
            <div className="text-2xl font-semibold text-neutral-800">
              No Requests Found 
            </div>
          </div>
        </div>
      ) : (
        <>
          {requests.map((request, index) => (
            <RequestCard request={request} key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default ApplicationRequests;
