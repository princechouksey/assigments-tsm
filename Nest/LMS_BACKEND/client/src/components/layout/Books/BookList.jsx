import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useCreateBook } from "../../../hooks/useBooks";
import{Loader}from"../../../common/Loader";
import{Button}from"../../../common/Button";
import{Modal}from"../../../common/Modal";
import { BookForm} from "./BookForm";
import {BookCard} from "./BookCard";
import { useBooks } from "../../../hooks/useBooks";
import { Input } from "../../../common/Input";
import { useDebounce } from "../../../hooks/useDebounce";

export const BooksList = () => {
  const initialBookValues = {
  title: "",
  author: "",
  publisher: "",
  category: "",
  isbn: "",
  publicationYear: new Date().getFullYear(),
  price: 0,
  totalCount: 0,
  availableCount: 0,
  perDayCharge: 0,
  description: "",
};

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useBooks(debouncedSearchTerm);
  const { isAdmin } = useAuth();
  const createBookMutation = useCreateBook();


  const books = Array.isArray(data) ? data : data?.data || [];

  const handleCreateBook = (bookData) => {
    createBookMutation.mutate(bookData, {
      onSuccess: () => setShowCreateModal(false),
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <Loader size="lg" />;

  if (error) return <div>Failed to load books</div>;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative bg-white rounded-lg shadow-sm border px-3 py-1">
            <Input
              type="text"
              placeholder="Search books by title, author, ISBN, or category..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pr-10  border-none focus:ring-0"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2  "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreateModal(true)}>Add New Book</Button>
        )}
      </div>

      {/* Results */}
      {books.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchTerm ? `No books found for "${searchTerm}"` : "No books available"}
          </div>
          <p className="text-gray-400 mt-2">
            {searchTerm ? "Try a different search term" : "Books will appear here once added"}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            {searchTerm ? `Found ${books.length} book${books.length !== 1 ? 's' : ''} for "${searchTerm}"` : `Showing ${books.length} book${books.length !== 1 ? 's' : ''}`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Book"
      >
        <BookForm
          onSubmit={handleCreateBook}
          initialBookValues={initialBookValues}
          submitLabel="Create Book"
          loading={createBookMutation.isLoading}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>
    </div>
  );
};
