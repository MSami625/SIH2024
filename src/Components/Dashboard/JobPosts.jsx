import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal"; // Import Modal
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// Set the app element for accessibility
Modal.setAppElement("#root");

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const JobPosts = ({ id, jobs }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // State to manage selected job
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    description: "",
    contact: "",
  });

  // Handle input change in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      data: {
        position: formData.position,
        company: formData.company,
        job_description: formData.description,
        contact: formData.contact,
        user_datum: id,
      },
    };

    try {
      const response = await axios.post(
        "http://192.168.137.201:1337/api/jobs",
        jobData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Job posted successfully:", response.data);
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error posting job data:", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://192.168.137.201:1337/api/jobs/${jobId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Job deleted successfully");
    } catch (error) {
      // Handle errors
      console.error("Error deleting job:", error);
    }
  };

  // Job carousel settings
  const settings = {
    infinite: true,
    autoplay: false,
    arrows: true,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Check if jobs is null or an empty array
  const isEmpty = !jobs || jobs.length === 0;

  return (
    <div className="text-center font-bold text-xl">
      <div className="relative flex flex-col items-end p-4">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-3xl text-[rgb(77,47,121)]">Posted Jobs</h1>
          <button
            className="top-4 right-4 px-4 py-2 bg-[rgb(77,47,121)] text-white rounded-lg duration-300 hover:border-[rgb(77,47,121)] border-2 hover:bg-white hover:text-[rgb(77,47,121)] focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {
              setSelectedJob(null);
              setModalIsOpen(true);
            }}
          >
            New Opening
          </button>
        </div>

        <div className="w-full max-h-48 max-w-6xl overflow-hidden">
          {/* Conditional rendering based on the presence of jobs */}
          {isEmpty ? (
            <div className="text-center text-lg font-semibold mt-4">
              No jobs available
            </div>
          ) : (
            <Slider {...settings}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 w-[10px] bg-white mt-4 shadow-[0_0_10px_rgba(77,47,121,0.5)] text-[rgb(77,47,121)] rounded-lg focus:outline-none cursor-pointer"
                  onClick={() => {
                    setSelectedJob(job);
                    setModalIsOpen(true);
                  }}
                >
                  <h3 className="text-xl font-semibold">
                    {job.attributes.position}
                  </h3>
                  <p className="text-[rgb(154,91,248)]">
                    {job.attributes.company}
                  </p>
                  <p className="text-[rgb(154,91,248)]">
                    {truncateText(job.attributes.job_description, 4)}
                  </p>
                  <p className="text-[rgb(154,91,248)] font-bold">
                    {job.attributes.contact}
                  </p>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel={selectedJob ? "Job Details" : "Add New Job Post"}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedJob ? (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
            <p className="text-xl font-bold">
              Position: {selectedJob.attributes.position}
            </p>
            <p className="text-lg font-bold">
              Company: {selectedJob.attributes.company}
            </p>
            <p className="text-lg">
              Description: {selectedJob.attributes.job_description}
            </p>
            <p className="text-lg font-bold">
              Contact: {selectedJob.attributes.contact}
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  handleDelete(selectedJob.id);
                  setModalIsOpen(false);
                }}
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Delete
              </button>
              <button
                onClick={() => setModalIsOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Add New Job Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Job Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Job Description
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Contact Details
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
          </>
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
