import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Application, ApplicationStatus, LocationType } from "@/types/application";
import { useIsMobile } from "@/hooks/use-mobile";

const formSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  location_type: z.enum(["remote", "onsite", "hybrid"]),
  application_link: z.string().url().optional().or(z.literal("")),
  date_applied: z.string().min(1, "Date is required"),
  status: z.enum(["applied", "interview", "offer", "rejected"]),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ApplicationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: Application | null;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const ApplicationFormDialog = ({
  open,
  onOpenChange,
  application,
  onSubmit,
  isLoading,
}: ApplicationFormDialogProps) => {
  const isEditing = !!application;
  const isMobile = useIsMobile();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      role: "",
      location_type: "remote",
      application_link: "",
      date_applied: new Date().toISOString().split("T")[0],
      status: "applied",
      notes: "",
    },
  });

  useEffect(() => {
    if (application) {
      form.reset({
        company_name: application.company_name,
        role: application.role,
        location_type: application.location_type,
        application_link: application.application_link || "",
        date_applied: application.date_applied,
        status: application.status,
        notes: application.notes || "",
      });
    } else {
      form.reset({
        company_name: "",
        role: "",
        location_type: "remote",
        application_link: "",
        date_applied: new Date().toISOString().split("T")[0],
        status: "applied",
        notes: "",
      });
    }
  }, [application, form]);

  const handleSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      application_link: data.application_link || undefined,
      notes: data.notes || undefined,
    } as FormData);
    onOpenChange(false);
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-0 space-y-4">
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role / Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="date_applied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Applied</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="application_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Link (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Interview details, reminders, contact info..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isMobile ? (
          <DrawerFooter className="pt-4 pb-8 border-t border-border">
            <Button type="submit" disabled={isLoading} className="w-full h-12 text-base">
              {isLoading ? "Saving..." : isEditing ? "Update" : "Add Application"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full h-12 text-base"
            >
              Cancel
            </Button>
          </DrawerFooter>
        ) : (
          <DialogFooter className="shrink-0 flex-col sm:flex-row gap-2 pt-4 border-t border-border bg-background">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Saving..." : isEditing ? "Update" : "Add Application"}
            </Button>
          </DialogFooter>
        )}
      </form>
    </Form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90dvh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>{isEditing ? "Edit Application" : "Add New Application"}</DrawerTitle>
            <DrawerDescription>
              {isEditing
                ? "Update the details of your job application."
                : "Add a new job application to track."}
            </DrawerDescription>
          </DrawerHeader>
          {formContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>{isEditing ? "Edit Application" : "Add New Application"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of your job application."
              : "Add a new job application to track."}
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationFormDialog;
