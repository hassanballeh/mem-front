import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  fetchMemories,
  likeMemory,
  deleteMemory,
  getMemoryById,
} from "../../services/memories";
import MemoryCard from "./MemoryCard";
import MemoryForm from "./MemoryForm";

const MemoriesList = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, userId } = useAuth();
  

  useEffect(() => {
    const loadMemories = async () => {
      try {
        const data = await fetchMemories();
        setMemories(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMemories();
  }, []);

  const handleLike = async (memoryId) => {
    if (!token) {
      alert("Please login to like memories");
      return;
    }
    console.log("id:" + memoryId);
    try {
      await likeMemory(memoryId);
      const updatedMemory = await getMemoryById(memoryId);
      setMemories(
        memories.map((memory) =>
          memory.id === memoryId ? updatedMemory : memory
        )
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleDelete = async (memoryId) => {
    if (!token) return;

    try {
      await deleteMemory(memoryId, token);
      setMemories(memories.filter((memory) => memory.id !== memoryId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleMemoryCreated = (newMemory) => {
    setMemories([newMemory, ...memories]);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading memories...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Please wait while we fetch your precious moments
          </p>
        </div>
      </div>
    );

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
              <h3 className="text-sm font-medium text-red-800">
                Error Loading Memories
              </h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Memory Form */}
        {token && (
          <div className="mb-8">
            <MemoryForm onMemoryCreated={handleMemoryCreated} />
          </div>
        )}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Memories Collection
          </h1>
          <p className="text-gray-600 text-lg">
            {memories.length === 0
              ? "No memories yet"
              : `${memories.length} precious ${
                  memories.length === 1 ? "memory" : "memories"
                }`}
          </p>
        </div>
        {/* Memories List - Full Width Cards */}
        <div className="space-y-6">
          {memories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Memories Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start creating your first memory to share your precious moments
              </p>
              {!token && (
                <p className="text-sm text-gray-400">
                  Please login to create and view memories
                </p>
              )}
            </div>
          ) : (
            memories.map((memory) => (
              <div
                key={memory.id}
                className="w-full transform hover:scale-[1.01] transition-all duration-300"
              >
                <MemoryCard
                  memory={memory}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  canDelete={token && memory.user.id == userId}
                />
              </div>
            ))
          )}
        </div>

        {/* Load More Section (if needed) */}
        {memories.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center text-gray-500">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">End of memories</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoriesList;
