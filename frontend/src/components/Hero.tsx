import hero from "@/assets/Hero1.png"

 const Hero = () => {
  return (
    <div>
        <img src={hero} alt="Buger Image "  className="w-full max-h-[470px] bg-red-500 object-cover"/>
    </div>
  )
}

export default Hero;
