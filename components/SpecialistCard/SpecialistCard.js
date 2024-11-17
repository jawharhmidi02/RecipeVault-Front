import React from "react";

const SpecialistCard = ({ specialist }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white px-8 py-6 shadow-md">
      <div className="flex flex-col gap-1 group">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          FULLNAME
        </div>
        <div className="rounded-lg  p-2 text-lg transition-all duration-200 md:group-hover:bg-zinc-100 ">
          {specialist.fullName}
        </div>
      </div>
      <div className="flex flex-col gap-1 group">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          EMAIL
        </div>
        <div className="rounded-lg  p-2 text-lg transition-all duration-200 md:group-hover:bg-zinc-100">
          {specialist.email}
        </div>
      </div>
      <div className="flex flex-col gap-1 group">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          TELEPHONE
        </div>
        <div className="rounded-lg  p-2 text-lg transition-all duration-200 md:group-hover:bg-zinc-100">
          {specialist.telephone}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2">
        <div className="flex flex-col gap-1 group">
          <div className="text-sm font-light tracking-wider text-emerald-500">
            RECIPES ACCEPTED
          </div>
          <div className="rounded-lg  p-2 text-lg transition-all duration-200 md:group-hover:bg-emerald-100">
            {specialist.accepted}
          </div>
        </div>
        <div className="flex flex-col gap-1 group">
          <div className="text-sm font-light tracking-wider text-rose-500">
            RECIPES REJECTED
          </div>
          <div className="rounded-lg  p-2 text-lg transition-all duration-200 md:group-hover:bg-rose-100">
            {specialist.rejected}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistCard;
