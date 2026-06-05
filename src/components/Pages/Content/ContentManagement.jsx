import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  Upload,
  FileText,
  Eye,
  Sparkles,
  ImageIcon,
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  Settings,
} from "lucide-react";
import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteContent, getContentData } from "../../services/ContentApi";
import AddContentModal from "@/components/UI/Modals/Content/AddContentModal";
import UpdateContentModal from "@/components/UI/Modals/Content/UpdateContentModal";
import { toast } from "sonner";
import { getContentSections } from "@/components/Data/ContentData";
import { getStats } from "@/components/Data/ContentStats";
import { FILTER_TABS } from "@/components/Data/ContentFilterTabs";

const MotionTableRow = motion.create(TableRow);

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [isUpdateContentModalOpen, setIsUpdateContentModalOpen] =
    useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const { data: contentInfo = {} } = useQuery({
    queryKey: ["content"],
    queryFn: getContentData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteContent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["content"],
      });
      toast.success("Content Deleted Successfully");
      setIsDeleteOpen(false);
    },
  });

  const deleteContentHandler = (id) => deleteMutation.mutate(id);
  //   {
  //     id: 1,
  //     title: "Header",
  //     description: "Navigation, Logos & Search",
  //     type: "Global",
  //     totalItems: contentInfo?.header?.navLinks?.length || 0,
  //     location: "Header",
  //     key: "header",
  //   },

  //   {
  //     id: 2,
  //     title: "Homepage Banners",
  //     description: "Homepage Hero Banners",
  //     type: "Banner",
  //     totalItems: contentInfo?.homepage?.banners?.length || 0,
  //     location: "Homepage",
  //     key: "homepage.banners",
  //   },

  //   {
  //     id: 3,
  //     title: "Explore Categories",
  //     description: "Homepage Explore Tabs",
  //     type: "Categories",
  //     totalItems: contentInfo?.homepage?.explore?.length || 0,
  //     location: "Homepage",
  //     key: "homepage.explore",
  //   },

  //   {
  //     id: 4,
  //     title: "Features Section",
  //     description: "Homepage Features",
  //     type: "Features",
  //     totalItems: contentInfo?.homepage?.features?.length || 0,
  //     location: "Homepage",
  //     key: "homepage.features",
  //   },

  //   {
  //     id: 5,
  //     title: "New Arrivals",
  //     description: "Homepage Products",
  //     type: "Products",
  //     totalItems: contentInfo?.homepage?.newArrivals?.length || 0,
  //     location: "Homepage",
  //     key: "homepage.newArrivals",
  //   },

  //   {
  //     id: 6,
  //     title: "Footer",
  //     description: "Footer Links & Socials",
  //     type: "Navigation",
  //     totalItems: contentInfo?.footer?.sections?.length || 0,
  //     location: "Footer",
  //     key: "footer",
  //   },

  //   {
  //     id: 7,
  //     title: "About Page",
  //     description: "Founders, Facts & Testimonials",
  //     type: "Page",
  //     totalItems: contentInfo?.aboutpage?.foundersData?.length || 0,
  //     location: "About",
  //     key: "aboutpage",
  //   },

  //   {
  //     id: 8,
  //     title: "Checkout Form",
  //     description: "Shipping & Payment Fields",
  //     type: "Form",
  //     totalItems:
  //       (contentInfo?.checkoutForm?.shipping?.fields?.length || 0) +
  //       (contentInfo?.checkoutForm?.payment?.fields?.length || 0),
  //     location: "Checkout",
  //     key: "checkoutForm",
  //   },
  // ];

  const saveEdit = useCallback((content) => {
    setEditingId(content.id);
    setEditData(content);
  }, []);

  const contentData = useMemo(
    () => getContentSections(contentInfo),
    [contentInfo],
  );

  const totalSections = contentData.length;

  const totalItems =
    (contentInfo?.homepage?.banners?.length || 0) +
    (contentInfo?.homepage?.explore?.length || 0) +
    (contentInfo?.homepage?.features?.length || 0) +
    (contentInfo?.homepage?.newArrivals?.length || 0) +
    (contentInfo?.footer?.sections?.length || 0) +
    (contentInfo?.aboutpage?.foundersData?.length || 0);

  const totalContentBlocks =
    (contentInfo?.homepage?.banners?.length || 0) +
    (contentInfo?.homepage?.explore?.length || 0) +
    (contentInfo?.homepage?.features?.length || 0) +
    (contentInfo?.homepage?.newArrivals?.length || 0) +
    (contentInfo?.homepage?.footerBanner?.length || 0) +
    (contentInfo?.aboutpage?.foundersData?.length || 0) +
    (contentInfo?.aboutpage?.factsData?.length || 0) +
    (contentInfo?.aboutpage?.testimonialData?.length || 0);

  const totalFormFields =
    (contentInfo?.checkoutForm?.shipping?.fields?.length || 0) +
    (contentInfo?.checkoutForm?.payment?.fields?.length || 0);

  const totalMediaAssets =
    (contentInfo?.homepage?.banners?.length || 0) +
    (contentInfo?.homepage?.features?.length || 0) +
    (contentInfo?.homepage?.newArrivals?.length || 0) +
    (contentInfo?.aboutpage?.foundersData?.length || 0) +
    (contentInfo?.aboutpage?.testimonialImages?.subImages?.length || 0) +
    1;

  const stats = useMemo(
    () =>
      getStats({
        totalSections,
        totalItems,
      }),
    [totalSections, totalItems],
  );

  const filteredContent = useMemo(() => {
    let filtered = [...contentData];

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((item) => item.status === activeTab);
    }

    return filtered;
  }, [contentData, searchTerm, activeTab]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Content Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage blogs, pages, landing pages, campaigns and knowledge base
            content.
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
            onClick={() => setIsAddContentModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Content
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <Card className="rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.title}
                      </p>

                      <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

                      <Badge className="mt-3 bg-emerald-500/10 text-emerald-600">
                        +12%
                      </Badge>
                    </div>

                    <div className="rounded-2xl bg-emerald-500/10 p-3">
                      <Icon className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Search */}

      <Card className="rounded-3xl">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTER_TABS.map((tab) => (
                <Badge
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  variant={activeTab === tab.value ? "default" : "secondary"}
                  className="cursor-pointer rounded-sm"
                >
                  {tab.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Content Blocks */}

        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-blue-500/10 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold">Content Blocks</h3>

              <p className="text-sm text-muted-foreground">
                {totalContentBlocks} Active Blocks
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Form Fields */}

        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-violet-500/10 p-3">
              <Sparkles className="h-6 w-6 text-violet-600" />
            </div>

            <div>
              <h3 className="font-semibold">Form Fields</h3>

              <p className="text-sm text-muted-foreground">
                {totalFormFields} Configured Fields
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Media Assets */}

        <Card className="rounded-3xl">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-2xl bg-orange-500/10 p-3">
              <ImageIcon className="h-6 w-6 text-orange-600" />
            </div>

            <div>
              <h3 className="font-semibold">Media Assets</h3>

              <p className="text-sm text-muted-foreground">
                {totalMediaAssets} Images Uploaded
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}

      <Card className="rounded-3xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content Section</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredContent.map((item, index) => (
                  <MotionTableRow
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                          <FileText className="h-5 w-5" />
                        </div>

                        <div>
                          <h4 className="font-medium">{item.title}</h4>

                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>

                    <TableCell>
                      <span className="font-medium">{item.totalItems}</span>
                    </TableCell>

                    <TableCell>
                      <Badge className="bg-emerald-500/10 text-emerald-600">
                        Active
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {item.location}
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
                                saveEdit(item);
                                setIsUpdateContentModalOpen(true);
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Content
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => {
                                setDeleteId(item.id);
                                setDeleteTitle(item.title);
                                setIsDeleteOpen(true);
                              }}
                              className="text-red-500"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {deleteMutation.isPending
                                ? "Deleting..."
                                : "Delete"}
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

      {/* Recent Activity */}

      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <h3 className="mb-6 text-lg font-semibold">
            Recent Content Activity
          </h3>

          <div className="space-y-4">
            {[
              "Homepage content updated",
              "New Blog Article published",
              "Product Description modified",
              "SEO Metadata updated",
              "Landing Page created",
            ].map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-4 rounded-2xl border p-4"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500" />

                <div className="flex-1">
                  <p className="font-medium">{activity}</p>

                  <span className="text-xs text-muted-foreground">
                    2 hours ago
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Health + Publishing Queue */}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-3xl">
          <CardContent className="p-6">
            <h3 className="mb-5 font-semibold">SEO Health Overview</h3>

            <div className="space-y-4">
              {[
                {
                  title: "Excellent",
                  count: 18,
                },
                {
                  title: "Good",
                  count: 9,
                },
                {
                  title: "Needs Improvement",
                  count: 4,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <span>{item.title}</span>

                  <Badge>{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="p-6">
            <h3 className="mb-5 font-semibold">Publishing Queue</h3>

            <div className="space-y-4">
              {[
                "Summer Campaign Landing Page",
                "Black Friday Banner Content",
                "New Product Announcement",
                "Customer Success Story",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <span className="text-sm">{item}</span>

                  <Badge variant="secondary" className="rounded-full">
                    Scheduled
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Content Modal Placeholder */}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Content</DialogTitle>

            <DialogDescription>Add new CMS content.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input placeholder="Content Title" />

            <Input placeholder="Slug" />

            <Input placeholder="Category" />
          </div>

          <DialogFooter>
            <Button variant="outline">Cancel</Button>

            <Button>Create Content</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deleteTitle}"?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This page will be permanently
              removed from your CMS.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => deleteContentHandler(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Page"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isAddContentModalOpen && (
        <div>
          <AddContentModal
            open={isAddContentModalOpen}
            setOpen={setIsAddContentModalOpen}
          />
        </div>
      )}
      {isUpdateContentModalOpen && (
        <div>
          <UpdateContentModal
            editData={editData}
            editingId={editingId}
            open={isUpdateContentModalOpen}
            setOpen={setIsUpdateContentModalOpen}
          />
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
