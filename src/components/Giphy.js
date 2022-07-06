import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gifsPerPage, setGifsPerPage] = useState(12);
  const indexOfLastPost = currentPage * gifsPerPage;
  const indexOfFirstPost = indexOfLastPost - gifsPerPage;
  const currentGifs = data.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "t3Pxq4J6kaMBb1cKzbPyrd5TJ5c40wxo",
            limit: 100,
          },
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const renderGifs = () => {
    return currentGifs.map((el) => {
      return (
        // <div key={el.id} className=" ml-2">
        //   <img src={el.images.fixed_height_downsampled.url} />
        // </div>
        <>
          <div class="col-sm-4" key={el.id}>
            <div class="card">
              <div class="image">
                <img src={el.images.fixed_height.url} />
              </div>
            </div>
          </div>

          {/* <div class="col-sm-4">
            <div class="card">
              <div class="image">
               <img src={el.images.fixed_height.url} />
              </div>
              <div class="card-inner">
                <div class="header">
                  <h2>Title</h2>
                  <h3>Sub-Head</h3>
                </div>
                <div class="content">
                  <p>Content area</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="image">
               <img src={el.images.fixed_height.url} />
              </div>
              <div class="card-inner">
                <div class="header">
                  <h2>Title</h2>
                  <h3>Sub-Head</h3>
                </div>
                <div class="content">
                  <p>Content area</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="image">
             <img src={el.images.fixed_height.url} />
              </div>
              <div class="card-inner">
                <div class="header">
                  <h2>Title</h2>
                  <h3>Sub-Head</h3>
                </div>
                <div class="content">
                  <p>Content area</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="image">
            <img src={el.images.fixed_height.url} />
              </div>
              <div class="card-inner">
                <div class="header">
                  <h2>Title</h2>
                  <h3>Sub-Head</h3>
                </div>
                <div class="content">
                  <p>Content area</p>
                </div>
              </div>
            </div>
          </div> */}
        </>
      );
    });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (search !== "") {
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: "t3Pxq4J6kaMBb1cKzbPyrd5TJ5c40wxo",
            q: search,
          },
        });
        setData(results.data.data);
      } catch (err) {}
    } else {
      alert("fill in the blank");
    }
  };

  return (
    <div className="m-5">
      <form className="form-inline justify-content-center m-4">
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="search"
          className="form-control"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary  ml-3"
        >
          Go
        </button>
      </form>

      <div className="container justify-content-center d-flex flex-wrap ">
        {renderGifs()}
      </div>
      <Pagination
        currentPage={currentPage}
        gifsPerPage={gifsPerPage}
        totalGifs={data.length}
        paginate={(number) => setCurrentPage(number)}
        next={() => setCurrentPage(currentPage + 1)}
        previous={() => setCurrentPage(currentPage - 1)}
      />
    </div>
  );
};

export default Giphy;
