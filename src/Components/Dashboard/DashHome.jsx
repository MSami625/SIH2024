import React from "react";
import JobPosts from "./JobPosts";
import FeaturedPosts from "./featuredPosts";

const DashHome = ({ userData }) => {



  const jobs = userData?.attributes?.jobs?.data;
  const id = userData?.id || null;

  return (
    <div>
      <JobPosts id={id} jobs={jobs} />
      <FeaturedPosts />
    </div>
  );
};

export default DashHome;
