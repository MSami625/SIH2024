import React, { useState } from "react";

const Details = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    batch: "",
    department: "",
    mobile: "",
    profile: null,
    currentLocation: "",
    currentCompany: "",
    studentId: "",
  });

  const formFields = [
    { label: "College Name", name: "collegeName", type: "text" },
    { label: "Batch", name: "batch", type: "number" },
    { label: "Department", name: "department", type: "text" },
    { label: "Student ID", name: "studentId", type: "number" },
    { label: "Mobile", name: "mobile", type: "number" },
    { label: "Current Location", name: "currentLocation", type: "text" },
    { label: "Current Company", name: "currentCompany", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex md:items-center justify-center bg-gray-100">
      {/* Profile Form */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6 m-4 md:m-0">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">Edit Profile</h2>
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
