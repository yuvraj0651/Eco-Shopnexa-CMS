import React, { useMemo, useState } from "react";
import {
  IoSearch,
  IoFilter,
  IoEllipsisVertical,
  IoBanOutline,
  IoCheckmarkCircleOutline,
  IoEyeOutline,
  IoTrendingUpOutline,
  IoPeopleOutline,
  IoWalletOutline,
  IoStarOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Input,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI";

const customerData = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    totalSpent: 1420,
    orders: 18,
    loyalty: 88,
    status: "Active",
    blocked: false,
    joined: "12 Jan 2026",
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    totalSpent: 920,
    orders: 11,
    loyalty: 62,
    status: "VIP",
    blocked: false,
    joined: "03 Feb 2026",
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    totalSpent: 250,
    orders: 4,
    loyalty: 28,
    status: "Blocked",
    blocked: true,
    joined: "18 Mar 2026",
  },
  {
    id: 4,
    name: "Simran Kaur",
    email: "simran@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    totalSpent: 1890,
    orders: 25,
    loyalty: 96,
    status: "Premium",
    blocked: false,
    joined: "27 Apr 2026",
  },
];

const purchaseHistory = [
  {
    id: "ORD-1021",
    customer: "Aarav Sharma",
    amount: "$240",
    status: "Delivered",
    date: "27 May 2026",
  },
  {
    id: "ORD-1022",
    customer: "Priya Mehta",
    amount: "$180",
    status: "Processing",
    date: "26 May 2026",
  },
  {
    id: "ORD-1023",
    customer: "Simran Kaur",
    amount: "$410",
    status: "Delivered",
    date: "25 May 2026",
  },
];

const CustomerStats = () => {
  const stats = [
    {
      title: "Total Customers",
      value: "12,480",
      icon: <IoPeopleOutline className="text-2xl" />,
      growth: "+12%",
    },
    {
      title: "Revenue Generated",
      value: "$84,320",
      icon: <IoWalletOutline className="text-2xl" />,
      growth: "+18%",
    },
    {
      title: "Loyal Customers",
      value: "1,420",
      icon: <IoStarOutline className="text-2xl" />,
      growth: "+8%",
    },
    {
      title: "Retention Rate",
      value: "78%",
      icon: <IoTrendingUpOutline className="text-2xl" />,
      growth: "+5%",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </h2>

                  <Badge className="mt-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {item.growth}
                  </Badge>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  {item.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const UserProfileCard = ({ customer }) => {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-4 border-emerald-500/20">
            <AvatarImage src={customer.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            {customer.name}
          </h2>

          <p className="text-sm text-slate-500">{customer.email}</p>

          <Badge className="mt-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            {customer.status}
          </Badge>

          <div className="mt-6 w-full space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Loyalty Score</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {customer.loyalty}%
                </span>
              </div>

              <Progress value={customer.loyalty} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <p className="text-xs text-slate-500">Orders</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {customer.orders}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <p className="text-xs text-slate-500">Spent</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  ${customer.totalSpent}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomerTable = ({ customers, searchTerm }) => {
  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [customers, searchTerm]);

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
          Customers
        </CardTitle>

        <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600">
          Add Customer
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Loyalty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {customer.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{customer.orders}</TableCell>

                  <TableCell>${customer.totalSpent}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={customer.loyalty} className="h-2 w-28" />

                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {customer.loyalty}%
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`rounded-full px-3 py-1 ${
                        customer.blocked
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>

                  <TableCell>{customer.joined}</TableCell>

                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <IoEllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <IoEyeOutline className="mr-2" />
                            View Profile
                          </DropdownMenuItem>

                          {customer.blocked ? (
                            <DropdownMenuItem>
                              <IoCheckmarkCircleOutline className="mr-2" />
                              Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <IoBanOutline className="mr-2" />
                              Block User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const PurchaseHistory = () => {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
          Purchase History
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {purchaseHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {item.id}
                </h3>

                <p className="text-sm text-slate-500">{item.customer}</p>
              </div>

              <div className="text-right">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {item.amount}
                </h4>

                <p className="text-sm text-slate-500">{item.date}</p>
              </div>

              <Badge className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Customers
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage customers, loyalty & analytics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers..."
              className="h-12 rounded-2xl border border-slate-200 bg-white pl-10 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <Button
            variant="outline"
            className="h-12 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <IoFilter className="mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* STATS */}
      <CustomerStats />

      {/* CONTENT */}
      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <TabsTrigger
            value="customers"
            className="rounded-xl px-5 py-2 text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
          >
            Customers
          </TabsTrigger>

          <TabsTrigger
            value="analytics"
            className="rounded-xl px-5 py-2 text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>

          <TabsTrigger
            value="history"
            className="rounded-xl px-5 py-2 text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
          >
            Purchase History
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
          <UserProfileCard customer={customerData[0]} />

          <CustomerTable customers={customerData} searchTerm={searchTerm} />
        </div>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {customerData.map((item) => (
              <Card
                key={item.id}
                className="h-fit rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        ${item.totalSpent} spent
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-500">Engagement</span>

                      <span className="font-medium text-slate-900 dark:text-white">
                        {item.loyalty}%
                      </span>
                    </div>

                    <Progress value={item.loyalty} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <PurchaseHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Customers;
