import React, { useState, useEffect } from "react";
import { auth } from "../Firebase"; // Import Firebase auth
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    batch: "",
    department: "",
    mobile: "",
    currentLocation: "",
    currentCompany: "",
    studentId: "",
    linkedIn: "",
    img_url: "",
  });

  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setFirebaseUser({
        uid: user.uid,
        name: user.displayName,
      });
      checkUserExists(user.uid); // Check user existence whenever the page is accessed
    }
  }, []);

  // Function to check if the user exists in the backend
  const checkUserExists = async (uid) => {
    try {
      const response = await axios.get(
        `http://192.168.137.201:1337/api/userdata?filters[uid][$eq]=${uid}`
      );
      if (response.data && response.data.data.length > 0) {
        console.log("User exists, navigating to Dashboard...");
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
    }
  };

  const formFields = [
    { label: "Batch", name: "batch", type: "number" },
    { label: "Department", name: "department", type: "text" },
    { label: "Student ID", name: "studentId", type: "text" },
    { label: "Mobile", name: "mobile", type: "number" },
    { label: "Image Link", name: "img_url", type: "text" },
    { label: "LinkedIn URL", name: "linkedIn", type: "text" },
    { label: "Current Location", name: "currentLocation", type: "text" },
    { label: "Current Company", name: "currentCompany", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firebaseUser) {
      alert("User not authenticated!");
      return;
    }

    const payload = {
      uid: firebaseUser.uid,
      email: auth.currentUser.email,
      name: firebaseUser.name,
      year: formData.batch,
      department: formData.department,
      student_id: formData.studentId,
      mobile: formData.mobile,
      img_url: formData.img_url,
      linkedin: formData.linkedIn,
      location: formData.currentLocation,
      current_company: formData.currentCompany,
      status: "notVerified", // Default status
    };

    try {
      const response = await axios.post(
        "http://192.168.137.201:1337/api/userdata",
        {
          data: payload,
        }
      );
      console.log("User data posted successfully:", response.data);
      alert("Data submitted successfully!");
      e.target.reset();
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="min-h-screen flex md:items-center justify-center bg-gray-100">
      {/* Profile Form */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6 m-4 md:m-0">
        <div className="flex items-center space-x-4 mb-6">
          <div>
            <h2 className="text-xl font-bold">Enter Details</h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {formFields.map((field) => (
              <label key={field.name} className="block">
                <span className="text-gray-700">{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
