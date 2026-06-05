import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Upload,
  Download,
  Globe,
  Lock,
  ShieldCheck,
  MoreVertical,
  Eye,
  Pencil,
  Copy,
  Trash2,
  Route,
  Activity,
  Layers3,
  GitBranch,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Card,
  CardContent,
  Badge,
  Input,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI";
import { useQuery } from "@tanstack/react-query";
import { getRouteData } from "@/components/services/RoutesApi";
import { useMemo, useState } from "react";
import TableSkeleton from "@/components/UI/Skeleton/TableSkeleton";
import AddRouteModal from "@/components/UI/Modals/Routes/AddRoute/AddRouteModal";
import UpdateRouteModal from "@/components/UI/Modals/Routes/UpdateRoute/UpdateRouteModal";

const RouteManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-routes");
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState(false);
  const [isUpdateRouteModalOpen, setIsUpdateRouteModalOpen] = useState(false);
  const [isDuplicateRouteModalOpen, setIsDuplicateRouteModalOpen] =
    useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [editData, setEditData] = useState(null);
  const [editingId, setEditingId] = useState(null);

  console.log(activeTab);

  const {
    data: routesData = [],
    isLoading,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["routes"],
    queryFn: getRouteData,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 5,
    retry: 2,
  });

  const filteredRoutes = useMemo(() => {
    let filteredData = routesData?.routes ? [...routesData?.routes] : [];

    if (searchTerm.trim()) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (activeTab === "public") {
      filteredData = filteredData.filter((route) => !route.isProtected);
    }

    if (activeTab === "protected") {
      filteredData = filteredData.filter((route) => route.isProtected);
    }

    if (activeTab === "admin") {
      filteredData = filteredData.filter((route) =>
        route.roles?.includes("admin"),
      );
    }

    if (activeTab === "dynamic") {
      filteredData = filteredData.filter((route) => route.path.includes(":"));
    }

    return filteredData;
  }, [routesData, searchTerm, activeTab]);

  const MotionTableRow = motion.create(TableRow);
  const totalRoutes = routesData?.routes?.length;

  const totalPublicRoutes =
    routesData?.routes?.filter((route) => route.isProtected === false).length ||
    0;

  const totalPrivateRoutes =
    routesData?.routes?.filter((route) => route.isProtected === true).length ||
    0;

  const totalNestedRoutes =
    routesData?.routes?.filter(
      (route) => route.path.split("/").filter(Boolean).length > 1,
    ).length || 0;

  const lazyRoutes = routesData?.routes
    ? routesData?.routes.filter((route) => route.isLazy).length
    : 0;

  const activeRoutes = routesData?.routes
    ? routesData?.routes.filter((route) => route.status === "Active").length
    : 0;

  const activeGuards = routesData?.routes
    ? [...new Set(routesData?.routes.flatMap((route) => route.guards))].length
    : 0;

  const saveEdit = (route) => {
    setEditingId(route.id);
    setEditData(route);
  };

  const stats = [
    {
      title: "Total Routes",
      value: totalRoutes,
      icon: Route,
    },
    {
      title: "Public Routes",
      value: totalPublicRoutes,
      icon: Globe,
    },
    {
      title: "Private Routes",
      value: totalPrivateRoutes,
      icon: Lock,
    },
    {
      title: "Admin Routes",
      value: activeRoutes,
      icon: ShieldCheck,
    },
  ];

  if (isLoading || isPending) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Route Management
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage application routes, permissions, guards and access control.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </TooltipTrigger>

              <TooltipContent>Import route configuration</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </TooltipTrigger>

              <TooltipContent>Export route configuration</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={() => setIsAddRouteModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Route
          </Button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <Card className="rounded-3xl border cursor-pointer dark:hover:bg-slate-800/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{item.title}</p>

                      <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

                      <Badge className="mt-3 bg-emerald-500/10 text-emerald-600">
                        +12%
                      </Badge>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                      <Icon className="h-7 w-7 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Search + Filters */}

      <Card className="rounded-3xl cursor-pointer">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 rounded-2xl pl-11"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                onClick={() => setActiveTab("all-routes")}
                variant={activeTab === "all-routes" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                All Routes
              </Badge>

              <Badge
                onClick={() => setActiveTab("public")}
                variant={activeTab === "public" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                Public
              </Badge>

              <Badge
                onClick={() => setActiveTab("protected")}
                variant={activeTab === "protected" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                Protected
              </Badge>

              <Badge
                onClick={() => setActiveTab("dynamic")}
                variant={activeTab === "dynamic" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                Dynamic
              </Badge>

              <Badge
                onClick={() => setActiveTab("admin")}
                variant={activeTab === "admin" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                Admin
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-blue-500/10 p-3">
              <GitBranch className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold">Nested Routes</h3>

              <p className="text-sm text-slate-500">
                {totalNestedRoutes} configured
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-violet-500/10 p-3">
              <Layers3 className="h-6 w-6 text-violet-600" />
            </div>

            <div>
              <h3 className="font-semibold">Lazy Loaded</h3>

              <p className="text-sm text-slate-500">{lazyRoutes} routes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-emerald-500/10 p-3">
              <Activity className="h-6 w-6 text-emerald-600" />
            </div>

            <div>
              <h3 className="font-semibold">Active Guards</h3>

              <p className="text-sm text-slate-500">
                {activeGuards} permissions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Routes Table */}

      <Card className="rounded-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route Name</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRoutes.map((route, index) => (
                  <MotionTableRow
                    key={route.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group border-b transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                  >
                    <TableCell className="font-medium">{route.name}</TableCell>

                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {route.path}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          route.isProtected === false
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-amber-500/10 text-amber-600"
                        }
                      >
                        {route.isProtected ? "Protected" : "Public"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge className="bg-emerald-500/10 text-emerald-600">
                        {route.status || "Active"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {route.roles?.length > 0 ? (
                        <div className="flex flex-wrap gap-[0.2rem]">
                          {route.roles.map((role) => (
                            <Badge
                              key={role}
                              variant="outline"
                              className="rounded-xs capitalize h-auto leading-none py-1 tracking-wide font-medium cursor-pointer shadow-sm dark:bg-slate-600"
                            >
                              {role}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <span className="text-sm text-slate-500">
                        {route.updated || new Date().toDateString()}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Route
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                saveEdit(route);
                                setIsUpdateRouteModalOpen(true);
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Route
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRoute(route);
                                setIsDuplicateRouteModalOpen(true);
                              }}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate Route
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Change Access
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <Activity className="mr-2 h-4 w-4" />
                              Change Status
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Route
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </MotionTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {isAddRouteModalOpen && (
        <AddRouteModal
          open={isAddRouteModalOpen}
          setOpen={setIsAddRouteModalOpen}
        />
      )}
      {isUpdateRouteModalOpen && (
        <UpdateRouteModal
          editData={editData}
          editingId={editingId}
          open={isUpdateRouteModalOpen}
          setOpen={setIsUpdateRouteModalOpen}
        />
      )}
      {isDuplicateRouteModalOpen && (
        <DuplicateRouteModal
          selectedRoute={selectedRoute}
          open={isDuplicateRouteModalOpen}
          setOpen={setIsDuplicateRouteModalOpen}
        />
      )}
    </div>
  );
};

export default RouteManagement;
