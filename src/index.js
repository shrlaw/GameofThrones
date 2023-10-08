import React, { useState } from "react";
import ReactDOM from "react-dom";
import ScotchInfoBar from "./ScotchInfoBar";
import "./styles.css";
import axios from "axios";

function App() {
  const apiURL = "https://www.anapioficeandfire.com/api/books?pageSize=30";
  const [books, setBooks] = useState(null);

  //const fetchData = async () => {
  //  try {
  //    const response = await axios.get(apiURL);
  //    console.log(response);
  //    setBooks(response.data);
  //  } catch (error) {
  //    console.log(`error fetching data: ${error}`);
  // }
  //};

  async function fetchData() {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error("network response was not OK!");
      }
      const data = await response.json();
      console.log(data);
      setBooks(data);
    } catch (error) {
      console.log(`error fetching data: ${error}`);
    }
  }
  return (
    <div className="App">
      <h1>Game of Thrones Books</h1>
      <h2>Fetch a list from an API and display it</h2>

      {/* Fetch data from API */}
      <div>
        <button onClick={fetchData} className="fetch-button">
          Fetch Data
        </button>
        <br />
      </div>

      {/* Display data from API */}

      {/* Use JSX below for each book */}
      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            console.log(cleanedDate);
            const authors = book.authors.join(", ");
            console.log(authors);

            return (
              <div className="book">
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div className="details">
                  <p>👨: {authors}</p>
                  <p>📖: {book.numberOfPages}</p>
                  <p>🏘️: {book.country}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>

      <ScotchInfoBar seriesNumber="7" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
