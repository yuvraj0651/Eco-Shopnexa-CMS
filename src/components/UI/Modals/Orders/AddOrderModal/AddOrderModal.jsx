import React, { useState } from "react";
import { IoPersonOutline, IoCubeOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartData } from "@/components/services/OrdersApi";
import { toast } from "sonner";

const AddOrderModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    paymentMethod: "payment-method",
    address: "",
    productName: "",
    quantity: "",
    price: "",
    status: "all-status",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newItem) => addCartData(newItem),
    onSuccess: (newData) => {
      queryClient.setQueryData(["cart"], (oldData = []) => {
        return [...oldData, newData];
      });
      toast.success("Order Created Successfully");
      setOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addMutation.mutate(formData);
    setFormData({
      customerName: "",
      email: "",
      phone: "",
      paymentMethod: "payment-method",
      address: "",
      productName: "",
      quantity: "",
      price: "",
      status: "all-status",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="bg-black/40 backdrop-blur-sm" />

      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto rounded-[10px] border border-slate-200 bg-white p-0 dark:border-slate-800 dark:bg-slate-950">
        {/* HEADER */}
        <DialogHeader className="border-b border-slate-200 p-6 dark:border-slate-800">
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Add New Order
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            Create a new ecommerce order
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 p-6">
            {/* CUSTOMER SECTION */}
            <div className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <IoPersonOutline className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Customer Details
                  </h3>

                  <p className="text-sm text-slate-500">
                    Add customer information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={changeHandler}
                  placeholder="Customer Name"
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Email Address"
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                  placeholder="Phone Number"
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={changeHandler}
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                >
                  <option value="payment-method">Payment Method</option>

                  <option value="cod">COD</option>

                  <option value="upi">UPI</option>

                  <option value="card">Card</option>
                </select>
              </div>

              <textarea
                name="address"
                value={formData.address}
                onChange={changeHandler}
                rows={4}
                placeholder="Shipping Address"
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* PRODUCT SECTION */}
            <div className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600">
                  <IoCubeOutline className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Product Information
                  </h3>

                  <p className="text-sm text-slate-500">Add ordered products</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={changeHandler}
                  placeholder="Product Name"
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={changeHandler}
                  placeholder="Qty"
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={changeHandler}
                  placeholder="Price"
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={changeHandler}
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                >
                  <option value="all-status">Status</option>

                  <option value="pending">Pending</option>

                  <option value="processing">Processing</option>

                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter className="border-t border-slate-200 p-6 dark:border-slate-800">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-12 rounded-2xl"
              >
                Cancel
              </Button>

              <Button
                disabled={addMutation.isPending}
                type="submit"
                className="h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600"
              >
                {addMutation.isPending ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderModal;
