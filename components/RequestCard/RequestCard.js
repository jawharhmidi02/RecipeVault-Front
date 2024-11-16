import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

const RequestCard = ({ request, fetchRequests }) => {
  const [loadingAnswer, setloadingAnswer] = useState(false);

  const acceptRequest = async () => {
    setloadingAnswer(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${request.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("access_token"),
          },
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      if (fetchRequests) {
        fetchRequests();
      }
      setloadingAnswer(false);
      toast({
        title: "Success",
        description: "Request Accepted Successfully!",
      });
    } catch (error) {
      console.log(error);
      setloadingAnswer(false);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
    }
    setloadingAnswer(false);
  };

  const rejectRequest = async () => {
    setloadingAnswer(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${request.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("access_token"),
          },
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      if (fetchRequests) {
        fetchRequests();
      }
      setloadingAnswer(false);
      toast({
        title: "Success",
        description: "Request Rejected Successfully!",
      });
    } catch (error) {
      console.log(error);
      setloadingAnswer(false);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
    }
    setloadingAnswer(false);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-5 py-5 shadow-md min-[500px]:px-8 min-[500px]:py-8">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          FULL NAME
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">
          {request.full_name}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          EMAIL
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">{request.email}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          TELEPHONE
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">
          {request.telephone}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          APPLICATION REASON
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">
          {request.description}
        </div>
      </div>
      <div className="flex w-full">
        <a
          href={request.cv_pdf}
          download
          className={cn(
            "w-full rounded-lg border-2 border-transparent bg-slate-400 py-3 text-center font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer hover:border-slate-400 hover:bg-slate-100 hover:text-[#9094ac]",
            loadingAnswer && "pointer-events-none hover:cursor-not-allowed",
          )}
        >
          {loadingAnswer ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          ) : (
            "Download Resume"
          )}
        </a>
      </div>
      <div className="flex w-full flex-col gap-2 min-[450px]:flex-row">
        <button
          onClick={() => {
            rejectRequest();
          }}
          type="button"
          disabled={loadingAnswer}
          className={cn(
            "w-full rounded-lg border-2 border-transparent bg-rose-600 px-4 py-2 text-xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer hover:border-rose-600 hover:bg-rose-100 hover:text-rose-600",
            loadingAnswer && "pointer-events-none hover:cursor-not-allowed",
          )}
        >
          {loadingAnswer ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          ) : (
            "Reject"
          )}
        </button>
        <button
          onClick={() => {
            acceptRequest();
          }}
          type="button"
          disabled={loadingAnswer}
          className={cn(
            "w-full rounded-lg border-2 border-transparent bg-emerald-500 px-4 py-2 text-xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer hover:border-emerald-500 hover:bg-emerald-100 hover:text-emerald-500",
            loadingAnswer && "pointer-events-none hover:cursor-not-allowed",
          )}
        >
          {loadingAnswer ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          ) : (
            "Accept"
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
