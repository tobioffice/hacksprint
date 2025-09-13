import { useState, useEffect } from "react";
import axios from "axios";

interface Borrowing {
  _id: string;
  bookId: {
    _id: string;
    title: string;
    author: string;
  };
  userId?: {
    _id: string;
    name: string;
    email: string;
  };
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: string;
}

const Borrowings = () => {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [allBorrowings, setAllBorrowings] = useState<Borrowing[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchBorrowings();
  }, []);

  const fetchBorrowings = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      // Fetch user's borrowings
      const myResponse = await axios.get(
        "http://144.24.159.113/api/borrowings/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setBorrowings(myResponse.data);

      // If librarian or admin, fetch all borrowings
      if (userData.role === "librarian" || userData.role === "admin") {
        const allResponse = await axios.get(
          "http://144.24.159.113/api/borrowings",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setAllBorrowings(allResponse.data);
      }
    } catch (error) {
      console.error("Error fetching borrowings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowingId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        `http://144.24.159.113/api/borrowings/return/${borrowingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchBorrowings(); // Refresh data
      alert("Book returned successfully!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error returning book");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Borrowings</h1>

        {/* My Borrowings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            My Borrowings
          </h2>
          {borrowings.length === 0 ? (
            <p className="text-gray-500">No borrowings found.</p>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {borrowings.map((borrowing) => (
                  <li key={borrowing._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {borrowing.bookId.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Author: {borrowing.bookId.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          Borrowed:{" "}
                          {new Date(borrowing.borrowDate).toLocaleDateString()}{" "}
                          | Due:{" "}
                          {new Date(borrowing.dueDate).toLocaleDateString()}
                        </p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            borrowing.status === "returned"
                              ? "bg-green-100 text-green-800"
                              : borrowing.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {borrowing.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* All Borrowings (Librarian/Admin) */}
        {(user?.role === "librarian" || user?.role === "admin") && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              All Borrowings
            </h2>
            {allBorrowings.length === 0 ? (
              <p className="text-gray-500">No borrowings found.</p>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {allBorrowings.map((borrowing) => (
                    <li key={borrowing._id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {borrowing.bookId.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Author: {borrowing.bookId.author}
                          </p>
                          {borrowing.userId && (
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Borrower:</span>{" "}
                              {borrowing.userId.name} ({borrowing.userId.email})
                            </p>
                          )}
                          <p className="text-sm text-gray-500">
                            Borrowed:{" "}
                            {new Date(
                              borrowing.borrowDate,
                            ).toLocaleDateString()}{" "}
                            | Due:{" "}
                            {new Date(borrowing.dueDate).toLocaleDateString()}
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              borrowing.status === "returned"
                                ? "bg-green-100 text-green-800"
                                : borrowing.status === "overdue"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {borrowing.status}
                          </span>
                        </div>
                        {borrowing.status === "borrowed" && (
                          <button
                            onClick={() => handleReturn(borrowing._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm ml-4"
                          >
                            Return
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Borrowings;
