import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = ({id}) => {
  const [formData, setFormData] = useState({
    year: "",
    department: "",
    mobile: "",
    img_url: null,
    location: "",
    current_company: "",
    student_id: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const formFields = [
    { label: "Year", name: "year", type: "number" },
    { label: "Department", name: "department", type: "text" },
    { label: "Student ID", name: "student_id", type: "text" },
    { label: "Mobile", name: "mobile", type: "number" },
    { label: "Current Location", name: "location", type: "text" },
    { label: "Current Company", name: "current_company", type: "text" },
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1337/api/userdata/${id}`, {
        data: {
          location: formData.location,
          mobile: formData.mobile,
          current_company: formData.current_company,
        },
      });
      console.log("Form Data Updated:", formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/userdata/${id}`);
        const { attributes } = response.data.data;
        const {
          year,
          department,
          mobile,
          img_url,
          location,
          current_company,
          student_id
        } = attributes;

        setFormData({
          year,
          department,
          mobile,
          img_url,
          location,
          current_company,
          student_id,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="p-10 ml-24 min-w-[70vw] flex md:items-center justify-center bg-gray-100">
      {/* Profile Form */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6 m-4 md:m-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={formData.img_url || "https://via.placeholder.com/150"}
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
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  disabled={
                    ["student_id", "year", "department"].includes(
                      field.name
                    ) || !isEditing
                  }
                  className={`mt-1 block w-full p-2 border rounded-lg focus:outline-none ${
                    isEditing ? "focus:border-blue-600" : "bg-gray-200 cursor-not-allowed"
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

export default EditProfile;
