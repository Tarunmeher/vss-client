import React, { useState } from "react";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    childName: "",
    mobileNo: "",
    branch: "",
    standard: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Thank you for your submission!");
  };

  return (
    <>
      <div className="relative h-full flex items-center justify-center mt-10">
        <h2 className="text-black text-4xl font-bold">Admission Inquiry</h2>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-screen p-4 lg:p-16">
        {/* Left side with header and video background */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-full overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src="https://cdn.pixabay.com/video/2024/06/06/215470_tiny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right side with form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-transparent lg:bg-none">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-6 rounded-2xl shadow-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">Child Name</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile No.</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">-- Select Branch --</option>
                <option value="Branch A">Branch A</option>
                <option value="Branch B">Branch B</option>
                <option value="Branch C">Branch C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Standard</label>
              <select
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">-- Select Standard --</option>
                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-semibold"
            >
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
