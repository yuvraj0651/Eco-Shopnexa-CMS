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
import { ScrollArea } from "@/components/ui/scroll-area";

import { Save, Globe, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContent } from "@/components/services/ContentApi";
import { toast } from "sonner";

const safeJSONParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const UpdateContentModal = ({ open, setOpen, editData, editingId }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    content: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData?.title || "",
        location: editData?.location || "",
        description: editData?.description || "",
        content: editData?.content
          ? JSON.stringify(editData.content, null, 2)
          : "",
      });
    }
  }, [editData]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedItem }) => updateContent(id, updatedItem), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });

      setFormData({
        title: "",
        location: "",
        description: "",
        content: "",
      });

      toast.success("Content Updated Successfully");
      setOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateMutation.mutate({
      id: editingId,
      updatedItem: {
        ...formData,
        content: safeJSONParse(formData.content),
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-hidden rounded-3xl p-0 sm:max-w-4xl">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5" />
            Edit Content
          </DialogTitle>

          <DialogDescription>Update CMS section content.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          <form
            id="update-form"
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={changeHandler}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={changeHandler}
              />
            </div>

            <div className="space-y-2">
              <Label>Content JSON</Label>
              <Textarea
                rows={18}
                name="content"
                className="font-mono text-xs"
                value={formData.content}
                onChange={changeHandler}
              />
            </div>

            <div className="rounded-2xl border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-emerald-600" />

                <div>
                  <p className="font-medium">Live Website Sync</p>
                  <p className="text-sm text-muted-foreground">
                    Changes will reflect on Shopnexa after save.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            type="submit"
            form="update-form"
            disabled={updateMutation.isPending}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateContentModal;
