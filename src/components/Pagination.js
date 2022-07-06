import React from "react";
import "./paginationStyle.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Pagination = ({
  gifsPerPage,
  totalGifs,
  paginate,
  currentPage,
  next,
  previous,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalGifs / gifsPerPage); i++) {
    pageNumbers.push(i);
  }
  const totalPage = Math.ceil(totalGifs / gifsPerPage);

  return (
    <div className="andContainer">

      {totalGifs !== 0 && totalGifs > 12 ? (
        <div>
          <div className="row andCol">
            <div className="col">
              <div className="btn-group dropup">
                <button
                  id="dropupbtn"
                  type="button"
                  className="btn pageBtn dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ marginRight: "5%" }}
                >
                  {currentPage}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    {pageNumbers.map((number) => (
                      <label key={number} className="page-item" >
                        <a onClick={() => paginate(number)} className="page-link">
                          {number}
                        </a>
                      </label>
                    ))}
                  </li>
                </ul>
              
              </div>
              </div>
              <div className="col">
              <div style={{ paddingTop: "0px" }}>
                {
                  (currentPage === 1 ? (
                    <button className="prevBtn" style={{ paddingTop:"0px", color: "#FFFFFF" }} disabled hidden onClick={() => previous()}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                  ) : (
                    <button className="nextBtn" style={{ paddingTop:"0px", color: "#FFFFFF" }} onClick={() => previous()}> <FontAwesomeIcon icon={faAngleLeft} /> </button>
                  ))
                }
                {
                  currentPage === totalPage ? (
                    <button className="nextBtn"  style={{ paddingTop:"0px", color: "#FFFFFF" }} disabled hidden onClick={() => next()}>  <FontAwesomeIcon icon={faAngleRight} /> </button>
                  ) : (
                    <button className="nextBtn"  style={{ paddingTop:"0px", color: "#FFFFFF" }} onClick={() => next()}> <FontAwesomeIcon icon={faAngleRight} /></button>
                  )
                }
              </div>
            </div>

          </div>
        </div>
      ) : null}
    </div>
    //   </div >
    // </div >
  );
};
export default Pagination;
