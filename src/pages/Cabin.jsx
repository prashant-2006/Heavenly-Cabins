import React, { useState } from "react";
import CabinTable from "../features/cabins/cabinTable";
import AddCabinForm from "../features/cabins/AddCabinForm";
import Modal from "../ui/Modal";
import { useSearchParams } from "react-router-dom";

function Cabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("discount") || "all";
  const sort = searchParams.get("sort") || "name-asc"; // default

  function handleFilterClick(value) {
    searchParams.set("discount", value);
    setSearchParams(searchParams);
  }

  function handleSortChange(e) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <>
      {/* Heading + Filters + Sort Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 gap-4">
        <h1 className="text-2xl font-medium ml-4">All Cabins</h1>

        <div className="flex flex-wrap items-center gap-4">
          {/* Filter Buttons */}
          <div className="space-x-2">
            <button
              onClick={() => handleFilterClick("all")}
              className={`px-4 py-1 rounded-full font-medium text-sm ${
                filter === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-green-50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterClick("discount")}
              className={`px-4 py-1 rounded-full font-medium text-sm ${
                filter === "discount"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-green-50"
              }`}
            >
              With Discount
            </button>
            <button
              onClick={() => handleFilterClick("no-discount")}
              className={`px-4 py-1 rounded-full font-medium text-sm ${
                filter === "no-discount"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-green-50"
              }`}
            >
              No Discount
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={handleSortChange}
            className="bg-white shadow-lg text-sm px-3 py-1 rounded-md font-medium text-gray-800 focus:outline-none hover:bg-green-50 mr-4"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
            <option value="capacity-asc">Capacity Low to High</option>
            <option value="capacity-desc">Capacity High to Low</option>
          </select>
        </div>
      </div>

      {/* Cabin Table */}
      <div className="w-full overflow-x-auto px-4 md:px-8">
        <CabinTable filter={filter} sort={sort} />
      </div>

      {/* Add Cabin Button */}
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg min-w-full transition duration-200 my-6"
      >
        Add New Cabin
      </button>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddCabinForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default Cabin;
