import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  IoAdd,
  IoSearch,
  IoFilter,
  IoDownload,
  IoEllipsisVertical,
} from "react-icons/io5";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI";
import AddProductModal from "../../UI/Modals/AddProduct/AddProductModal";
import EditProductModal from "../../UI/Modals/EditProduct/EditProductModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProductsData } from "../../services/ProductsApi";
import ViewProductModal from "../../UI/Modals/VIewProduct/ViewProductModal";

const ProductListing = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isViewProductModalOpen, setIsViewProductModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewData, setViewData] = useState({});

  const {
    data: productsData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBrand, selectedCategory, selectedStatus]);

  useEffect(() => {
    if (isViewProductModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [isViewProductModalOpen]);

  const saveEdit = useCallback((product) => {
    setEditingId(product.id);
    setEditData(product);
  }, []);

  const viewProductHandler = useCallback((item) => {
    setViewData(item);
  }, []);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["products"], (oldData = []) => {
        return oldData.filter((item) => item.id !== id);
      });
    },
  });

  const deleteProductHandler = (id) => deleteMutation.mutate(id);

  const uniqueBrands = useMemo(() => {
    return [...new Set(productsData.map((p) => p.brand))];
  }, [productsData]);

  const uniqueCategory = useMemo(() => {
    return [...new Set(productsData.map((item) => item.category))];
  }, [productsData]);

  const filteredProducts = useMemo(() => {
    let filteredData = [...productsData];

    if (searchTerm.trim()) {
      filteredData = filteredData?.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedBrand) {
      filteredData = filteredData.filter(
        (item) => item.brand === selectedBrand,
      );
    }

    if (selectedCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === selectedCategory,
      );
    }

    if (selectedStatus) {
      filteredData = filteredData.filter(
        (item) => item.status === selectedStatus,
      );
    }

    return filteredData;
  }, [
    productsData,
    searchTerm,
    selectedBrand,
    selectedCategory,
    selectedStatus,
  ]);

  const itemsPerPage = 6;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(firstItemIndex, lastItemIndex);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Products
        </h1>

        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition"
        >
          <IoAdd />
          Add Product
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT CONTROLS */}
        <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl w-full md:w-64">
            <IoSearch className="text-slate-400" />
            <input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none bg-transparent text-sm text-slate-700 dark:text-white"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 dark:text-white text-sm"
          >
            <option value="">All Categories</option>
            {uniqueCategory.map((category) => (
              <option className="capitalize" key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Brand */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 dark:text-white text-sm"
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 dark:text-white text-sm"
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 dark:text-white text-sm">
            <IoFilter />
            Filters
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 dark:text-white text-sm">
            <IoDownload />
            Export
          </button>
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="min-w-[900px] w-full text-sm">
          {/* HEADER */}
          <thead className="bg-slate-50 dark:bg-slate-800 text-left text-slate-500">
            <tr>
              <th className="p-4">Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Sales</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          {/* BODY (STATIC ROWS) */}
          <tbody>
            {isError ? (
              <tr className="col-span-full w-full">
                <td colSpan={6} className="text-center py-7">
                  <p className="capitalize tracking-wide text-[0.9rem] font-medium">
                    {error.message}
                  </p>
                </td>
              </tr>
            ) : isLoading ? (
              <tr className="col-span-full w-full">
                <td colSpan={6} className="text-center py-7">
                  <p className="capitalize tracking-wide text-[0.9rem] font-medium">
                    loading all products
                  </p>
                </td>
              </tr>
            ) : paginatedProducts?.length === 0 ? (
              <tr className="col-span-full w-full">
                <td colSpan={6} className="text-center py-7">
                  <p className="capitalize tracking-wide text-[0.9rem] font-medium">
                    no products data to show
                  </p>
                </td>
              </tr>
            ) : (
              paginatedProducts?.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  {/* PRODUCT */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700">
                      <img
                        src={item?.thumbnail}
                        alt={item.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {item?.title}
                      </p>
                      <p className="text-xs text-slate-500">{item?.brand}</p>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="text-slate-700 dark:text-slate-300">
                    ${item.price || 0}
                  </td>

                  {/* STOCK */}
                  <td>
                    <span className="px-2 py-1 text-xs rounded-lg bg-emerald-100 text-emerald-600 dark:bg-green-800 dark:text-white">
                      {item?.stock || "24"} in stock
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span className="px-2 py-1 text-xs rounded-lg bg-blue-100 text-blue-600 dark:bg-indigo-700 dark:text-white">
                      {item?.status || "Active"}
                    </span>
                  </td>

                  {/* SALES */}
                  <td className="text-slate-700 dark:text-slate-300">
                    {item?.sales || "120"}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === item.id ? null : item.id)
                      }
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <IoEllipsisVertical className="dark:text-white" />
                    </button>

                    {/* BACKDROP (click outside close feel) */}
                    {openMenuId === item.id && (
                      <div
                        onClick={() => setOpenMenuId(null)}
                        className="fixed inset-0 z-10"
                      />
                    )}

                    {/* DROPDOWN */}
                    <div
                      className={`absolute right-4 top-10 w-44 rounded-xl border border-slate-200 dark:border-slate-800 
                        bg-white dark:bg-slate-700 dark:text-white shadow-xl z-20 transition-all duration-200
                        ${
                          openMenuId === item.id
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2"
                        }`}
                    >
                      <button
                        onClick={() => {
                          saveEdit(item);
                          setIsEditProductModalOpen(true);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        ✏️ Edit Product
                      </button>

                      <button
                        onClick={() => deleteProductHandler(item.id)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-red-500"
                      >
                        🗑️ Delete Product
                      </button>

                      <button
                        onClick={() => {
                          viewProductHandler(item);
                          setIsViewProductModalOpen(true);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        👁️ View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
        <p className="flex-1">
          Showing {filteredProducts.length === 0 ? 0 : firstItemIndex + 1} to{" "}
          {Math.min(lastItemIndex, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </p>
        <Pagination className="flex-1 flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                className={`h-10 px-4 text-[1rem] transition-all duration-300
        ${
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-emerald-600 hover:text-white"
        }`}
              />
            </PaginationItem>
            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  className={`h-10 min-w-10 text-[1rem] transition-all duration-300
          ${
            currentPage === page
              ? "!bg-emerald-600 !text-white border-none"
              : "hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600"
          }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                className={`h-10 px-4 text-[1rem] transition-all duration-300
                ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-emerald-600 hover:text-white"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {isAddProductModalOpen && (
        <div>
          <AddProductModal onClose={() => setIsAddProductModalOpen(false)} />
        </div>
      )}
      {isEditProductModalOpen && (
        <div>
          <EditProductModal
            onClose={() => setIsEditProductModalOpen(false)}
            editData={editData}
            editingId={editingId}
          />
        </div>
      )}
      {isViewProductModalOpen && (
        <ViewProductModal
          onClose={() => setIsViewProductModalOpen(false)}
          product={viewData}
        />
      )}
    </div>
  );
};

export default ProductListing;

