import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addBook,
  deleteBook,
  deleteAllBooks,
} from "../redux/actions/actionAddBooks";
import FlipMove from "react-flip-move";

const AddBooks = ({ libraryData, addBook, deleteBook, deleteAllBooks }) => {
  // console.log(libraryData);

  const initialState = {
    title: "",
    author: "",
  };

  const [newData, setNewData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(newData);

    //vider le input
    setNewData(initialState);
  };

  const displayData =
    libraryData.length > 0 ? (
      <FlipMove>
        {libraryData.map((data) => {
          return (
            <li
              key={data.id}
              className="list-group-item list-group-item-light d-flex justify-content-between"
            >
              <span>
                <strong>Titre : </strong>
                {data.title}
              </span>
              <span>
                <strong>Auteur : </strong>
                {data.author}
              </span>
              <span
                className="btn btn-danger"
                onClick={() => deleteBook(data.id)}
              >
                x
              </span>
            </li>
          );
        })}
      </FlipMove>
    ) : (
      <p className="text-center">Aucun livre à afficher</p>
    );

  const deleteAllBooksBtn = libraryData.length > 0 && (
    <button onClick={()=>deleteAllBooks()} className="btn btn-danger mt-4 mb-5">
      Affacer tous les livres
    </button>
  );

  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="dsplay-4">BOOKS</h1>
          <p>Ajouter un livre à votre bibliothèque</p>

          <form
            className="form-inline justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                value={newData.title}
                type="text"
                className="form-control"
                placeholder="Titre"
                required
                onChange={(e) =>
                  setNewData({ ...newData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                value={newData.author}
                type="text"
                className="form-control ml-3"
                placeholder="Auteur"
                required
                onChange={(e) =>
                  setNewData({ ...newData, author: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-secondary ml-3">
                Ajouter un livre
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container" style={{ minHeight: "200px" }}>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">{displayData}</ul>
            <div className="d-flex justify-content-center">
              {deleteAllBooksBtn}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    libraryData: state.library,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (param) => dispatch(addBook(param)),
    deleteBook: (id) => dispatch(deleteBook(id)),
    deleteAllBooks: () => dispatch(deleteAllBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks);
