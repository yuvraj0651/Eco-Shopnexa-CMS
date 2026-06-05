import { DuplicateRoute } from "@/components/services/RoutesApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";

const DuplicateRouteModal = ({ open, setOpen, selectedRoute }) => {
  console.log(selectedRoute);

  const queryClient = useQueryClient();

  const duplicateMutation = useMutation({
    mutationFn: DuplicateRoute,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });

      toast.success("Route duplicated successfully");
      setOpen(false);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Duplicate Route</AlertDialogTitle>

          <AlertDialogDescription>
            This will create a copy of{" "}
            <span className="font-semibold text-foreground">
              {selectedRoute?.name}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-2xl border p-4">
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Route:</span> {selectedRoute?.name}
            </p>

            <p>
              <span className="font-medium">Path:</span> {selectedRoute?.path}
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => duplicateMutation.mutate(selectedRoute)}
          >
            {duplicateMutation.isPending ? "Duplicating..." : "Duplicate Route"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DuplicateRouteModal;
