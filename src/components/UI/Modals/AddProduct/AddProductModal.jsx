import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { addNewProduct, getProductsData } from "../../../services/ProductsApi";
import { addProductFormData } from "../../../Data/AddNewProductFormData";
import { createPortal } from "react-dom";
import { toast } from "sonner";

const AddProductModal = React.memo(({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [colors, setColors] = useState([]);

  const queryClient = useQueryClient();

  // GET PRODUCTS
  const { data: productsData = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });

  const addColorHandler = () => {
    if (!selectedColor) return;

    // prevent duplicates
    const alreadyExist = colors.includes(selectedColor);

    if (alreadyExist) {
      toast.warning("Color already added");
      return;
    }

    if (colors.length >= 3) {
      toast.warning("You can only add maximum 3 colors");
      return;
    }

    setColors((prev) => [...prev, selectedColor]);
    console.log("Selected Colors: ", selectedColor, colors);
    setSelectedColor("");
  };

  const removeColorHandler = (colorName) => {
    setColors((prev) => prev.filter((item) => item !== colorName));
  };

  // UNIQUE BRANDS
  const uniqueBrands = useMemo(() => {
    return [...new Set(productsData.map((item) => item.brand))];
  }, [productsData]);

  // UNIQUE CATEGORY
  const uniqueCategory = useMemo(() => {
    return [...new Set(productsData.map((item) => item.category))];
  }, [productsData]);

  const uniqueColors = useMemo(() => {
    const allColors = productsData.flatMap((item) => item.colors || []);

    return [...new Set(allColors)];
  }, [productsData]);

  // INPUT CHANGE
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // VALIDATE IMAGE TYPE
    if (!file.type.startsWith("image/")) {
      toast.warning("Please upload valid image");
      return;
    }

    // VALIDATE IMAGE SIZE
    if (file.size > 2 * 1024 * 1024) {
      toast.warning("Image size should be less than 2MB");
      return;
    }

    // PREVIEW IMAGE
    const imagePreviewUrl = URL.createObjectURL(file);
    setPreviewImage(imagePreviewUrl);

    setImageUrl(imagePreviewUrl);

    setErrors((prev) => ({
      ...prev,
      productImage: "",
    }));
  };

  // VALIDATE FORM
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    }

    if (!formData.stock) {
      newErrors.stock = "Stock is required";
    }

    if (colors.length < 3) {
      newErrors.colors = "Minimum 3 colors required";
    }

    if (!imageUrl) {
      newErrors.productImage = "Product image is required";
    }

    return newErrors;
  };

  // ADD PRODUCT MUTATION
  const addMutation = useMutation({
    mutationFn: addNewProduct,

    onSuccess: (newData) => {
      queryClient.setQueryData(["products"], (oldData = []) => [
        ...oldData,
        newData,
      ]);

      toast.success("New Product Added Successfully");

      // RESET FORM
      setFormData({
        title: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
      });

      setPreviewImage("");
      setImageUrl("");
      setErrors({});

      onClose();
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateFormErr = validateForm();

    setErrors(validateFormErr);

    // STOP IF ERRORS
    if (Object.keys(validateFormErr).length > 0) return;

    // FINAL PRODUCT OBJECT
    const newProduct = {
      id: Date.now().toString(),

      title: formData.title,

      description:
        formData.description || "Premium quality product available now.",

      category: formData.category,

      brand: formData.brand,

      price: Number(formData.price),

      stock: Number(formData.stock),

      discountPercentage: 0,

      rating: 0,

      badge: "New In",

      isNew: true,

      wishlist: false,

      sku: `SKU-${Date.now()}`,

      availabilityStatus:
        Number(formData.stock) > 0 ? "In Stock" : "Out Of Stock",

      shippingInformation: "Ships in 3-5 business days",

      returnPolicy: "7 day return policy",

      warrantyInformation: "No warranty",

      minimumOrderQuantity: 1,

      tags: [formData.category, formData.brand],

      colors: ["#000000", "#ffffff"],

      sizes: ["S", "M", "L"],

      dimensions: {
        width: 10,
        height: 10,
        depth: 10,
      },

      weight: 1,

      reviews: [],

      images: [imageUrl],

      subImages: [imageUrl],

      thumbnail: imageUrl,

      meta: {
        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),

        barcode: Math.random().toString().slice(2, 14),

        qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
      },
    };

    addMutation.mutate(newProduct);
  };

  return createPortal(
    <div className="fixed left-0 right-0 bottom-0 top-16 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3">
      <div className="w-full md:max-w-2xl max-h-[80vh] flex flex-col rounded-2xl bg-white dark:bg-slate-950 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Add Product
          </h2>

          <button onClick={onClose} className="text-slate-500 text-xl">
            ✕
          </button>
        </div>

        <form
          id="add-form"
          onSubmit={handleSubmit}
          className="p-4 space-y-4 overflow-y-auto"
        >
          {addProductFormData.map((field) => {
            return field.name === "description" ? (
              <div>
                <textarea
                  rows={4}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData.description}
                  onChange={changeHandler}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent outline-none resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={changeHandler}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent outline-none"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            );
          })}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="category"
                value={formData.category}
                onChange={changeHandler}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select Category</option>
                {uniqueCategory.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <select
                name="brand"
                value={formData.brand}
                onChange={changeHandler}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select Brand</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add Size"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-xl bg-transparent dark:border-slate-600"
              />

              <button
                type="button"
                onClick={() => {
                  if (!sizeInput.trim()) return;

                  setSizes((prev) => [...prev, sizeInput]);
                  setSizeInput("");
                }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full"
                >
                  <span>{size}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setSizes((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* SELECT + BUTTON */}
            <div className="flex gap-3">
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="flex-1 px-4 py-3 border rounded-xl dark:bg-slate-700 dark:text-white dark:border-slate-600"
              >
                <option value="">Select Color</option>

                {uniqueColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={addColorHandler}
                className="px-4 py-3 bg-emerald-500 text-white rounded-xl"
              >
                Add
              </button>
            </div>

            {/* COLOR RINGS */}
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <div key={color} className="relative group">
                  <div
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                    style={{
                      backgroundColor: color,
                    }}
                  />

                  {/* REMOVE BTN */}
                  <button
                    type="button"
                    onClick={() => removeColorHandler(color)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ERROR */}
            {errors.colors && (
              <p className="text-red-500 text-sm">{errors.colors}</p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-sm"
            />

            {errors.productImage && (
              <p className="text-red-500 text-sm mt-1">{errors.productImage}</p>
            )}
          </div>

          {/* IMAGE PREVIEW */}
          {previewImage && (
            <div className="w-40 h-40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </form>

        {/* FOOTER */}
        <div className="flex gap-4 p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="add-form"
            disabled={addMutation.isPending}
            className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-medium"
          >
            {addMutation.isPending ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
});

export default AddProductModal;
