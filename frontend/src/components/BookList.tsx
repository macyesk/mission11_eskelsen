import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortByTitle, setSortByTitle] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join('&');
      const response = await fetch(
        `http://localhost:5121/books/allbooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBy=${sortByTitle}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortByTitle, selectedCategories]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize, selectedCategories]);

  return (
    <>
      <br />
      <label>
        <input
          type="checkbox"
          checked={sortByTitle}
          onChange={(e) => setSortByTitle(e.target.checked)}
        />
        Sort Alphabetically
      </label>
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {b.price}
              </li>
            </ul>
            <button
              className="btn btn-dark"
              onClick={() => {
                navigate(`/addToCart/${b.title}/${b.bookId}/${b.price}`);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}

      <ul className="pagination justify-content-center">
        <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>
            Previous
          </button>
        </li>

        {Array(totalPages)
          .fill(null)
          .map((_, index) => (
            <li
              className={`page-item ${pageNum === index + 1 ? 'disabled' : ''}`}
            >
              <button
                key={index + 1}
                onClick={() => setPageNum(index + 1)}
                className="page-link"
              >
                {index + 1}
              </button>
            </li>
          ))}
        <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
          <button onClick={() => setPageNum(pageNum + 1)} className="page-link">
            Next
          </button>
        </li>
      </ul>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
function addToCart(newItem: CartItem) {
  throw new Error('Function not implemented.');
}
