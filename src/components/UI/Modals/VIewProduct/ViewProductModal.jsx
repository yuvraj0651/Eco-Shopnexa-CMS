import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  IoClose,
  IoPricetag,
  IoCube,
  IoCheckmarkCircle,
  IoStar,
} from "react-icons/io5";

const ViewProductModal = React.memo(({ onClose, product }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-3"
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-2xl top-6 max-h-[30rem] h-full overflow-y-auto rounded-3xl bg-white dark:bg-slate-950 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Product Details
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Complete product information
            </p>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <IoClose className="text-xl text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-6">
          {/* PRODUCT IMAGE */}
          <div className="h-64 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <img
              src={
                product?.thumbnail ||
                product?.images?.[0] ||
                "https://placehold.co/600x400?text=No+Image"
              }
              alt={product?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {product?.title || "Product Name"}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                  {product?.brand || "Unknown Brand"} •{" "}
                  {product?.category || "Unknown Category"}
                </p>
              </div>

              {product?.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                  {product.badge}
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {product?.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* PRICE */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2">
                <IoPricetag className="text-emerald-500" />
                <p className="text-xs text-slate-500">Price</p>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                ${product?.price || 0}
              </h4>
            </div>

            {/* STOCK */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2">
                <IoCube className="text-blue-500" />
                <p className="text-xs text-slate-500">Stock</p>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {product?.stock || 0}
              </h4>
            </div>

            {/* STATUS */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2">
                <IoCheckmarkCircle className="text-emerald-500" />
                <p className="text-xs text-slate-500">Status</p>
              </div>

              <h4 className="text-sm font-semibold text-emerald-500">
                {product?.availabilityStatus || "In Stock"}
              </h4>
            </div>

            {/* RATING */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-2">
                <IoStar className="text-yellow-500" />
                <p className="text-xs text-slate-500">Rating</p>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {product?.rating || 0}
              </h4>
            </div>
          </div>

          {/* COLORS */}
          {product?.colors?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                Available Colors
              </h4>

              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border-4 border-white shadow-md"
                    style={{
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SIZES */}
          {product?.sizes?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                Available Sizes
              </h4>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium dark:text-white"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
});

export default ViewProductModal;
