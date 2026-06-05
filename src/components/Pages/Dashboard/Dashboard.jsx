import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Progress,
} from "@/components/UI";
import {
  IoCart,
  IoCube,
  IoPeople,
  IoStatsChart,
  IoTrendingUp,
  IoTrendingDown,
} from "react-icons/io5";
import { getCartData } from "../../services/OrdersApi";
import { useQuery } from "@tanstack/react-query";
import { getProductsData } from "../../services/ProductsApi";
import { getUsersData } from "../../services/UsersApi";
import DashboardSkeleton from "@/components/UI/Skeleton/DashboardSkeleton";

const COLORS = ["#10b981", "#06b6d4", "#6366f1", "#f59e0b"];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#10b981",
  },

  orders: {
    label: "Orders",
    color: "#06b6d4",
  },

  sales: {
    label: "Sales",
    color: "#6366f1",
  },
};

const activity = [
  "New order placed by Aman Singh",
  "Product stock updated: iPhone 15",
  "New customer registered",
  "Order #ORD-1023 cancelled",
];

const Dashboard = () => {
  const { data: orderData = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getCartData,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });

  const { data: productsData = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });

  const { data: usersData = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersData,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });

  const totalOrders = orderData ? orderData.length : 0;

  const totalProducts = productsData ? productsData.length : 0;

  const totalUsers = usersData ? usersData.length : 0;

  const revenueData = useMemo(() => {
    if (!orderData || orderData.length === 0) {
      return [
        { name: "Mon", revenue: 1 },
        { name: "Tue", revenue: 2 },
        { name: "Wed", revenue: 3 },
        { name: "Thu", revenue: 4 },
        { name: "Fri", revenue: 5 },
        { name: "Sat", revenue: 6 },
        { name: "Sun", revenue: 7 },
      ];
    }

    const map = {};

    orderData.forEach((order) => {
      const day = new Date(order.id).toLocaleDateString("en-US", {
        weekday: "short",
      });

      map[day] = (map[day] || 0) + Number(order.amount || 0);
    });

    return Object.keys(map).map((day) => ({
      name: day,
      revenue: map[day],
    }));
  }, [orderData]);

  const barData = useMemo(() => {
    let orders = 0;
    let sales = 0;
    let returns = 0;
    let cancelled = 0;

    orderData.forEach((o) => {
      const status = o.status?.toLowerCase();

      if (status === "delivered") sales++;
      else if (status === "returned") returns++;
      else if (status === "cancelled") cancelled++;
      orders++;
    });

    return [
      { name: "Orders", value: orders || 1 },
      { name: "Sales", value: sales || 0 },
      { name: "Returns", value: returns || 0 },
      { name: "Cancelled", value: cancelled || 0 },
    ];
  }, [orderData]);

  const groupByCategory = (arr = []) => {
    const map = {};

    arr.forEach((item) => {
      const category = item?.category || "Other";

      map[category] = (map[category] || 0) + 1;
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  };

  const categoryPieData = useMemo(() => {
    return groupByCategory(productsData);
  }, [productsData]);
  console.log(categoryPieData);

  const totalRevenue = orderData.reduce((acc, order) => {
    return acc + Number(order.price || 0) * Number(order.quantity || 1);
  }, 0);

  const stats = [
    {
      id: 1,
      title: "Revenue",
      value: `${totalRevenue.toFixed(2)}`,
      change: "+12.5%",
      trend: "up",
      icon: <IoStatsChart />,
    },
    {
      id: 2,
      title: "Orders",
      value: totalOrders,
      change: "+8.2%",
      trend: "up",
      icon: <IoCart />,
    },
    {
      id: 3,
      title: "Products",
      value: totalProducts,
      change: "-2.1%",
      trend: "down",
      icon: <IoCube />,
    },
    {
      id: 4,
      title: "Customers",
      value: totalUsers,
      change: "+5.4%",
      trend: "up",
      icon: <IoPeople />,
    },
  ];

  if (ordersLoading || productsLoading || usersLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time analytics of your ecommerce performance
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card
            key={s.id}
            className="rounded-2xl border-slate-200 transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:hover:bg-slate-800 cursor-pointer"
          >
            <CardContent className="py-2 px-5">
              <div className="flex items-center justify-between">
                {/* LEFT */}
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {s.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {s.value}
                  </h2>

                  <div
                    className={`mt-3 flex items-center gap-1 text-xs font-semibold ${
                      s.trend === "up" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {s.trend === "up" ? (
                      <IoTrendingUp className="text-sm" />
                    ) : (
                      <IoTrendingDown className="text-sm" />
                    )}

                    {s.change}
                  </div>
                </div>

                {/* RIGHT ICON */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-emerald-500/10 text-xl text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                        {s.icon}
                      </div>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Total {s.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Target</span>
                  <span>68%</span>
                </div>

                <Progress value={68} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* LINE CHART */}
        <Card className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          {/* HEADER */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Analytics Overview</CardTitle>

              <CardDescription>Sales analytics overview</CardDescription>
            </div>

            <div className="flex items-center gap-3">
              {/* TABS */}
              <Tabs defaultValue="revenue">
                <TabsList>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* SELECT */}
              <Select defaultValue="weekly">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          {/* BODY */}
          <CardContent>
            <Tabs defaultValue="revenue">
              {/* REVENUE */}
              <TabsContent value="revenue">
                <div className="h-72">
                  <ChartContainer
                    config={chartConfig}
                    className="h-full w-full"
                  >
                    <LineChart data={revenueData}>
                      <XAxis dataKey="name" />
                      <YAxis />

                      <ChartTooltip content={<ChartTooltipContent />} />

                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </TabsContent>

              {/* ORDERS */}
              <TabsContent value="orders">
                <div className="h-72">
                  <ChartContainer
                    config={chartConfig}
                    className="h-full w-full"
                  >
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />

                      <ChartTooltip content={<ChartTooltipContent />} />

                      <Bar
                        dataKey="value"
                        fill="var(--color-orders)"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </TabsContent>

              {/* CUSTOMERS */}
              <TabsContent value="customers">
                <div className="flex h-72 items-center justify-center text-sm text-slate-500">
                  Customers analytics coming soon
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* PIE CHART */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Category Split
          </h2>

          <div className="h-72">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />

                <Pie
                  data={categoryPieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {categoryPieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* BAR CHART */}
        <Card className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Orders Overview
          </h2>

          <div className="h-64">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Bar
                  dataKey="value"
                  fill="var(--color-orders)"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Monthly Sales Target</span>
                <span>75%</span>
              </div>

              <Progress value={75} />
            </div>
          </div>
        </Card>

        {/* RECENT ORDERS TABLE */}
        <Card className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Recent Orders
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest ecommerce transactions
              </p>
            </div>
          </div>

          {orderData.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-medium capitalize tracking-wide dark:text-white">
                no orders data to show
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="h-auto leading-none lg:text-[0.8rem]">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orderData.map((o, i) => (
                    <TableRow
                      key={o.id}
                      className="transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      {/* ORDER ID */}
                      <TableCell className="py-4 font-medium lg:text-[0.8rem]">
                        #ORD-{o.id}
                      </TableCell>

                      {/* CUSTOMER */}
                      <TableCell className="py-4">
                        {o.customer || "John Doe"}
                      </TableCell>

                      {/* STATUS */}
                      <TableCell className="py-4">
                        <Badge
                          variant="secondary"
                          className={`rounded-full h-auto leading-none px-3 py-1 text-xs font-semibold lg:text-[0.8rem] ${
                            o.status === "Delivered"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : o.status === "Pending"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {o.status || "Pending"}
                        </Badge>
                      </TableCell>

                      {/* QUANTITY */}
                      <TableCell className="py-4 lg:text-[0.8rem]">
                        {o.quantity || 1}
                      </TableCell>

                      {/* PRICE */}
                      <TableCell className="py-4 text-right font-semibold lg:text-[0.8rem]">
                        ${Number(o.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span>Order Completion Rate</span>
              <span>80%</span>
            </div>

            <Progress value={80} className="h-2" />
          </div>
        </Card>
      </div>

      {/* ACTIVITY FEED */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
          Live Activity
        </h2>

        <div className="space-y-3">
          {activity.map((a, i) => (
            <div key={i} className="text-sm text-slate-600 dark:text-slate-300">
              • {a}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
