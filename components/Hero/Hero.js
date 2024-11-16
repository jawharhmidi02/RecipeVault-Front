import React from 'react'
import './Hero.css';

const Hero = () => {
  return (
    <div className="image py-10 min-[400px]:py-0 px-10 justify-center items-center relative flex h-[700px] w-full flex-col bg-cover bg-center bg-no-repeat">
        <div className="absolute left-0 top-0 z-10 h-[700px] w-full bg-neutral-900 opacity-60"></div>
        <div className="flex z-20 max-w-[1000px] w-full flex-col items-center justify-center gap-6">
          <div className="text-4xl lg:text-6xl text-center font-semibold text-white opacity-95">
            Got a recipe to share? Showcase your culinary skills and inspire
            others to cook delicious, healthy meals!
          </div>
          <div className="text-white font-extralight text-2xl lg:text-4xl text-center opacity-90 tracking-wider">SHARE YOUR RECIPE</div>
          <button
            type="button"
            className=" text-center rounded-lg border-2 border-[var(--theme1)] bg-transparent px-6 md:px-12 py-3 md:py-4 text-xl md:text-3xl  text-[var(--theme1)] transition-all duration-200 hover:scale-110 hover:bg-[var(--theme1)] hover:text-white hover:border-[var(--theme1)]"
          >
            Share
          </button>
        </div>
      </div>
  )
}

export default Hero