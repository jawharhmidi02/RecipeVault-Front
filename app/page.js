import Hero from "@/components/Hero/Hero";
import "./page.css";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import LookingFor from "@/components/LookingFor/LookingFor";
export default function Home() {
  return (
    <div className="mx-auto flex w-full flex-col">
      <Hero/>
      <HowItWorks/>
      <LookingFor/>
    </div>
  );
}
