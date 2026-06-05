import React, { useEffect, useMemo, useState } from "react";
import {
  IoSearch,
  IoFilter,
  IoDownload,
  IoEyeOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoReceiptOutline,
  IoRefreshOutline,
  IoLocationOutline,
} from "react-icons/io5";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
  Badge,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Input,
} from "@/components/UI";
import AddOrderModal from "@/components/UI/Modals/Orders/AddOrderModal/AddOrderModal";
import UpdateOrderModal from "@/components/UI/Modals/Orders/UpdateOrderModal/UpdateOrderModal";
import ViewOrderModal from "@/components/UI/Modals/Orders/ViewOrderModal/ViewOrderModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCartData, getCartData } from "@/components/services/OrdersApi";
import { getUsersData } from "@/components/services/UsersApi";
import TableSkeleton from "@/components/UI/Skeleton/TableSkeleton";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState([]);

  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [isUpdateOrderModalOpen, setIsUpdateOrderModalOpen] = useState(false);
  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);

  const {
    data: cartData = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
    refetchOnWindowFocus: true,
  });

  const { data: userData = [] } = useQuery({
    queryKey: ["user"],
    queryFn: getUsersData,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, paymentFilter, dateFilter]);

  const toggleAddOrderModal = () => {
    setIsAddOrderModalOpen((prev) => !prev);
  };

  const toggleUpdateOrderModal = () => {
    setIsUpdateOrderModalOpen((prev) => !prev);
  };

  const toggleViewOrderModal = () => {
    setIsViewOrderModalOpen((prev) => !prev);
  };

  const saveEdit = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const filteredOrders = cartData.filter((order) => {
    const matchesSearch =
      order?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order?.id).includes(searchTerm);

    const matchesStatus = statusFilter
      ? order?.status?.toLowerCase() === statusFilter.toLowerCase()
      : true;

    const matchesPayment = paymentFilter
      ? order?.payment?.toLowerCase() === paymentFilter.toLowerCase()
      : true;

    const matchesDate = dateFilter ? order?.date === dateFilter : true;

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const getPaymentBadge = (payment) => {
    switch (payment) {
      case "Paid":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";

      case "Pending":
        return "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400";

      case "Failed":
        return "bg-red-500/15 text-red-600 dark:text-red-400";

      default:
        return "bg-slate-500/15 text-slate-600 dark:text-slate-400";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";

      case "Processing":
        return "bg-blue-500/15 text-blue-600 dark:text-blue-400";

      case "Shipped":
        return "bg-purple-500/15 text-purple-600 dark:text-purple-400";

      case "Cancelled":
        return "bg-red-500/15 text-red-600 dark:text-red-400";

      default:
        return "bg-slate-500/15 text-slate-600 dark:text-slate-400";
    }
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCartData(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["cart"], (oldData = []) => {
        return oldData.filter((item) => item.id !== id);
      });
    },
  });

  const deleteHandler = (id) => deleteMutation.mutate(id);

  const itemsPerPage = 6;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const paginatedOrders = useMemo(() => {
    return filteredOrders.slice(firstItemIndex, lastItemIndex);
  }, [filteredOrders, firstItemIndex, lastItemIndex]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / itemsPerPage),
  );
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6 p-4 md:p-2">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            Orders
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage customer orders, refunds & shipping
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={toggleAddOrderModal}
            variant="outline"
            className="flex items-center h-auto leading-none gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 hover:text-white"
          >
            + Add Order
          </Button>

          <Button
            variant="outline"
            className="flex items-center h-auto leading-none gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <IoDownload />
            Export
          </Button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          {/* LEFT */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* SEARCH */}
            <div className="relative w-full md:w-72">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

              <Input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {/* STATUS */}
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="!h-11 w-full max-w-[19%] rounded-xl border border-slate-200 leading-none bg-white px-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[0.9rem]">
                    All Status
                  </SelectLabel>
                  <SelectItem value="Delivered" className="text-[0.9rem]">
                    Delivered
                  </SelectItem>
                  <SelectItem value="Processing" className="text-[0.9rem]">
                    Processing
                  </SelectItem>
                  <SelectItem value="Shipped" className="text-[0.9rem]">
                    Shipped
                  </SelectItem>
                  <SelectItem value="Cancelled" className="text-[0.9rem]">
                    Cancelled
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* PAYMENT */}
            <Select
              value={paymentFilter}
              onValueChange={(value) => setPaymentFilter(value)}
            >
              <SelectTrigger className="!h-11 w-full max-w-[19%] rounded-xl border border-slate-200 leading-none bg-white px-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-700">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[0.9rem]">Payment</SelectLabel>
                  <SelectItem value="Paid" className="text-[0.9rem]">
                    Paid
                  </SelectItem>
                  <SelectItem value="Pending" className="text-[0.9rem]">
                    Pending
                  </SelectItem>
                  <SelectItem value="Failed" className="text-[0.9rem]">
                    Failed
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* DATE */}
            <Input
              type="date"
              name="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-11 rounded-xl border max-w-[23%] w-full border-slate-200 bg-white px-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            {(searchTerm || statusFilter || paymentFilter || dateFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("");
                  setPaymentFilter("");
                  setDateFilter("");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex items-center h-auto leading-none gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <IoFilter />
              Filters
            </Button>

            <Button
              variant="outline"
              className="flex items-center h-auto leading-none gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <IoReceiptOutline />
              Generate Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-[1100px] w-full">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payment
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tracking
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isError ? (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  <p className="tracking-wide font-medium">
                    {error.message || "Something went wrong"}
                  </p>
                </td>
              </tr>
            ) : isLoading ? (
              <TableSkeleton />
            ) : paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  <p className="tracking-wide font-medium">
                    No orders data to show
                  </p>
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  {/* ORDER ID */}
                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      ORD-{order.id}
                    </p>
                  </td>
                  {/* CUSTOMER */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div>
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                          />
                          <AvatarFallback>ER</AvatarFallback>
                          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                        </Avatar>
                      </div>

                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {userData[0]?.username || "Guest User"}
                        </p>

                        <p className="text-xs text-slate-500">
                          Premium Customer
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                    {order.date || "27 May 2026"}
                  </td>

                  {/* TOTAL */}
                  <td className="px-6 py-5 font-semibold text-slate-900 dark:text-white">
                    {(order.price * order.quantity).toFixed(2) || 0}
                  </td>

                  {/* PAYMENT */}
                  <td className="px-6 py-5">
                    <Badge
                      className={`rounded-full px-3 py-1 h-auto leading-none text-xs font-semibold ${getPaymentBadge(
                        order.payment,
                      )}`}
                    >
                      {order.payment || "Paid"}
                    </Badge>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <Badge
                      className={`rounded-full px-3 py-1 h-auto leading-none text-xs font-semibold ${getStatusBadge(
                        order.status,
                      )}`}
                    >
                      {order.status || "Shipped"}
                    </Badge>
                  </td>

                  {/* TRACKING */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <IoLocationOutline className="text-emerald-500" />
                      {order.tracking || "Shipped"}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={toggleViewOrderModal}
                            variant="outline"
                            size="icon"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <IoEyeOutline />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Order</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => {
                              saveEdit(order);
                              toggleUpdateOrderModal();
                            }}
                            size="icon"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <IoCreateOutline />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Update Order</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <IoRefreshOutline
                              className={`${isFetching ? "animate-spin" : ""}`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Refresh Order</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => deleteHandler(order.id)}
                            size="icon"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <IoTrashOutline />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Order</TooltipContent>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {paginatedOrders.length} order
          {paginatedOrders.length > 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                href="#"
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
                onClick={(e) => {
                  e.preventDefault();

                  if (currentPage > 1) {
                    setCurrentPage((prev) => prev - 1);
                  }
                }}
              />
              {pageNumbers.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                href="#"
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
                onClick={(e) => {
                  e.preventDefault();

                  if (currentPage < totalPages) {
                    setCurrentPage((prev) => prev + 1);
                  }
                }}
              />
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      {isAddOrderModalOpen && (
        <div>
          <AddOrderModal
            open={isAddOrderModalOpen}
            setOpen={setIsAddOrderModalOpen}
          />
        </div>
      )}
      {isUpdateOrderModalOpen && (
        <div>
          <UpdateOrderModal
            editData={editData}
            editingId={editingId}
            open={isUpdateOrderModalOpen}
            setOpen={setIsUpdateOrderModalOpen}
          />
        </div>
      )}
      {isViewOrderModalOpen && (
        <div>
          <ViewOrderModal
            open={isViewOrderModalOpen}
            setOpen={setIsViewOrderModalOpen}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
