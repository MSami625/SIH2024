import React, { useState } from "react";
import Nav from "../Components/navbar";
import Background from "../Components/background";
import { IoIosArrowBack } from "react-icons/io";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = ({ formType, background }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [selectedAccountType, setSelectedAccountType] = useState(null);

  // Modified handleRegister function to send verification email
  const handleRegister = async (event, name, email, password, type) => {
    event.preventDefault();
    try {
      // Proceed with registration
      await register(name, email, password);
      
      // Send email verification
      await sendEmailVerification(auth.currentUser);
      alert("Registration successful! Please check your inbox to verify your email.");

      setEmail("");
      setName("");
      setPassword("");

      // Optional: Automatically log in user (after verification)
      // handleLogin(event, email, password, type);
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
    } catch (error) {
      throw error;
    }
  };

  // Modified handleLogin function to check if email is verified
  const handleLogin = async (event, email, password) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the email is verified
      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return;
      }

      // Navigate to profile after successful login
      navigate("/Edit_Profile");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const [showResetModal, setShowResetModal] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");

  const handleResetLinkClick = () => {
    setShowResetModal(true);
  };
  const hideModal = () => {
    setShowResetModal(false);
  };

  const handleResetSubmit = async (event, emailForReset) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, emailForReset);
      alert("Password reset email sent!");
      setEmailForReset("");
      setShowResetModal(false);
    } catch (error) {
      // Handle specific error when email doesn't exist
    }
  };

  return (
    <form
      className={`flex flex-col items-center md:justify-center h-full px-6 md:px-10 gap-2 ${background}`}
    >
      <h1 className="font-bold text-4xl mb-4 mt-12">
        {formType === "signIn" ? "Sign In" : "Create Account"}
      </h1>
      {formType === "signUp" ? (
        <>
          <input
            type="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            name="fullName"
            className="bg-[#eee] focus-within:border-black border-2 my-2 px-4 py-3 text-sm rounded-lg w-full transition-all duration-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            className="bg-[#eee] focus-within:border-black border-2 my-2 px-4 py-3 text-sm rounded-lg w-full transition-all duration-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            className="bg-[#eee] focus-within:border-black border-2 my-2 px-4 py-3 text-sm rounded-lg w-full transition-all duration-500"
          />

          <div className="my-2">
            <label className="mr-4">
              <input
                type="radio"
                value="Personal"
                checked={selectedAccountType === "Personal"}
                onChange={() => setSelectedAccountType("Personal")}
                className="mr-2"
              />
              Personal
            </label>
            <label>
              <input
                type="radio"
                value="Business"
                checked={selectedAccountType === "Business"}
                onChange={() => setSelectedAccountType("Business")}
                className="mr-2"
              />
              Business
            </label>
          </div>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            className="bg-[#eee] focus-within:border-black border-2 my-2 px-4 py-3 text-sm rounded-lg w-full transition-all duration-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            className="bg-[#eee] focus-within:border-black border-2 my-2 px-4 py-3 text-sm rounded-lg w-full transition-all duration-500"
          />
        </>
      )}
      {formType === "signIn" && (
        <span
          onClick={handleResetLinkClick}
          className="text-sm hover:underline hover:text-[#512da8] mt-4 cursor-pointer"
        >
          Forgot Your Password?
        </span>
      )}
      {showResetModal && (
        <div className=" fixed flex items-center justify-center h-3/4 md:h-full px-10 gap-2 w-full">
          <button
            className={`absolute top-4 left-14 md:left-4 shadow-[0_0_5px_rgba(0,0,0,.5)] active:shadow-[inset_0_0_5px_rgba(0,0,0,.5)] rounded-xl p-2 active:scale-[.98] bg-[#240046] text-white hover:bg-white hover:text-[#240046]`}
            onClick={hideModal}
          >
            <IoIosArrowBack className="w-6 h-6" />
          </button>
          <div className="bg-white p-8 rounded-md max-w-md w-full h-full flex flex-col items-center md:justify-center gap-8">
            <h2 className="font-bold text-4xl mt-20 md:mt-0 text-center">
              Reset Password
            </h2>
            <form className="flex flex-col items-center w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                className="bg-[#eee] focus-within:border-black border-2 mb-4 px-4 py-3 text-sm rounded-lg w-full transition-all duration-500"
              />
              <button
                type="submit"
                onClick={(event) => handleResetSubmit(event, emailForReset)}
                className={`shadow-[0_0_5px_rgba(0,0,0,.5)] active:shadow-[inset_0_0_5px_rgba(0,0,0,.5)] rounded-xl py-2 px-6 active:scale-[.98] ${`bg-[#240046] text-white hover:bg-white hover:text-[#240046]`}`}
              >
                Send Reset Email
              </button>
            </form>
          </div>
        </div>
      )}
      {formType === "signUp" ? (
        <button
          onClick={(event) =>
            handleRegister(event, name, email, password, selectedAccountType)
          }
          className={`shadow-[0_0_5px_rgba(0,0,0,.5)] active:shadow-[inset_0_0_5px_rgba(0,0,0,.5)] rounded-xl py-2 px-8 mt-8 md:mt-4 active:scale-[.98] ${`bg-[#240046] text-white hover:bg-white hover:text-[#240046]`}`}
        >
          {" "}
          Sign Up
        </button>
      ) : (
        <button
          onClick={(event) => handleLogin(event, email, password)}
          className={`shadow-[0_0_5px_rgba(0,0,0,.5)] active:shadow-[inset_0_0_5px_rgba(0,0,0,.5)] rounded-xl py-2 px-8 mt-8 md:mt-4 active:scale-[.98] ${`bg-[#240046] text-white hover:bg-white hover:text-[#240046]`}`}
        >
          {" "}
          Sign In
        </button>
      )}
    </form>
  );
};

const Login = () => {
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const introData = [
    {
      title: "Welcome Back !",
      description: "Enter your personal details to use all site features",
      buttonText: "Sign In",
      id: "login",
    },
    {
      title: "New Here !",
      description: "Register with your details to use all site features",
      buttonText: "Sign Up",
      id: "register",
    },
  ];

  const navbarData = {
    navbarData: {
      logoText: "FusionX",
      navItems: [
        { text: "Home", link: "/" },
        { text: "Engage", link: "/Engage" },
        { text: "Network", link: "/" },
        { text: "Events", link: "/Events" },
        { text: "Directory", link: "/Directory" },
        { text: "Forum", link: "/Forum" },
        // Add more navigation items as needed
      ],
    },
  };

  return (
    <div className={`flex flex-col items-center h-screen bg-[#f2ebfb]`}>
      {/* Background */}
      <div className="fixed h-screen w-screen">
        <Background />
      </div>

      <Nav navbarData={navbarData.navbarData} />
      <div
        className={`flex flex-col md:flex-row items-center w-5/6 md:w-2/3 max-w-full h-3/4 mt-16 relative overflow-hidden rounded-xl bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)]`}
        id="container"
      >
        {/* Small-Screen */}
        <div
          className={`lg:hidden bg-white flex flex-col items-center justify-center absolute h-[99.7%] w-[99%] rounded-t-xl transition-all duration-300 ${
            clicked ? "bottom-full" : "bottom-0"
          }`}
        >
          <AuthForm
            formType="signIn"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            background={`bg-white w-full`}
          />
        </div>
        {introData.map((item, index) => (
          <div
            key={index}
            className={`md:hidden absolute w-full h-max text-center text-white bg-[#240046] flex flex-col items-center justify-center gap-2 transition-all duration-300 px-6 py-2 z-[2] ${
              item.title !== "Welcome Back !"
                ? clicked
                  ? "bottom-full"
                  : "bottom-0"
                : clicked
                ? "top-0"
                : "top-full"
            }`}
          >
            <h1 className="font-bold text-2xl">{item.title}</h1>
            <p>{item.description}</p>
            <button
              className={`shadow-[0_0_5px_rgba(255,255,255,.5)] active:shadow-[inset_0_0_5px_rgba(255,255,255,.5)] hover:text-white rounded-xl py-2 px-8 mt- hover:bg-[#240046] bg-white text-[#240046] active:scale-[.98]`}
              onClick={() => setClicked(!clicked)}
            >
              {item.buttonText}
            </button>
          </div>
        ))}
        <div
          className={`lg:hidden bg-white flex flex-col items-center justify-center absolute h-[99.7%] w-[99%] rounded-b-xl transition-all duration-300 ${
            clicked ? "top-0" : "top-full"
          }`}
        >
          <AuthForm
            formType="signUp"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            background={`w-full justify-center mt-36`}
          />
        </div>

        {/* Large-Screen */}
        <div
          className={`hidden lg:block h-full transition-all duration-300 w-1/2 bg-white ${
            clicked ? "translate-x-1/2 z-[1] invisible" : "translate-x-0 z-[1]"
          }`}
        >
          <AuthForm
            formType="signIn"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <div
          className={`hidden lg:block h-full transition-all duration-300 w-1/2 bg-white ${
            clicked ? "translate-x-0 z-[2]" : "-translate-x-1/2 z-[0] invisible"
          }`}
        >
          <AuthForm
            formType="signUp"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* info-Cont */}
        <div
          className={`hidden md:block absolute w-[51%] h-full overflow-hidden transition-all duration-300 z-[10] top-0 ${
            clicked
              ? "-translate-x-full rounded-[0_150px_100px_0] left-[51%]"
              : "rounded-[150px_0_0_100px] left-[49%]"
          }`}
        >
          <div
            className={`h-full text-white bg-[#240046] relative w-[200%] transition-all duration-500 -left-full ${
              clicked ? "translate-x-1/2" : ""
            }`}
          >
            {introData.map((item) => (
              <div
                key={item.id}
                className={`absolute w-1/2 h-full flex flex-col items-center justify-center gap-2 translate-x-0 transition-all duration-500 px-8 py-0 top-0 ${
                  item.title !== "New Here !"
                    ? clicked
                      ? "translate-x-0 left-0"
                      : "-translate-x-full left-0"
                    : clicked
                    ? "translate-x-full right-0"
                    : "translate-x-0 right-0"
                }`}
              >
                <h1 className="font-bold text-4xl">{item.title}</h1>
                <p>{item.description}</p>
                <button
                  className={`shadow-[0_0_5px_rgba(255,255,255,.5)] active:shadow-[inset_0_0_5px_rgba(255,255,255,.5)] hover:text-white rounded-xl py-2 px-8 mt-8 hover:bg-[#240046] bg-white text-[#240046] active:scale-[.98]`}
                  onClick={() => setClicked(!clicked)}
                  id={item.id}
                >
                  {item.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
