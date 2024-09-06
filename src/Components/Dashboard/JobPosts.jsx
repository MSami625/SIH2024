import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal"; // Import Modal
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Modal.setAppElement("#root");

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const JobPosts = () => {
  // Dummy data for job posts
  const jobPosts = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "San Francisco",
      salary: "$120k",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Amazon",
      location: "Seattle",
      salary: "$110k",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Microsoft",
      location: "Redmond",
      salary: "$130k",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Netflix",
      location: "Los Angeles",
      salary: "$115k",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Facebook",
      location: "Menlo Park",
      salary: "$125k",
    },
    {
      id: 6,
      title: "UX Designer",
      company: "Apple",
      location: "Cupertino",
      salary: "$140k",
    },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setModalIsOpen(true);
  };

  const settings = {
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="text-center font-bold text-xl">
      <div className="relative flex flex-col items-end p-4">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-3xl text-[rgb(77,47,121)]">Posted Jobs</h1>
          <button
            className="top-4 right-4 px-4 py-2 bg-[rgb(77,47,121)] text-white rounded-lg duration-300 hover:border-[rgb(77,47,121)] border-2 hover:bg-white hover:text-[rgb(77,47,121)] focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setModalIsOpen(true)}
          >
            New Opening
          </button>
        </div>

        <div className="w-full max-h-48 max-w-6xl overflow-hidden">
          {/* Carousel Container */}
          <Slider {...settings}>
            {jobPosts.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-white mt-4 shadow-[0_0_10px_rgba(77,47,121,0.5)] text-[rgb(77,47,121)] rounded-lg focus:outline-none cursor-pointer"
                onClick={() => handleJobClick(job)}
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-[rgb(154,91,248)]">{job.company}</p>
                <p className="text-[rgb(154,91,248)]">{job.location}</p>
                <p className="text-[rgb(154,91,248)] font-bold">{job.salary}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Modal for job details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Job Details"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedJob && (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
            <p className="text-xl font-bold">{selectedJob.title}</p>
            <p className="text-lg">{selectedJob.company}</p>
            <p className="text-lg">{selectedJob.location}</p>
            <p className="text-lg font-bold">{selectedJob.salary}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setModalIsOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
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

export default JobPosts;
