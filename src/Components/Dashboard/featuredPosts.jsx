import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Set the app element for accessibility
Modal.setAppElement("#root");

const FeaturedPosts = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: false,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", formData);
    setModalIsOpen(false);
  };

  const slides = [
    {
      id: 1,
      headline:
        "From Graduate to Global Leader: An Inspiring Journey of Riya Sharma",
      description:
        "Riya Sharma, a 2010 graduate, has scaled great heights as the Vice President of XYZ Corp. Her innovative thinking and leadership have driven major business transformations, impacting millions globally.",
    },
    {
      id: 2,
      headline: "Engineering Success: Ankit Desai’s Path to Innovation",
      description:
        "Ankit Desai, a 2015 alumni, has revolutionized sustainable energy solutions. His startup has received multiple accolades for creating affordable solar technologies that power underdeveloped communities.",
    },
    {
      id: 3,
      headline:
        "Building the Future: Akash Patel’s Contribution to Smart Cities",
      description:
        "Akash Patel, a 2012 graduate, plays a crucial role in shaping urban development with his work on smart city technologies. His cutting-edge designs have reshaped urban infrastructure globally.",
    },
    {
      id: 4,
      headline: "Entrepreneurial Excellence: Neha Verma’s E-commerce Empire",
      description:
        "Neha Verma, class of 2016, founded one of India’s fastest-growing e-commerce platforms. Her platform has empowered local artisans and women entrepreneurs, gaining international attention.",
    },
    {
      id: 5,
      headline:
        "A Vision for Change: Ravi Mehta’s Journey in Social Entrepreneurship",
      description:
        "Ravi Mehta, a 2014 graduate, is the founder of a non-profit organization that provides education to underprivileged children. His work has transformed the lives of over 20,000 students.",
    },
    {
      id: 6,
      headline:
        "Leading with Innovation: Priya Kaur’s Impact in AI and Robotics",
      description:
        "Priya Kaur, class of 2018, is a renowned AI researcher whose work in robotics is driving the future of automation. Her innovations are shaping industries from healthcare to manufacturing.",
    },
    {
      id: 7,
      headline:
        "Empowering Communities: Varun Gupta’s Work in Rural Development",
      description:
        "Varun Gupta, a 2011 graduate, has dedicated his career to rural development, focusing on clean water initiatives and agricultural sustainability. His efforts have improved the quality of life for thousands.",
    },
    {
      id: 8,
      headline: "Tech for Good: Sanjana Iyer’s Contributions to Cybersecurity",
      description:
        "Sanjana Iyer, a 2017 graduate, is making waves in the tech world with her groundbreaking work in cybersecurity. Her expertise is crucial in protecting organizations from global cyber threats.",
    },
  ];

  return (
    <div className="text-center font-bold text-xl">
      <div className="relative flex flex-col items-end p-4">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-3xl text-[rgb(77,47,121)]">Featured Posts</h1>
          <button
            onClick={() => setModalIsOpen(true)}
            className="top-4 right-4 px-4 py-2 bg-[rgb(77,47,121)] text-white rounded-lg duration-300 hover:border-[rgb(77,47,121)] border-2 hover:bg-white hover:text-[rgb(77,47,121)] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            New Post
          </button>
        </div>

        <div className="w-full max-w-6xl overflow-hidden">
          {/* Carousel Container */}
          <Slider {...settings}>
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="p-4 bg-white mt-4 shadow-[0_0_10px_rgba(77,47,121,0.5)] text-[rgb(77,47,121)] rounded-lg focus:outline-none mx-2"
              >
                <h3 className="text-lg font-semibold">{slide.headline}</h3>
                <p className="text-gray-600 text-sm">{slide.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Modal for Adding New Post */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add New Post"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Post Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {/* Styles for the modal */}
      <style jsx>{`
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 500px;
          padding: 20px;
          background: white;
          border-radius: 8px;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default FeaturedPosts;
