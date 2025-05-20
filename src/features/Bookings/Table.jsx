import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";
import { FaTrash } from "react-icons/fa";

const statusStyles = {
  unconfirmed: "bg-yellow-100 text-yellow-800",
  "checked-in": "bg-green-100 text-green-800",
  "checked-out": "bg-blue-100 text-blue-800",
};

const TableComponent = ({ data }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { deleteBooking, isDeleting } = useDeleteBooking();

  function handleDeleteClick(e, id) {
    e.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  }

  function confirmDelete() {
    deleteBooking(selectedId);
    setShowModal(false);
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full bg-white text-sm text-left text-gray-700">
        <thead className="bg-green-100 text-gray-800 uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Cabin</th>
            <th className="px-6 py-4">Guest</th>
            <th className="px-6 py-4">Dates</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((booking, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-200 hover:bg-green-50 last:border-b-0 cursor-pointer"
              onClick={() => navigate(`/bookingdetail/${booking.id}`)}
            >
              <td className="px-6 py-3 font-semibold">{booking.cabins.name}</td>
              <td className="px-6 py-3">{booking.guests.fullName}</td>
              <td className="px-6 py-3">
                {new Date(booking.startDate).toLocaleDateString()} →{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    statusStyles[booking.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-3 font-medium text-gray-900">${booking.totalPrice}</td>
              <td
                className="px-6 py-3 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => handleDeleteClick(e, booking.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Delete</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete booking #{selectedId}?
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                onClick={() => setShowModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TableComponent;
