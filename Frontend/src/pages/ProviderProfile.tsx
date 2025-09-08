import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import type ProviderProfileData from "../interfaces/ProviderProfileInterface";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const PROVIDERS_PROFILE_URL = import.meta.env.VITE_PROVIDERS_PROFILE_URL;

const ProviderProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [providerData, setProviderData] = useState<ProviderProfileData | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");
  const accessToken = localStorage.getItem("accessToken");
  const token = useSelector((state: any) => state.auth.jwtToken);

  useEffect(() => {
    const fetchData = async () => {
      let currentToken = token;
      console.log("Initial token:", currentToken);
      try {
        const res = await fetch(`${PROVIDERS_PROFILE_URL}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken || accessToken}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log("Provider Profile:", data);
        setProviderData(data.providerData);
      } catch (err: any) {
        console.log("Profile fetch error:", err.message);
      }
    };

    fetchData();
  }, [token]);

  // Function to render star ratings
  const renderRatingStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <i key={i} className="fas fa-star-half-alt text-yellow-500"></i>
        );
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-500"></i>);
      }
    }
    return stars;
  };

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("userType");
    localStorage.removeItem("providerStatus");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Service Provider Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your professional information and account settings
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-3 px-6 font-medium text-sm ${
                activeTab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Information
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm ${
                activeTab === "settings"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>

          {/* Profile Tab Content */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="relative">
                  <img
                    src={
                      providerData?.providerImageUrl || "/default-avatar.png"
                    }
                    alt={providerData?.providerName}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-100 rounded-full p-2">
                    <i className="fas fa-check-circle text-blue-600 text-xl"></i>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {providerData?.providerName}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {providerData?.providerBio}
                  </p>

                  <div className="flex items-center mt-4">
                    <div className="flex mr-4">
                      {renderRatingStars(providerData?.providerAvgRating)}
                    </div>
                    <span className="text-gray-600">
                      {providerData?.providerAvgRating || 0} out of 5
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-briefcase mr-2 text-blue-600"></i>
                      <span>
                        {providerData?.providerTotalJobs || 0} Jobs Completed
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-calendar-alt mr-2 text-blue-600"></i>
                      <span>
                        Member since{" "}
                        {new Date(
                          providerData?.createdAt || ""
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="fas fa-address-card mr-2 text-blue-600"></i>
                    Contact Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="fas fa-user text-gray-500 w-6"></i>
                      <span className="text-gray-700">
                        {providerData?.userID?.userName}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <i className="fas fa-phone text-gray-500 w-6"></i>
                      <span className="text-gray-700">
                        {providerData?.userID?.userPhone}
                      </span>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-map-marker-alt text-gray-500 w-6 mt-1"></i>
                      <div>
                        <p className="text-gray-700">
                          {providerData?.userID?.userAddress?.street}
                        </p>
                        <p className="text-gray-700">
                          {providerData?.userID?.userAddress?.city},{" "}
                          {providerData?.userID?.userAddress?.state}{" "}
                          {providerData?.userID?.userAddress?.zipCode}
                        </p>
                        <p className="text-gray-700">
                          {providerData?.userID?.userAddress?.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services & ID Verification */}
                <div className="space-y-6">
                  {/* Services */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-tools mr-2 text-blue-600"></i>
                      Services Offered
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {providerData?.providerServicesList?.map(
                        (service, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* ID Verification */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-id-card mr-2 text-blue-600"></i>
                      ID Verification
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Identity Document</span>
                      {providerData?.providerIdProf ? (
                        <a
                          href={providerData?.providerIdProf}
                          // target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <i className="fas fa-eye mr-1"></i> View ID
                        </a>
                      ) : (
                        <span className="text-red-500">Not provided</span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center">
                      <span className="text-gray-700 mr-2">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          providerData?.status === "approve"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {providerData?.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Account Settings
              </h2>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Edit Profile Information
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Update your personal and professional details
                    </p>
                  </div>
                  <button className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                    <i className="fas fa-edit mr-2"></i> Edit Profile
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Log Out</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Sign out from your account
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-3 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProviderProfile;
