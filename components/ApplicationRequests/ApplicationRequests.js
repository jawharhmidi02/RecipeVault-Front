import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import RequestCard from "../RequestCard/RequestCard";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import SkeletonRequestCard from "../RequestCard/SkeletonRequestCard";

const ApplicationRequests = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [Loadingrequests, setLoadingRequests] = useState(true);

  // const requests = [
  //   {
  //     id: 1234567,
  //     full_name: "Lafi Raed",
  //     email: "lafiraed04@gmail.com",
  //     telephone: "56 620 075",
  //     description:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate dolores sed obcaecati illum vitae fuga tempora voluptatibus dolore ipsa porro est ratione fugit? Corrupti optio nihil quisquam voluptatum consequuntur.",
  //     cv_pdf: "/images/RaedLafiResume.pdf",
  //   },
  //   {
  //     id: 1234567,
  //     full_name: "Lafi Raed",
  //     email: "lafiraed04@gmail.com",
  //     telephone: "56 620 075",
  //     description:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate dolores sed obcaecati illum vitae fuga tempora voluptatibus dolore ipsa porro est ratione fugit? Corrupti optio nihil quisquam voluptatum consequuntur.",
  //     cv_pdf: "/images/RaedLafiResume.pdf",
  //   },
  //   {
  //     id: 1234567,
  //     full_name: "Lafi Raed",
  //     email: "lafiraed04@gmail.com",
  //     telephone: "56 620 075",
  //     description:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate dolores sed obcaecati illum vitae fuga tempora voluptatibus dolore ipsa porro est ratione fugit? Corrupti optio nihil quisquam voluptatum consequuntur.",
  //     cv_pdf: "/images/RaedLafiResume.pdf",
  //   },
  //   {
  //     id: 1234567,
  //     full_name: "Lafi Raed",
  //     email: "lafiraed04@gmail.com",
  //     telephone: "56 620 075",
  //     description:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cupiditate dolores sed obcaecati illum vitae fuga tempora voluptatibus dolore ipsa porro est ratione fugit? Corrupti optio nihil quisquam voluptatum consequuntur.",
  //     cv_pdf: "/images/RaedLafiResume.pdf",
  //   },
  // ];

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: Cookies.get("access_token"),
        },
      });

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      if (data.statusCode === 401) {
        toast({
          title: "Error",
          description: "Please Login Again!",
          variant: "destructive",
        });
        setLoadingRequests(false);
        return;
      }
      setLoadingRequests(false);
      setRequests(data.data);
    } catch (error) {
      setLoadingRequests(false);

      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
    }
    setLoadingRequests(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <div className={cn("grid w-full gap-6 min-[750px]:grid-cols-2")}>
      {Loadingrequests ? (
        Array.from({ length: 4 }).map((_, index) => (
          <SkeletonRequestCard key={index} />
        ))
      ) : requests.length == 0 ? (
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
            <RequestCard
              request={request}
              key={index}
              fetchRequests={() => {
                fetchRequests();
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ApplicationRequests;
