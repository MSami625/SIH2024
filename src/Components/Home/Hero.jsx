import React,{useEffect,useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHandshakeAngle } from "react-icons/fa6";
// import image1 from "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725321600&semt=ais_hybrid";
// import image2 from "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725321600&semt=ais_hybrid";
// import image3 from "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725321600&semt=ais_hybrid";
import hero_img1 from "../Assets/hero-img1.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";

function Hero() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is signed in
      } else {
        setIsLoggedIn(false); // User is signed out
      }
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);


  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  const alumniData = {
    // image: [image1, image2, image3],
    alumni: [
      {
        head: `"Perceiving the social impact of public health through a scientific lens"`,
        sub: "Gabby Cook",
        content:
          "Learn about Gabby Cook '23, who blended her studies in neuroscience and public health sciences to give her a more holistic perspective on health and human behavior.",
      },
      {
        head: `"From shy speaker to center stage"`,
        sub: "Annika",
        content:
          "A communications degree took Annika Roe '22 from a hesitant public speaker to a persuasive presence in the classroom, and in her career.",
      },
      {
        head: `"To find fulfillment, this alum first had to find balance"`,
        sub: "Justice Sprigge",
        content:
          "Learn about Justice Spriggs '19, an alum who used his Hamline education to combine his enjoyment of science with his love for connecting with people.",
      },
    ],
  };

  const alumni = alumniData.alumni;
  // const images = alumniData.image;

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center md:justify-normal gap-24 lg:gap-40 px-16 min-h-[80vh]">
      {/* Hero Content */}
      <div className="flex flex-col w-full md:w-[60%] lg:w-[40%] gap-8">
        <p className="w-full text-6xl gap-8 flex flex-col font-bold">
          ALUMNI
          <span className="relative text-4xl font-['Baskervville'] font-bold italic gap-2 flex w-min md:w-auto before:absolute before:w-full before:h-[1px] before:bg-[#9a5bf8] before:-top-4">
            Strengthen Bonds <FaHandshakeAngle className="text-[#9a5bf8]" />
            Build Futures
          </span>
        </p>
        <p className="text-sm lg:text-lg ">
          Our mission is to enhance alumni engagement, support career
          advancement, and foster a culture of giving back. Join our Alumni
          Network today and be the change that shapes tomorrow.
          <span className="block font-bold text-xl mt-2">Welcome aboard!</span>
        </p>
        {!isLoggedIn && (
        <a href="/login" className="flex items-center w-max">
          <div className="duration-300 bg-[#9a5bf8] px-4 py-2 text-white border-[1px] hover:border-black hover:bg-[#bd97f8]">
            Register / Login
          </div>
        </a>
      )}
      </div>

      {/* Success Stories */}
      <div className="hidden md:flex flex-col w-[50%] lg:px-16">
        <Slider {...settings}>
          {alumni.map((alumnus, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center relative"
            >
              <div className="absolute text-white bg-[rgba(0,0,0,0.4)] -bottom-0 -left-0 p-4 w-full backdrop-blur">
                <p className="text-2xl mb-2 border-b-2 border-[rgba(255,255,255,0.4)] pb-2">
                  {alumnus.head}
                </p>
                <p className="text-lg mb-1">{alumnus.sub}</p>
                <p className="text-md text-justify">{alumnus.content}</p>
              </div>
              <img
                src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725321600&semt=ais_hybrid"
                alt=""
                className="w-full h-[70vh] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Hero;
