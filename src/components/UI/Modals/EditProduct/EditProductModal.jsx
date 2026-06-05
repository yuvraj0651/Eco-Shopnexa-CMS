import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { updateProduct } from "../../../services/ProductsApi";
import { editFormData } from "../../../Data/EditProductFormData";
import { createPortal } from "react-dom";
import { toast } from "sonner";

const EditProductModal = React.memo(({ onClose, editData }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    status: "",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        price: editData.price || "",
        stock: editData.stock || "",
        status: editData.availabilityStatus || "",
      });
    }
  }, [editData]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateProduct(id, updatedData),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["products"], (oldData = []) => {
        return oldData.map((item) =>
          String(item.id) === String(updatedData.id) ? updatedData : item,
        );
      });
      toast.success("Product Updated Successfully");
      onClose();
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed To Update Product");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...editData,
      title: formData.title,
      price: Number(formData.price),
      stock: Number(formData.stock),
      availabilityStatus: formData.status,
    };
    updateMutation.mutate({
      id: String(editData.id),
      updatedData: updatedProduct,
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-3">
      <div className="w-full md:max-w-2xl rounded-2xl bg-white dark:bg-slate-950 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold dark:text-white">Edit Product</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form
          id="update-form"
          onSubmit={handleSubmit}
          className="p-4 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editFormData.map((field) => {
              return field.type === "select" ? (
                <select
                  key={field.id}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={changeHandler}
                  className="input bg-transparent dark:text-white dark:border-white"
                >
                  {field.options.map((opt) => (
                    <option key={opt.id} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div
                  key={field.id}
                  className={
                    field.width === "full" ? "md:col-span-2" : "md:col-span-1"
                  }
                >
                  <label className="block mb-2 text-sm font-medium dark:text-white capitalize">
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={changeHandler}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white outline-none"
                  />
                </div>
              );
            })}
          </div>
        </form>

        <div className="flex gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded-xl dark:text-white dark:border-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="update-form"
            disabled={updateMutation.isPending}
            className="flex-1 py-2 bg-emerald-500 text-white rounded-xl disabled:opacity-50 dark:text-white"
          >
            {updateMutation.isPending ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
});

export default EditProductModal;
