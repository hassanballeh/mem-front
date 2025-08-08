import { useNavigate } from "react-router-dom";

const MemoryCard = ({ memory, onLike, onDelete, canDelete }) => {
  const navigate = useNavigate();
  console.log(memory);
  const handleCardClick = () => {
    navigate(`/memories/${memory.id}`, {
      state: {
        memory,
        canDelete,
      },
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ">
      <div className="p-4 hover:cursor-pointer" onClick={handleCardClick}>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {memory.title}
        </h3>
        <p className="text-gray-600 mb-4">{memory.description}</p>
        {memory.images && memory.images.length > 0 && (
          <div className="flex items-center justify-center">
            <img
              src={memory.images[0]}
              alt={`Memory 1`}
              className="w-full h-[300px]  object-cover rounded"
            />
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => onLike(memory.id)}
            className={`flex items-center space-x-1 ${
              memory.isLikedByCurrentUser ? "text-red-500" : "text-gray-500"
            } hover:text-red-500 transition`}
          >
            {memory.isLikedByCurrentUser ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
            <span>{memory.likeCount}</span>
          </button>

          {canDelete && (
            <button
              onClick={() => onDelete(memory.id)}
              className="text-white border-none hover:text-red-700! hover:border-none!"
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

        <div className="flex justify-between text-sm text-gray-500">
          <span>
            By {memory.user.firstName} {memory.user.lastName}
          </span>
          <span>{new Date(memory.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
export default MemoryCard;
