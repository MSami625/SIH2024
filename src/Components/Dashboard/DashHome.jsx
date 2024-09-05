import React from "react";
import JobPosts from "./JobPosts";
import FeaturedPosts from "./featuredPosts";

const DashHome = () => {
  return (
    <div>
      <JobPosts />
      <FeaturedPosts />
    </div>
  );
};

export default DashHome;
