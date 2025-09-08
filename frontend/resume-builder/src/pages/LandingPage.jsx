import { Button } from "@/components/modern-ui/button";
import resume from "../assets/resume.png";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import ProfileInfoCard from "@/cards/ProfileInfoCard";
import { useContext } from "react";
import { UserContext } from "@/context/useContext";

const LandingPage = () => {

  const {user} = useContext(UserContext)

console.log("There is no User" , user)

  const cardData = [
    {
      title: 'Easy Editing',
      content: 'Update your resume section with live preview and formating'
  
    },

    {
    title: 'Beautiful Templates',
    content: 'Choose from modern , professional templates that are easy to customise'

  },
  {
    title: 'One-Click Support',
    content: 'Download your resume instantly as a high quality PDF with one click'

  },
]
  return (
    <div className="bg-black w-full h-full p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 ">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="text-xl sm:text-2xl font-bold text-white">
          Resume Builder
        </div>
        {user ? (
          <ProfileInfoCard />
        ): (
        <div>
          <Link to="/login">
          <Button className="bg-pink-400 hover:bg-pink-500 text-sm sm:text-base px-4 py-2">
            Login / Sign up
          </Button>
                  

          </Link>
        </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between mt-8 sm:mt-12 md:mt-8 gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="text-white text-center lg:text-left flex-1 max-w-2xl lg:max-w-none">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl leading-tight">
            Build Your{" "}
            <span className="bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
              Resume Effortlessly
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Craft a standout resume in minutes with our smart and intuitive
            resume builder
          </p>
          <Link to= "/login">
          <Button className="mt-8 sm:mt-12 md:mt-16 lg:mt-16 h-10 sm:h-12 w-32 sm:w-36 text-sm sm:text-md bg-pink-400 hover:bg-pink-500">
            Get Started
          </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex-1 max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <img 
            src={resume} 
            alt="Resume image" 
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      <div >

      <h3 className="text-white text-center font-bold lg:text-2xl md:text-xl sm:text-lg 
      xs: text-md  mt-12">Features That make you shine </h3>
      <div className="flex items-center justify-center space-x-4 mt-8 flex-wrap">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            content={card.content}
          />
        ))}
      </div>

      </div>
    </div>
  );
};

export default LandingPage;