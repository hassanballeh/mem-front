import api from "./api";

export const fetchMemories = async () => {
  try {
    const response = await api.get("/memories");
    return response.data;
  } catch (error) {
    throw new Error(error.error || "Failed to fetch memories");
  }
};

export const createMemory = async ({ title, description, images }) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    images.forEach((image) => {
      formData.append("images", image); // append real files
    });
    const response = await api.post("/memories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.error || "Failed to create memory");
  }
};

export const likeMemory = async (memoryId) => {
  try {
    const response = await api.post(`/memories/${memoryId}/like`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.error || "Failed to like memory");
  }
};

export const deleteMemory = async (memoryId) => {
  try {
    const response = await api.delete(`/memories/${memoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.error || "Failed to delete memory");
  }
};

export const getMemoryById = async (memoryId) => {
  try {
    const response = await api.get(`/memories/${memoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.error || "Failed to get memory");
  }
};
