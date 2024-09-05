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

  const [isEditing, setIsEditing] = useState(false); // New state to control edit mode

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
    setIsEditing(false);
  };

  return (
    <div className="p-10 ml-24 min-w-[70vw] flex md:items-center justify-center bg-gray-100">
      {/* Profile Form */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6 m-4 md:m-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">Edit Profile</h2>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`py-2 px-4 text-white font-bold rounded-lg transition ${
              isEditing
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
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
                  disabled={
                    ["collegeName", "batch", "department"].includes(
                      field.name
                    ) || !isEditing
                  }
                  className={`mt-1 block w-full p-2 border rounded-lg focus:outline-none ${
                    isEditing ||
                    ["collegeName", "batch", "department"].includes(field.name)
                      ? "focus:border-blue-600"
                      : "bg-gray-200 cursor-not-allowed"
                  }`}
                  required
                />
              </label>
            ))}
          </div>

          {isEditing && (
            <button
              type="submit"
              className="w-full mt-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Details;
