import { useNavigate } from 'react-router-dom';

function WelcomeBand() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar bg-warning">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate('/books')}>
            Books
          </a>
        </div>
      </nav>
      <br />
    </>
  );
}

export default WelcomeBand;
