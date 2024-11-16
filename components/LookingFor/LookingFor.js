import { toast } from "@/hooks/use-toast";
import React from "react";

const LookingFor = ({ ChangeUrl, loading, signed, user }) => {
  return (
    <div className="my-[70px] flex flex-col items-center justify-center gap-5 bg-white px-[20px] py-[50px] min-[1180px]:flex-row">
      <div>
        <img
          src="/images/LookingFor1.webp"
          alt="line"
          className="h-[400px] w-full max-w-[700px] rounded-lg object-cover shadow-lg drop-shadow-lg min-[1180px]:size-[400px]"
        />
      </div>
      <div className="flex flex-col">
        <div className="mt-6 text-center text-3xl font-semibold text-[var(--theme1)]">
          Are You a Nutrition Specialist?
        </div>
        <div className="my-1 text-center text-2xl font-medium text-neutral-700">
          You can apply here
        </div>
        <div className="mt-2 max-w-[600px] text-center text-neutral-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quo
          corporis, non, tempora sint veniam optio, ab in delectus amet enim
          vitae earum illo repellat laborum sed reprehenderit inventore.
          Dignissimos cum placeat laudantium doloremque impedit officiis eos
          sunt. Aspernatur, unde.
        </div>
        <div className="mb-6 mt-3 flex w-full items-center justify-center">
          <button
            className="w-fit self-center rounded-sm border-2 border-[#ffffff] bg-[var(--theme1)] px-6 py-2 text-xl text-[#ffffff] transition-all duration-200 hover:border-[var(--theme1)] hover:bg-[#ffffff] hover:text-[var(--theme1)] active:scale-95"
            type="button"
            onClick={() => {
              console.log("user");
              console.log(user);
              console.log("signed");
              console.log(signed);
              
              if (signed) {
                if (user.role === "specialist") {
                  toast({
                    description: "You are Already a Specialist!",
                  });
                  return;
                }
                if (user.role === "admin") {
                  toast({
                    description: "You are an Admin!",
                  });
                  return;
                }
                ChangeUrl("/apply-form");
                return;
              }
              toast({
                title: "You must be Registered to Create a Recipe!",
                description: "Please Register to Continue.",
                variant: "default",
              });
              ChangeUrl("/sign-up");
              return;
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              </div>
            ) : (
              "Contact Us"
            )}
          </button>
        </div>
      </div>
      <div>
        <img
          src="/images/LookingFor2.webp"
          alt="line"
          className="h-[400px] w-full max-w-[700px] rounded-lg object-cover shadow-lg drop-shadow-lg min-[1180px]:size-[400px]"
        />
      </div>
    </div>
  );
};

export default LookingFor;