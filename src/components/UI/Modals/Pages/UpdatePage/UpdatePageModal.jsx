import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/UI/dialog";

import { Label } from "@/components/UI/label";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";

import { Card, CardContent } from "@/components/UI/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePageData } from "@/components/services/PagesApi";
import { toast } from "sonner";

const EditPageModal = ({ open, setOpen, editData, editingId }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    views: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData?.title || "",
        slug: editData?.slug || "",
        author: editData?.author || "",
        views: editData?.views || "",
        createdAt: editData?.createdAt?.split("T")[0] || "",
        updatedAt: editData?.updatedAt?.split("T")[0] || "",
      });
    }
  }, [editData, open]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedItem }) => updatePageData({ id, updatedItem }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
      setFormData({
        title: "",
        slug: "",
        author: "",
        views: "",
        createdAt: "",
        updatedAt: "",
      });
      toast.success("Page Data Updated Successfully");
      setOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      id: editingId,
      updatedItem: formData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!w-[95vw] !max-w-6xl !h-[85vh] overflow-y-auto rounded-sm">
        <DialogHeader>
          <DialogTitle>Edit Page</DialogTitle>

          <DialogDescription>Update page details.</DialogDescription>
        </DialogHeader>

        <form id="update-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Same Fields */}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Page Title</Label>

              <Input
                name="title"
                value={formData.title}
                onChange={changeHandler}
              />
            </div>

            <div>
              <Label>Slug</Label>

              <Input
                name="slug"
                value={formData.slug}
                onChange={changeHandler}
              />
            </div>
          </div>

          {/* Metadata */}

          <Card>
            <CardContent className="space-y-4 p-5">
              <h3 className="font-semibold">Metadata</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Author</Label>

                  <Input
                    name="author"
                    value={formData.author}
                    onChange={changeHandler}
                  />
                </div>

                <div>
                  <Label>Views</Label>

                  <Input
                    type="number"
                    name="views"
                    value={formData.views}
                    onChange={changeHandler}
                  />
                </div>

                <div>
                  <Label>Created At</Label>

                  <Input
                    type="date"
                    name="createdAt"
                    value={formData.createdAt}
                    onChange={changeHandler}
                  />
                </div>

                <div>
                  <Label>Updated At</Label>

                  <Input
                    type="date"
                    name="updatedAt"
                    value={formData.updatedAt}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>

        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>

          <Button
            type="submit"
            form="update-form"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating Page..." : "Update Page"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPageModal;
