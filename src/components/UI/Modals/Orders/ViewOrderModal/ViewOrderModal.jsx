import React from "react";

import {
  IoPersonOutline,
  IoCallOutline,
  IoCardOutline,
} from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/UI";

const ViewOrderModal = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-y-auto rounded-[10px] border border-slate-200 bg-white p-0 dark:border-slate-800 dark:bg-slate-950">

        {/* HEADER */}
        <DialogHeader className="border-b border-slate-200 p-6 dark:border-slate-800">
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Order Details
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            Order ID #ORD-2026-001
          </DialogDescription>
        </DialogHeader>

        {/* BODY */}
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">

          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
                Ordered Products
              </h3>

              <div className="space-y-4">

                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="flex items-center gap-4">

                      <img
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                        alt="product"
                        className="h-20 w-20 rounded-2xl object-cover"
                      />

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          Nike Sneakers
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                          Qty: 2
                        </p>
                      </div>

                    </div>

                    <h4 className="text-lg font-bold text-emerald-600">
                      ₹8,999
                    </h4>

                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* CUSTOMER */}
            <div className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">

              <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
                Customer
              </h3>

              <div className="space-y-5">

                <div className="flex items-center gap-3">
                  <IoPersonOutline className="text-xl text-emerald-600" />

                  <p className="text-slate-700 dark:text-white">
                    Yuvraj
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <IoCallOutline className="text-xl text-cyan-600" />

                  <p className="text-slate-700 dark:text-white">
                    +91 9876543210
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <IoCardOutline className="text-xl text-purple-600" />

                  <p className="text-slate-700 dark:text-white">
                    UPI Payment
                  </p>
                </div>

              </div>
            </div>

            {/* STATUS */}
            <div className="rounded-3xl bg-emerald-500 p-5 text-white">

              <p className="text-sm opacity-80">
                Order Status
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Delivered
              </h3>

            </div>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ViewOrderModal;