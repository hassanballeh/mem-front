import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteMemory } from "../../services/memories";
const MemoryDetail = () => {
  const { token } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [memory, setMemory] = useState(state?.memory || null);
  const [error, setError] = useState(null);
  const [canDelete, setCanDelete] = useState(state?.canDelete || false);
  const handleDelete = async (memoryId) => {
    if (!token) return;

    try {
      await deleteMemory(memoryId);
      navigate("/");
    } catch (err) {
      setError(err);
      console.error("Delete error:", err);
    }
  };
  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );

  if (!memory)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Memory Not Found
          </h2>
          <p className="text-gray-500">
            The memory you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );

  const getImageGridClass = (imageCount) => {
    if (imageCount === 1) return "grid-cols-1";
    if (imageCount === 2) return "grid-cols-1 md:grid-cols-2";
    if (imageCount === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  const getImageClass = (imageCount, index) => {
    if (imageCount === 1) return "col-span-1";
    if (imageCount === 2) return "col-span-1";
    if (imageCount === 3) {
      // First image takes full width on medium screens, others split
      return index === 0
        ? "col-span-1 md:col-span-2 lg:col-span-1"
        : "col-span-1";
    }
    return "col-span-1";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-white  transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Memories
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden  bg-opacity-95">
          {/* Header Section */}
          <div className="bg-primary  px-8 py-8 text-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 leading-tight">
                  {memory.title}
                </h1>
                <div className="flex items-center text-blue-100 space-x-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">
                      {memory.user.firstName} {memory.user.lastName}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {new Date(memory.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {canDelete && (
                <button
                  onClick={() => handleDelete(memory.id)}
                  className="text-white border-none hover:text-red-700! hover:border-none! "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {memory.description}
              </p>
            </div>

            {/* Images Section */}
            {memory.images && memory.images.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {memory.images.length === 1
                    ? "Image"
                    : `Images (${memory.images.length})`}
                </h2>
                <div
                  className={`grid gap-6 ${getImageGridClass(
                    memory.images.length
                  )}`}
                >
                  {memory.images.map((image, index) => (
                    <div
                      key={index}
                      className={`${getImageClass(
                        memory.images.length,
                        index
                      )} group cursor-pointer`}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <img
                          src={image}
                          alt={`Memory ${index + 1}`}
                          className="w-full h-auto max-h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Memory Stats */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {memory.images ? memory.images.length : 0}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {memory.images?.length === 1 ? "Image" : "Images"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {memory.description
                      ? memory.description.split(" ").length
                      : 0}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.ceil(
                      (Date.now() - new Date(memory.createdAt).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Days Ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetail;
