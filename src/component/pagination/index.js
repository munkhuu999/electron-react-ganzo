import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import TableTest from "../table";

const PaginatedItems = ({ itemsPerPage, testData }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = testData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(testData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % testData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col">
      <TableTest testData={currentItems} />
      <div className=" flex justify-end">
        <ReactPaginate
          breakLabel="..."
          previousLabel="< "
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination flex "
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default PaginatedItems;
