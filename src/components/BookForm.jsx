import { useState } from "react";
const INITIAL_BOOK_STATE = {
  titolo: "",
  immagine: "",
  contenuto: "",
  categoria: "Digitale",
  pubblica: false,
  tags: [],
};
const BOOK_CATEGORIES = {
  DIGITAL: "Digitale",
  PRINT: "Cartaceo",
};
const AVAILABLE_TAGS = [
  { id: "fantasy", label: "Fantasy" },
  { id: "comedy", label: "Comedy" },
  { id: "action", label: "Action" },
  { id: "romance", label: "Romance" },
];
// Custom hooks
function useBookForm(onSubmit) {
  const [bookData, setBookData] = useState(INITIAL_BOOK_STATE);
  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setBookData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };
  // Handle tag changes
  const handleTagChange = (event) => {
    const { name, checked } = event.target;
    setBookData((prev) => ({
      ...prev,
      tags: checked
        ? [...prev.tags, name]
        : prev.tags.filter((tag) => tag !== name),
    }));
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (bookData.pubblica) {
      await onSubmit(bookData);
      setBookData(INITIAL_BOOK_STATE);
    }
  };
  return {
    bookData,
    handleInputChange,
    handleTagChange,
    handleSubmit,
  };
}
export function BookForm({ onSubmit }) {
  const { bookData, handleInputChange, handleTagChange, handleSubmit } =
    useBookForm(onSubmit);
  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Title Input */}
      <div>
        <label htmlFor="titolo">
          Inserisci Titolo
          <input
            id="titolo"
            type="text"
            name="titolo"
            value={bookData.titolo}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      {/* Image Input */}
      <div>
        <label htmlFor="immagine">
          Inserisci Immagine
          <input
            id="immagine"
            type="text"
            name="immagine"
            value={bookData.immagine}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      {/* Content Input */}
      <div>
        <label htmlFor="contenuto">
          Inserisci contenuto
          <input
            id="contenuto"
            type="text"
            name="contenuto"
            value={bookData.contenuto}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      {/* Category Select */}
      <div>
        <label htmlFor="categoria">
          Inserisci categoria
          <select
            id="categoria"
            name="categoria"
            value={bookData.categoria}
            onChange={handleInputChange}
          >
            <option value={BOOK_CATEGORIES.DIGITAL}>Digitale</option>
            <option value={BOOK_CATEGORIES.PRINT}>Cartaceo</option>
          </select>
        </label>
      </div>
      {/* Publish Checkbox */}
      <div>
        <label htmlFor="pubblica">
          Pubblica libro
          <input
            type="checkbox"
            name="pubblica"
            checked={bookData.pubblica}
            onChange={handleInputChange}
          />
        </label>
      </div>
      {/* Tags Section */}
      <div>
        <h3>Scegli tags del libro</h3>
        {AVAILABLE_TAGS.map(({ id, label }) => (
          <label key={id} htmlFor={id}>
            {label}
            <input
              id={id}
              type="checkbox"
              name={id}
              onChange={handleTagChange}
              checked={bookData.tags.includes(id)}
            />
          </label>
        ))}
      </div>
      <button type="submit">Invia</button>
    </form>
  );
}