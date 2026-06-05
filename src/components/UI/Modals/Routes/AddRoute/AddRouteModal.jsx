import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/UI/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";

import { Input } from "@/components/UI/input";

import { Label } from "@/components/UI/label";

import { Textarea } from "@/components/UI/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

import { Switch } from "@/components/UI/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRouteData } from "@/components/services/RoutesApi";
import { toast } from "sonner";

const AddRouteModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    component: "",
    isProtected: false,
    status: "Active",
    isLazy: false,
    roles: "",
    guards: "",
    meta: {
      title: "",
      description: "",
    },
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
    mutationFn: (newRoute) => addRouteData(newRoute),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      toast.success("Route Added successfully");
      setFormData({
        name: "",
        path: "",
        component: "",
        isProtected: false,
        status: "Active",
        isLazy: false,
        roles: "",
        guards: "",
        meta: {
          title: "",
          description: "",
        },
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.path.trim() ||
      !formData.component.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    addMutation.mutate({
      name: formData.name,
      path: formData.path.startsWith("/") ? formData.path : `/${formData.path}`,
      component: formData.component,
      isProtected: formData.isProtected,
      status: formData.status,
      isLazy: formData.isLazy,

      roles: formData.roles
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      guards: formData.guards
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      meta: {
        title: formData.meta.title,
        description: formData.meta.description,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Route
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !max-w-6xl !h-[85vh] overflow-y-auto rounded-sm">
        <DialogHeader>
          <DialogTitle>Add New Route</DialogTitle>

          <DialogDescription>
            Create and configure a new application route.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label>Route Name</Label>
            <Input
              placeholder="Products Page"
              name="name"
              value={formData.name}
              onChange={changeHandler}
            />
          </div>

          <div className="grid gap-2">
            <Label>Route Path</Label>
            <Input
              placeholder="/products"
              name="path"
              value={formData.path}
              onChange={changeHandler}
            />
          </div>

          <div className="grid gap-2">
            <Label>Component Name</Label>
            <Input
              placeholder="ProductsPage"
              name="component"
              value={formData.component}
              onChange={changeHandler}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Route Type</Label>

              <Select
                name="roles"
                value={formData.isProtected ? "protected" : "public"}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    isProtected: value === "protected",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="protected">Protected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
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
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border p-4">
            <div>
              <h4 className="font-medium">Lazy Loaded Route</h4>

              <p className="text-sm text-muted-foreground">
                Enable React Lazy Loading
              </p>
            </div>

            <Switch
              checked={formData.isLazy}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isLazy: checked,
                }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Roles</Label>

            <Input
              name="roles"
              placeholder="admin,user"
              value={formData.roles}
              onChange={changeHandler}
            />
          </div>

          <div className="grid gap-2">
            <Label>Guards</Label>

            <Input
              name="guards"
              placeholder="AuthGuard,RoleGuard"
              value={formData.guards}
              onChange={changeHandler}
            />
          </div>

          <div className="grid gap-2">
            <Label>Meta Title</Label>

            <Input
              placeholder="Products Page"
              value={formData.meta.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  meta: {
                    ...prev.meta,
                    title: e.target.value,
                  },
                }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Meta Description</Label>

            <Textarea
              rows={4}
              placeholder="Enter route description..."
              value={formData.meta.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  meta: {
                    ...prev.meta,
                    description: e.target.value,
                  },
                }))
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={addMutation.isPending}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {addMutation.isPending ? "Saving..." : "Save Route"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRouteModal;
