import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Pencil,
  Copy,
  Trash2,
  Settings,
  Search,
  Plus,
  Download,
  Upload,
  FileText,
  Globe,
  Clock3,
  Archive,
  MoreVertical,
  LayoutTemplate,
  Eye,
  Sparkles,
} from "lucide-react";

import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPageData,
  deletePageData,
  getPagesData,
} from "@/components/services/PagesApi";
import AddPageModal from "@/components/UI/Modals/Pages/AddPage/AddPageModal";
import UpdatePageModal from "@/components/UI/Modals/Pages/UpdatePage/UpdatePageModal";
import TableSkeleton from "@/components/UI/Skeleton/TableSkeleton";
import { toast } from "sonner";

const PageManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
  const [isUpdatePageModalOpen, setIsUpdatePageModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [deletePageId, setDeletePageId] = useState(null);
  const [deletePageTitle, setDeletePageTitle] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    data: pagesData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pages"],
    queryFn: getPagesData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  console.log(pagesData);

  const totalPages = pagesData.length;
  const MotionTableRow = motion.create(TableRow);
  const queryClient = useQueryClient();

  const publishedPages = pagesData.filter(
    (item) => item.status === "published",
  ).length;

  const draftPages = pagesData.filter((item) => item.status === "draft").length;

  const scheduledPages = pagesData.filter(
    (item) => item.status === "scheduled",
  ).length;

  const averageSeoScore =
    pagesData.length > 0
      ? pagesData.reduce((acc, page) => acc + page.seoScore, 0) /
        pagesData.length
      : 0;

  const totalViews = pagesData.reduce((acc, page) => acc + page.views, 0);

  const activeTemplates = new Set(pagesData.map((page) => page.template)).size;

  const saveEdit = (page) => {
    setEditingId(page.id);
    setEditData(page);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePageData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      setDeletePageId(null);
      setDeletePageTitle("");
      setIsDeleteOpen(false);

      toast.success("Page Deleted Successfully");
      setIsDeleteOpen(false);
    },
  });

  const deletePageHandler = (id) => deleteMutation.mutate(id);

  const addPageMutation = useMutation({
    mutationFn: addPageData,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      toast.success("Page Duplicated Successfully");
    },

    onError: () => {
      toast.error("Failed To Duplicate Page");
    },
  });

  const duplicatePage = (page) => {
    const { id, ...rest } = page;

    const duplicateData = {
      ...rest,
      title: `${page.title} Copy`,
      slug: `${page.slug}-copy-${Date.now()}`,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addPageMutation.mutate(duplicateData);
  };

  const stats = [
    {
      title: "Total Pages",
      value: totalPages,
      icon: FileText,
    },

    {
      title: "Published",
      value: publishedPages,
      icon: Globe,
    },

    {
      title: "Drafts",
      value: draftPages,
      icon: Archive,
    },

    {
      title: "Scheduled",
      value: scheduledPages,
      icon: Clock3,
    },
  ];

  const filteredPages = useMemo(() => {
    let filteredData = [...pagesData];

    if (searchTerm.trim()) {
      filteredData = filteredData.filter((page) =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filteredData = filteredData.filter(
        (page) => page.status === statusFilter,
      );
    }

    if (categoryFilter !== "all") {
      filteredData = filteredData.filter(
        (page) => page.category === categoryFilter,
      );
    }

    if (activeTab !== "all") {
      filteredData = filteredData.filter(
        (page) => page.status.toLowerCase() === activeTab,
      );
    }

    return filteredData;
  }, [pagesData, searchTerm, activeTab, statusFilter, categoryFilter]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <p>{error.message || "Something went wrong"}</p>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Management</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage CMS pages, publishing workflow and SEO.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button
            onClick={() => setIsAddPageModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Page
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -4,
              }}
            >
              <Card className="rounded-3xl border cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{item.title}</p>

                      <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

                      <Badge className="mt-3 bg-emerald-500/10 text-emerald-600">
                        +8%
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

      <Card className="rounded-3xl">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 rounded-2xl pl-11"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                onClick={() => setActiveTab("all")}
                variant={activeTab === "all" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                All Pages
              </Badge>

              <Badge
                onClick={() => setActiveTab("published")}
                variant={activeTab === "published" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                Published
              </Badge>

              <Badge
                onClick={() => setActiveTab("draft")}
                variant={activeTab === "draft" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                Draft
              </Badge>

              <Badge
                onClick={() => setActiveTab("featured")}
                variant={activeTab === "featured" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                Featured
              </Badge>

              <Badge
                onClick={() => setActiveTab("seo-ready")}
                variant={activeTab === "seo-ready" ? "default" : "secondary"}
                className="cursor-pointer rounded-full px-4 py-1"
              >
                SEO Ready
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Cards */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-violet-500/10 p-3">
              <LayoutTemplate className="h-6 w-6 text-violet-600" />
            </div>

            <div>
              <h3 className="font-semibold">Active Templates</h3>

              <p className="text-sm text-slate-500">
                {activeTemplates} Templates Running
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-blue-500/10 p-3">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold">Monthly Views</h3>

              <p className="text-sm text-slate-500">{totalViews} Visitors</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-emerald-500/10 p-3">
              <Sparkles className="h-6 w-6 text-emerald-600" />
            </div>

            <div>
              <h3 className="font-semibold">SEO Score</h3>

              <p className="text-sm text-slate-500">
                Average {averageSeoScore || 92}/100
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages Table */}

      <Card className="rounded-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SEO</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredPages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-40">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                        <h3 className="font-medium">No Pages Found</h3>
                        <p className="text-sm text-muted-foreground">
                          Try changing your search or create a new page.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPages?.map((page, index) => (
                    <MotionTableRow
                      key={page.id}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
                    >
                      <TableCell>
                        <div>
                          <h4 className="font-medium">{page.title}</h4>

                          <p className="text-xs text-slate-500">
                            {page.template}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {page.slug}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={
                            page.status === "published"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-amber-500/10 text-amber-600"
                          }
                        >
                          {page.status}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className="rounded-full">
                          {page.seoScore || "67/100"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <span className="font-medium">{page.views}</span>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm text-slate-500">
                          {page.updatedAt}
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
                                Preview
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  saveEdit(page);
                                  setIsUpdatePageModalOpen(true);
                                }}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Page
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => duplicatePage(page)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                SEO Settings
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() => {
                                  setDeletePageId(page.id);
                                  setDeletePageTitle(page.title);
                                  setIsDeleteOpen(true);
                                }}
                                className="text-red-500"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </MotionTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deletePageTitle}"?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This page will be permanently
              removed from your CMS.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => deletePageHandler(deletePageId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Page"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isAddPageModalOpen && (
        <div>
          <AddPageModal
            open={isAddPageModalOpen}
            setOpen={setIsAddPageModalOpen}
          />
        </div>
      )}
      {isUpdatePageModalOpen && (
        <div>
          <UpdatePageModal
            editingId={editingId}
            editData={editData}
            open={isUpdatePageModalOpen}
            setOpen={setIsUpdatePageModalOpen}
          />
        </div>
      )}
    </div>
  );
};

export default PageManagement;
