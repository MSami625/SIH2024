import React, { useState, useEffect } from "react";
import Nav from "../Components/navbar";
import { FaWebflow, FaMailchimp } from "react-icons/fa6";
import { RiNotionFill } from "react-icons/ri";
import { SiZapier } from "react-icons/si";

function JobPortal() {
  const icons = [
    <FaWebflow className="w-12 h-12 rounded-full" />,
    <RiNotionFill className="w-12 h-12 rounded-full" />,
    <SiZapier className="w-12 h-12 rounded-full" />,
    <FaMailchimp className="w-12 h-12 rounded-full" />,
  ];

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://192.168.137.201:1337/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        const transformedJobs = data.data.map((job, index) => ({
          title: job.attributes.position,
          company: job.attributes.company,
          contact: job.attributes.contact,
          companyLogo: icons[index % icons.length],
          tags: ["Fulltime", "Senior level", "Remote"],
        }));

        setJobs(transformedJobs);
        setFilteredJobs(transformedJobs);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const newFilteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchValue) ||
        job.company.toLowerCase().includes(searchValue)
    );

    setFilteredJobs(newFilteredJobs);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav
        navbarData={{
          logoText: "FusionX",
          navItems: [
            { text: "Home", link: "/" },
            { text: "Engage", link: "/Engage" },
            { text: "Network", link: "/Network" },
            { text: "Events", link: "/Events" },
            { text: "Directory", link: "/Directory" },
            { text: "Forum", link: "/Forum" },
            // Add more navigation items as needed
          ],
        }}
        active={true}
      />

      {/* Main content */}
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-6">Find Your Dream Job Here</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by job title or company..."
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center justify-items-center p-4 bg-white hover:bg-[#9a5bf8] group duration-300 shadow-md rounded-lg mb-4"
            >
              <div className="flex items-center space-x-4 w-full group-hover:text-white">
                {job.companyLogo}
                <div>
                  <h2 className="font-semibold text-gray-900 group-hover:text-white">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-600 group-hover:text-white">
                    {job.company}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 w-max">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-gray-500 w-max group-hover:text-white">
                {job.contact}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found</p>
        )}
      </main>
    </div>
  );
}

export default JobPortal;
