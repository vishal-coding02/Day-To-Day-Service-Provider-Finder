const PPC_API_URL = import.meta.env.VITE_PPC_API_URL;
import { useState } from "react";
import { useSelector } from "react-redux";
import type ProviderProfileCreation from "../interfaces/PPCInterface";
import { useNavigate } from "react-router";

const PPC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.auth.userData.userId);
  console.log(
    "Redux userData:",
    useSelector((state: any) => state.auth.userData)
  );

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProviderProfileCreation>({
    id: userId,
    idProf: "",
    name: "",
    servicesList: [],
    image: "",
    bio: "",
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServiceChange = (service: string) => {
    const updatedServices = formData.servicesList.includes(service)
      ? formData.servicesList.filter((s) => s !== service)
      : [...formData.servicesList, service];

    setFormData({
      ...formData,
      servicesList: updatedServices,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (!userId) {
      console.error("User ID is undefined!");
      return;
    }
    fetch(PPC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("profile created", data);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error :", err.message);
      });
  };

  // Services options
  const serviceOptions: string[] = [
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Cleaning",
    "Painting",
    "Gardening",
    "Moving",
    "Repair",
    "Installation",
    "Consultation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Your Provider Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Complete your professional profile to start offering services
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Step {step} of 4</h2>
              <span className="bg-blue-800 text-xs px-3 py-1 rounded-full">
                {step === 1 && "Basic Info"}
                {step === 2 && "Services"}
                {step === 3 && "Profile Details"}
                {step === 4 && "Review"}
              </span>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-6">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                        stepNumber <= step
                          ? "bg-white text-blue-600 border-white"
                          : "bg-blue-300 border-blue-300 text-white"
                      } font-bold`}
                    >
                      {stepNumber}
                    </div>
                    <span className="text-xs mt-1 text-blue-100">
                      {stepNumber === 1 && "Basic"}
                      {stepNumber === 2 && "Services"}
                      {stepNumber === 3 && "Details"}
                      {stepNumber === 4 && "Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Basic Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          id="providerName"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g., Sumit Kumar"
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="providerIdProf"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Professional ID (Aadhaar) *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 1a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 6h-1V5a4 4 0 00-4-4zm2 5V5a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          id="providerIdProf"
                          name="idProf"
                          type="text"
                          value={formData.idProf}
                          onChange={handleInputChange}
                          placeholder="e.g., AADHAR_XXXX1234"
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-medium"
                    >
                      Continue to Services
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Services */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Your Services
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Services You Offer *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {serviceOptions.map((service: string) => (
                        <div
                          key={service}
                          className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                            formData.servicesList.includes(service)
                              ? "bg-blue-100 border border-blue-300"
                              : "bg-gray-50 border border-gray-200 hover:bg-blue-50"
                          }`}
                          onClick={() => handleServiceChange(service)}
                        >
                          <input
                            id={service}
                            name="providerServicesList"
                            type="checkbox"
                            checked={formData.servicesList.includes(service)}
                            onChange={() => handleServiceChange(service)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                          />
                          <label
                            htmlFor={service}
                            className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-200 font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-medium"
                    >
                      Continue to Profile Details
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Profile Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Profile Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Profile Image URL
                      </label>
                      <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {formData.image ? (
                          <>
                            <img
                              src={formData.image}
                              alt="Profile preview"
                              className="h-24 w-24 rounded-full object-cover mb-3"
                            />
                            <p className="text-sm text-green-600 mb-2">
                              Image URL added successfully
                            </p>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-12 h-12 mb-4 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="text-sm text-gray-500 mb-2">
                              Enter image URL below
                            </p>
                          </>
                        )}
                        <input
                          type="text"
                          placeholder="https://example.com/photos/yourname.jpg"
                          value={formData.image}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              image: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Professional Bio *
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={8}
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="e.g., 5+ years experience in plumbing and home repair services. Specialized in emergency repairs and maintenance."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                        required
                      ></textarea>
                      <p className="text-xs text-gray-500 mt-1">
                        Describe your experience and expertise
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-200 font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-medium"
                    >
                      Review Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Review Your Profile
                  </h3>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Name:</span>
                        <span className="font-semibold">
                          {formData.name || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">
                          Professional ID:
                        </span>
                        <span className="font-semibold">
                          {formData.idProf || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">
                          Services:
                        </span>
                        <span className="font-semibold text-right max-w-xs">
                          {formData.servicesList.length > 0
                            ? formData.servicesList.join(", ")
                            : "No services selected"}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600 font-medium">
                          Profile Image:
                        </span>
                        <span className="font-semibold text-right max-w-xs truncate">
                          {formData.image || "No image URL provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium block mb-2">
                          Bio:
                        </span>
                        <p className="text-gray-800 bg-white p-4 rounded border border-gray-200">
                          {formData.bio || "No bio provided yet."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex">
                      <svg
                        className="h-5 w-5 text-blue-400 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-blue-700">
                        Review your information carefully. You can edit your
                        profile later from your dashboard.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-200 font-medium"
                    >
                      Edit Profile
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 font-medium"
                    >
                      Complete Profile
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPC;
