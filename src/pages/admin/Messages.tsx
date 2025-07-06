import { MdEmail } from "react-icons/md";
import { useGetAdminMessagesQuery } from "../../redux/api/portfolioApi";

const Messages = () => {
  const { data, isLoading, isError } = useGetAdminMessagesQuery();

  const messages = data?.data || [];

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        Contact Messages
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load messages.</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages received yet.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-gray-50 p-6 rounded-xl shadow-md border relative"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Message from {msg.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Email:{" "}
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </p>
                  <p className="mt-2 text-gray-700 text-sm">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Received:{" "}
                    {new Date(msg.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <MdEmail className="text-indigo-600" size={24} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
