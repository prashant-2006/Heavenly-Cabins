import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin, deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import EditCabinForm from "./EditCabinForm";
import { MdEdit, MdDelete } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import Modal from "../../ui/Modal";
import ConfirmDialog from "../../ui/Confirm";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";

const TableComponent = ({ data }) => {
  const queryClient = useQueryClient();
  const [editFormID, setEditFormID] = useState(null);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [cabinToCopy, setCabinToCopy] = useState(null)
  const [deleteFormID, setDeleteFormID] = useState(null);

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading: isCopying, mutate: copyCabin } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("Cabin copied successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const [searchParams] = useSearchParams();
  if(isLoading){
    return <Spinner />
  }
  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sort") || "name-asc";
  let filteredCabin;
  if(filterValue=="all"){
    filteredCabin = data;
  }
  else if(filterValue=="no-discount"){
    filteredCabin = data.filter((cabin)=> cabin.discount===0);
  }
  else if(filterValue=="discount"){
    filteredCabin = data.filter((cabin)=> cabin.discount!==0);
  }

  const sortedData = [...filteredCabin].sort((a, b) => {
    switch (sortValue) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.regularPrice - b.regularPrice;
      case "price-desc":
        return b.regularPrice - a.regularPrice;
      case "capacity-asc":
        return a.maxCapacity - b.maxCapacity;
      case "capacity-desc":
        return b.maxCapacity - a.maxCapacity;
      default:
        return 0;
    }
  });

  return (
    <div className="overflow-x-auto rounded-xl shadow-md relative">
      <table className="min-w-full bg-white text-sm text-left text-gray-700">
        <thead className="bg-green-100 text-gray-800 uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Cabin</th>
            <th className="px-6 py-4">Max Capacity</th>
            <th className="px-6 py-4">Regular Price</th>
            <th className="px-6 py-4">Discount</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-green-50 last:border-b-0">
              <td className="px-6 py-3 font-bold flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-40 object-cover rounded"
                />
                {item.name}
              </td>
              <td className="px-6 py-3">Fits up to {item.maxCapacity} guests</td>
              <td className="px-6 py-3 font-medium">${item.regularPrice}</td>
              <td className="px-6 py-3 text-green-600 font-medium">
                {item.discount ? `$${item.discount}` : "—"}
              </td>
              <td className="px-6 py-3">
                <button
                  onClick={() => {
                    setCabinToCopy(item)
                  }}
                  disabled={isCopying}
                  className="mr-2 px-4 py-1 text-green-600 border border-green-400 hover:bg-green-100 rounded transition duration-200 disabled:opacity-50"
                >
                  <FiCopy size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditFormID(idx);
                    setSelectedCabin(item);
                  }}
                  className="mr-2 px-4 py-1 text-green-600 border border-green-400 hover:bg-green-100 rounded transition duration-200"
                >
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => {setDeleteFormID(item.id);setShowDeleteConfirm(true)}}
                  disabled={isLoading}
                  className="px-4 py-1 text-red-600 border border-red-400 hover:bg-red-100 rounded transition duration-200 disabled:opacity-50"
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal rendered outside table for proper layout */}
      {editFormID !== null && selectedCabin && (
        <Modal onClose={() => setEditFormID(null)}>
          <EditCabinForm
            cabinToEdit={selectedCabin}
            onClose={() => setEditFormID(null)}
          />
        </Modal>
      )}
      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(false)}>
          <ConfirmDialog
            title="Delete Cabin?"
            message="Are you sure you want to delete this cabin? This action cannot be undone."
            confirmText="Delete"
            confirmColor="bg-red-600 hover:bg-red-700 text-white"
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={() => {
              mutate(deleteFormID)
              setShowDeleteConfirm(false);
            }}
          />
        </Modal>
      )}
      {cabinToCopy && (
        <Modal onClose={() => setCabinToCopy(null)}>
          <ConfirmDialog
            title="Copy Cabin?"
            message={`Do you want to make a copy of "${cabinToCopy.name}"?`}
            confirmText="Copy"
            confirmColor="bg-green-600 hover:bg-green-700 text-white"
            onCancel={() => setCabinToCopy(null)}
            onConfirm={() => {
              const { id, ...rest } = cabinToCopy;
              copyCabin({ ...rest, name: `Copy of ${cabinToCopy.name}` });
              setCabinToCopy(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default TableComponent;
