import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const UpdateOrderModal = ({ open, setOpen, editData, editingId }) => {
  const [formData, setFormData] = useState({
    productName: "",
    email: "",
    phone: "",
    status: "",
    address: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        productName: editData?.productName,
        email: editData?.email,
        phone: editData?.phone,
        status: editData?.status,
        address: editData?.address,
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

  console.log(editData);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-[10px] border border-slate-200 bg-white p-0 dark:border-slate-800 dark:bg-slate-950">
        {/* HEADER */}
        <DialogHeader className="border-b border-slate-200 p-6 dark:border-slate-800">
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Update Order
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            Edit order information
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <div className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={changeHandler}
              className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={changeHandler}
              className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />

            <select
              name="status"
              value={formData.status}
              onChange={changeHandler}
              className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            >
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <textarea
            rows={5}
            name="address"
            value={formData.address}
            onChange={changeHandler}
            defaultValue="House No. 51, Phase-6, Mohali"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {/* FOOTER */}
        <DialogFooter className="border-t border-slate-200 p-6 dark:border-slate-800">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="h-12 rounded-2xl">
                Cancel
              </Button>
            </DialogClose>

            <Button className="h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600">
              Update Order
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrderModal;
