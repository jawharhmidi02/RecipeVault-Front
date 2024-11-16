import React from "react";

const RequestCard = ({ request }) => {
  const acceptRequest = () => {

  }

  const rejectRequest = () => {

  }

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-5 py-5 min-[500px]:px-8 min-[500px]:py-8 shadow-md">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          FULL NAME
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">
          {request.fullName}
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
        <div className="w-fit rounded-lg bg-zinc-100 p-2">{request.reason}</div>
      </div>
      <div className="flex w-full">
        <a href={request.resume} download className="w-full text-center py-3 rounded-lg bg-slate-400 text-[#ffffff] font-semibold transition-all duration-200 border-2 border-transparent hover:cursor-pointer hover:border-slate-400 hover:bg-slate-100 hover:text-[#9094ac]">Download Resume</a>
      </div>
      <div className="flex flex-col min-[450px]:flex-row w-full gap-2">
        <button
          onClick={()=>{rejectRequest()}}
          type="button"
          className="rounded-lg border-2 border-transparent w-full bg-rose-600 px-4 py-2 text-xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer hover:border-rose-600 hover:bg-rose-100 hover:text-rose-600"
        >
          Reject
        </button>
        <button
          onClick={()=>{acceptRequest()}}
          type="button"
          className="rounded-lg border-2 w-full border-transparent bg-emerald-500 px-4 py-2 text-xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer hover:border-emerald-500 hover:bg-emerald-100 hover:text-emerald-500"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
