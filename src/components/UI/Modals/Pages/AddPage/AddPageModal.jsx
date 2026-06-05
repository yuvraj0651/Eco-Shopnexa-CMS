import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/UI/dialog";
import { Label } from "@/components/UI/label";
import { Textarea } from "@/components/UI/textarea";
import { Switch } from "@/components/UI/switch";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/UI/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPageData,
  deletePageData,
  getPagesData,
} from "@/components/services/PagesApi";
import { toast } from "sonner";
import { addRouteData, getRouteData } from "@/components/services/RoutesApi";

const AddPageModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    template: "",
    component: "",
    status: "",
    seoTitle: "",
    seoDescription: "",
    showInNavbar: false,
    isProtected: false,
    isDynamic: false,
  });
  const [isCreating, setIsCreating] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: "/" + value.toLowerCase().trim().replace(/\s+/g, "-"),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data: pagesData = [] } = useQuery({
    queryKey: ["pages"],
    queryFn: getPagesData,
  });

  const { data } = useQuery({
    queryKey: ["routes"],
    queryFn: getRouteData,
  });

  const routesData = Array.isArray(data?.routes) ? data.routes : [];

  const componentOptions = [
    ...new Set(pagesData.map((page) => page.component).filter(Boolean)),
  ];

  const queryClient = useQueryClient();

  const calculateSeoScore = () => {
    let score = 0;

    if (formData.seoTitle.length > 10) score += 40;

    if (formData.seoDescription.length > 50) score += 60;

    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.slug ||
      !formData.template ||
      !formData.component ||
      !formData.status
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const slugExists = Array.isArray(pagesData)
      ? pagesData.some((page) => page.slug === formData.slug)
      : false;

    if (slugExists) {
      toast.error("Slug already exists");
      return;
    }

    const componentExists = componentOptions.includes(formData.component);

    if (!componentExists) {
      toast.error("Invalid Component");
      return;
    }

    const slugRegex = /^\/[a-z0-9-]+$/;

    if (!slugRegex.test(formData.slug)) {
      toast.error("Slug should be like /about-us");
      return;
    }

    if (formData.isDynamic && !formData.slug.includes(":")) {
      toast.error("Dynamic route must contain parameter");
      return;
    }

    const routeExists =
      Array.isArray(routesData) &&
      routesData.some((route) => route.path === formData.slug);

    if (routeExists) {
      toast.error("Route already exists");
      return;
    }

    setIsCreating(true);

    try {
      const pagePayload = {
        ...formData,
        author: "Admin",
        views: 0,
        seoScore: calculateSeoScore(),
        isHomePage: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const createdPage = await addPageData(pagePayload);

      try {
        await addRouteData({
          pageId: createdPage.id,
          path: formData.slug,
          component: formData.component,
          isProtected: formData.isProtected,
          roles: [],
        });
      } catch (error) {
        await deletePageData(createdPage.id);
        throw error;
      }

      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });

      toast.success("Page Created Successfully");
      setFormData({
        title: "",
        slug: "",
        template: "",
        component: "",
        status: "",
        seoTitle: "",
        seoDescription: "",
        showInNavbar: false,
        isProtected: false,
        isDynamic: false,
      });

      console.log("routes raw data:", data);
      console.log("routes parsed:", routesData);
      console.log("createdPage:", createdPage);
      
      setOpen(false);
    } catch {
      toast.error("Failed To Create Page");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!w-[95vw] !max-w-6xl !h-[85vh] overflow-y-auto rounded-sm">
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>

          <DialogDescription>Add a new CMS page.</DialogDescription>
        </DialogHeader>

        {/* Basic Info */}

        <form id="add-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Page Title</Label>

              <Input
                placeholder="About Us"
                name="title"
                value={formData.title}
                onChange={changeHandler}
              />
            </div>

            <div>
              <Label>Slug</Label>

              <Input
                placeholder="/about"
                name="slug"
                value={formData.slug}
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Template</Label>

              <Select
                name="template"
                value={formData.template}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    template: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Template" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="home">Home Template</SelectItem>

                  <SelectItem value="shop">Shop Template</SelectItem>

                  <SelectItem value="about">About Template</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>

              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>

                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Component</Label>

              <Select
                value={formData.component}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    component: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Component" />
                </SelectTrigger>

                <SelectContent>
                  {componentOptions.map((component) => (
                    <SelectItem key={component} value={component}>
                      {component}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>SEO Title</Label>

            <Input
              name="seoTitle"
              value={formData.seoTitle}
              onChange={changeHandler}
            />
          </div>

          <div>
            <Label>SEO Description</Label>

            <Textarea
              rows={4}
              name="seoDescription"
              value={formData.seoDescription}
              onChange={changeHandler}
            />
          </div>

          <div className="grid gap-4">
            <div className="flex items-center justify-between rounded-2xl border p-4">
              <div>
                <p className="font-medium">Show In Navbar</p>
              </div>

              <Switch
                name="showInNavbar"
                checked={formData.showInNavbar}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    showInNavbar: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border p-4">
              <div>
                <p className="font-medium">Protected Route</p>
              </div>

              <Switch
                name="isProtected"
                checked={formData.isProtected}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isProtected: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border p-4">
              <div>
                <p className="font-medium">Dynamic Route</p>
              </div>

              <Switch
                name="isDynamic"
                checked={formData.isDynamic}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isDynamic: checked,
                  }))
                }
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            onClick={() => setOpen(false)}
            variant="outline"
          >
            Cancel
          </Button>

          <Button form="add-form" type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Page"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPageModal;
