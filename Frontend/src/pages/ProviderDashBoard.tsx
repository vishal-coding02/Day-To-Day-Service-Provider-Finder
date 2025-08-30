import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type Request from "../interfaces/ProviderDashBoard";

const PROVIDER_DASHBOARD = import.meta.env.VITE_PROVIDER_DASHBOARD_URL;

const ProviderDashBoard = () => {
  const accessToken = localStorage.getItem("accessToken");
  const token = useSelector((state: any) => state.auth.jwtToken);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentToken = token;
    fetch(PROVIDER_DASHBOARD, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${currentToken || accessToken}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("All Customers Requests", data);
        if (data.requests && Array.isArray(data.requests)) {
          setRequests(data.requests);
        } else {
          setRequests([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error :", err.message);
        setLoading(false);
      });
  }, [token]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
        <p className="text-gray-600">Manage your customer service requests</p>
      </div>

      {/* Requests Grid */}
      <div className="max-w-6xl mx-auto">
        {requests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No requests found
            </h3>
            <p className="mt-1 text-gray-500">
              You don't have any service requests yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Customer Image and Basic Info */}
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {request.customerName?.charAt(0) || "C"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {request.customerName}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {request.customerLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-4">
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Services Needed
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {request.customerServicesList.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Description
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {request.customerDescription}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Offered Price
                      </h4>
                      <p className="text-lg font-bold text-gray-900">
                        ₹{request.customerPrice}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(request.createdAt)}
                    </span>
                  </div>

                  {/* Reference Photo - Smaller size */}
                  {request.customerMedia && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Reference Photo
                      </h4>
                      <img
                        src={request.customerMedia}
                        alt="Service reference"
                        className="w-full h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors font-medium">
                      Accept
                    </button>
                    <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors font-medium">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashBoard;
