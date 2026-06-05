import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewContent } from "@/components/services/ContentApi";
import { toast } from "sonner";

const AddContentModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    slug: "",
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
    mutationFn: (newItem) => addNewContent(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["content"],
      });
      setFormData({
        title: "",
        type: "",
        description: "",
        slug: "",
      });
      toast.success("Content Added To The Data");
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-hidden rounded-3xl p-0 sm:max-w-3xl">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Plus className="h-5 w-5" />
            Create Content
          </DialogTitle>

          <DialogDescription>
            Create a new CMS content section.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[65vh]">
          <form id="add-form" onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Content Title</Label>
                <Input
                  placeholder="Homepage Banner"
                  name="title"
                  value={formData.title}
                  onChange={changeHandler}
                />
              </div>

              <div className="space-y-2">
                <Label>Content Type</Label>

                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="form">Form</SelectItem>
                    <SelectItem value="navigation">Navigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={5}
                placeholder="Content description..."
                name="description"
                value={formData.description}
                onChange={changeHandler}
              />
            </div>

            <div className="space-y-2">
              <Label>Slug / Key</Label>
              <Input
                placeholder="homepage.banners"
                name="slug"
                value={formData.slug}
                onChange={changeHandler}
              />
            </div>

            {/* File upload UI */}
            <div className="rounded-2xl border border-dashed p-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />

                <div>
                  <h4 className="font-medium">Upload Content Image</h4>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, WEBP supported
                  </p>
                </div>

                <Button type="button" variant="outline">
                  Select File
                </Button>
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="border-t px-6 py-4">
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>

          <Button
            form="add-form"
            type="submit"
            disabled={addMutation.isPending}
          >
            {addMutation.isPending ? "Creating..." : "Create Content"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddContentModal;
