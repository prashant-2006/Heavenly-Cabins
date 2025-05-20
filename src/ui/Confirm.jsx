import React from "react";

const ConfirmDialog = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  confirmColor = "bg-green-600 hover:bg-green-700 text-white",
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {message && <p className="text-gray-600">{message}</p>}

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 rounded ${confirmColor} transition`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;