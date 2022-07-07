import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [gifsPerPage, setGifsPerPage] = useState(12);
  // const indexOfLastPost = currentPage * gifsPerPage;
  // const indexOfFirstPost = indexOfLastPost - gifsPerPage;
  // const currentGifs = data.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: `${process.env.REACT_APP_API_URL}`,
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
    return data.map((el) => {
      return (
        // <div key={el.id} className=" ml-2">
        //   <img src={el.images.fixed_height_downsampled.url} />
        // </div>

        <div>
          <div className="card item shadow ">
            <img src={el.images.fixed_height.url} />
            <div className="card-body ">
              <h5 className="card-title"> {el.title} </h5>
              <a
                target="blank"
                href={el.images.fixed_height.url}
                className="btn  myButton"
              >
                Open Gif
              </a>
            </div>
          </div>
        </div>
        // <div className="col-sm-4" key={el.id}>
        //   <div className="card">
        //     <div className="image">
        //       <img src={el.images.fixed_height_small_still.url} />
        //     </div>
        //   </div>
        // </div>
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
            api_key: `${process.env.REACT_APP_API_URL}`,
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
      <div className="searchStyle">
        <form className="form-inline justify-content-center m-4 mt-2 mb-5">
          <input
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search"
            className="form-control mt-2 inputStyle"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn myButton ml-3 mt-2"
          >
            Go
          </button>
        </form>
      </div>

      <div className=" containera mainContainer ">{renderGifs()}</div>
      {/* <Pagination
        currentPage={currentPage}
        gifsPerPage={gifsPerPage}
        totalGifs={data.length}
        paginate={(number) => setCurrentPage(number)}
        next={() => setCurrentPage(currentPage + 1)}
        previous={() => setCurrentPage(currentPage - 1)}
      /> */}
    </div>
  );
};

export default Giphy;
