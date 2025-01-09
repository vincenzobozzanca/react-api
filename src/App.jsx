import { Card } from "./components/Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BookForm } from "./components/BookForm";
// Constants
const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    recipes: '/Ricette'
  }
};

// API Service functions
const apiService = {
  // Fetch all books
  fetchBooks: async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.recipes}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Create new book
  createBook: async (bookData) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.recipes}`,
        bookData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  // Delete book
  deleteBook: async (id) => {
    try {
      const response = await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.recipes}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
};

// Main App Component App
function App() {
  // Use React Query for data fetching and caching
  const {
    data: books,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['books'],
    queryFn: apiService.fetchBooks,
    refetchOnWindowFocus: false
  });

  // Handle book creation
  const handleCreateBook = async (bookData) => {
    try {
      await apiService.createBook(bookData);
      refetch(); // Refresh the books list
    } catch (error) {
      console.error('Error creating book:', error);
      // Here you might want to show an error message to the user
    }
  };

  // Handle book deletion
  const handleDeleteBook = async (id) => {
    try {
      await apiService.deleteBook(id);
      refetch(); // Refresh the books list
    } catch (error) {
      console.error('Error deleting book:', error);
      // Here you might want to show an error message to the user
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;

  return (
    <>
      <h1>Inserisci libro</h1>
      
      <BookForm onSubmit={handleCreateBook} />
      
      <hr />
      
      <div className="card-container">
        {books?.map((book) => (
          <Card
            key={book.id}
            {...book}
            callbackCestina={() => handleDeleteBook(book.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;