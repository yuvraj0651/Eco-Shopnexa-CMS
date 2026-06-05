import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

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
import { Switch } from "@/components/UI/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRouteData } from "@/components/services/RoutesApi";
import { toast } from "sonner";

const UpdateRouteModal = ({ open, setOpen, editingId, editData }) => {
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

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData?.name || "",
        path: editData?.path || "",
        component: editData?.component || "",
        isProtected: editData?.isProtected || false,
        status: editData?.status || "Active",
        isLazy: editData?.isLazy || false,
        roles: editData?.roles?.join(", ") || "",
        guards: editData?.guards?.join(", ") || "",
        meta: {
          title: editData?.meta?.title || "",
          description: editData?.meta?.description || "",
        },
      });
    }
  }, [editData]);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedItem }) => updateRouteData({ id, updatedItem }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });

      toast.success("Route updated successfully");

      setOpen(false);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdate = () => {
    console.log("editingId:", editingId);
    console.log("updatedItem:", formData);

    updateMutation.mutate({
      id: editingId,

      updatedItem: {
        name: formData.name,

        path: formData.path.startsWith("/")
          ? formData.path
          : `/${formData.path}`,

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
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Route
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !max-w-6xl !h-[85vh] overflow-y-auto rounded-sm">
        <DialogHeader>
          <DialogTitle>Update Route</DialogTitle>

          <DialogDescription>
            Modify existing route configuration.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Route Name */}
          <div className="grid gap-2">
            <Label>Route Name</Label>
            <Input name="name" value={formData.name} onChange={changeHandler} />
          </div>

          {/* Route Path */}
          <div className="grid gap-2">
            <Label>Route Path</Label>
            <Input name="path" value={formData.path} onChange={changeHandler} />
          </div>

          {/* Component */}
          <div className="grid gap-2">
            <Label>Component Name</Label>
            <Input
              name="component"
              value={formData.component}
              onChange={changeHandler}
            />
          </div>

          {/* Type + Status */}
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
                  <SelectValue />
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
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lazy Loading */}
          <div className="flex items-center justify-between rounded-2xl border p-4">
            <div>
              <h4 className="font-medium">Lazy Loaded Route</h4>

              <p className="text-sm text-muted-foreground">
                Route is loaded on demand.
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

          {/* Roles */}
          <div className="grid gap-2">
            <Label>Roles</Label>

            <Input
              name="roles"
              placeholder="admin,user"
              value={formData.roles}
              onChange={changeHandler}
            />
          </div>

          {/* Guards */}
          <div className="grid gap-2">
            <Label>Guards</Label>

            <Input
              name="guards"
              placeholder="AuthGuard,RoleGuard"
              value={formData.guards}
              onChange={changeHandler}
            />
          </div>

          {/* Meta Title */}
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

          {/* Meta Description */}
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

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleUpdate}
            disabled={updateMutation.isPending}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {updateMutation.isPending ? "Updating..." : "Update Route"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRouteModal;
