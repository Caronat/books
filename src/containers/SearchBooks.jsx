import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/actions/actionFetchBooks";
import { addBook } from "../redux/actions/actionAddBooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const SearchBooks = () => {
  const [title, setTitle] = useState("");

  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchBooks(title));
  };

  const handleSave = (title, author) => {
    const bookToSave = { title, author };
    dispatch(addBook(bookToSave));
    toast.success("👌 livre enregistré avec succes", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const displayFetchedBooks = search.isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : search.error !== "" ? (
    <p className="alert alert-danger">{search.error}</p>
  ) : (
    search.fetchedBooks.map((data) => {
      return (
        <div key={data.id} className="card mb-2">
          <div className="card-header">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target={`#${data.id}`}
                aria-expanded="false"
              >
                {data.volumeInfo.title}
              </button>
            </h5>
          </div>
          <div id={data.id} className="collapse" data-parent="#accordion">
            <div className="card-body">
              {data.volumeInfo.hasOwnProperty("imageLinks") && (
                <img
                  src={data.volumeInfo.imageLinks.thumbnail}
                  alt={data.volumeInfo.title}
                />
              )}
              <br />
              <h4 className="card-title">Titre: {data.volumeInfo.title}</h4>
              <h5 className="card-title">
                Auteur(s): {data.volumeInfo.authors}
              </h5>
              <p className="card-text">{data.volumeInfo.description}</p>
              <a
                className="btn btn-outline-secondary"
                href={data.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Plus d'infos
              </a>
              <button
                className="btn btn-outline-secondary ml-3"
                onClick={() =>
                  handleSave(data.volumeInfo.title, data.volumeInfo.authors)
                }
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      );
    })
  );

  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="dsplay-4">BOOKS</h1>
          <p>Indiquer le sujet du livre à rechercher sur Google API</p>

          <form
            className="form-inline justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Quoi rechercher ?"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-secondary ml-3">
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container" style={{ minHeight: "200px" }}>
        <div id="accordion">{displayFetchedBooks}</div>
      </div>
    </main>
  );
};

export default SearchBooks;
