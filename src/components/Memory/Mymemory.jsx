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

const Mymemory = () => {
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  const mymemory = memories.filter((memory) => memory.user.id == userId);
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mymemory.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onLike={handleLike}
            onDelete={handleDelete}
            canDelete={token && memory.user.id == userId}
          />
        ))}
      </div>
    </div>
  );
};

export default Mymemory;
