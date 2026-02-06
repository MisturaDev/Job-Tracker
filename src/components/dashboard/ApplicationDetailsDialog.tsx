import { Application } from "@/types/application";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Calendar, FileText, X } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ApplicationDetailsDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  interview: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  offer: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const locationLabels: Record<string, string> = {
  remote: "Remote",
  onsite: "On-site",
  hybrid: "Hybrid",
};

const ApplicationDetailsDialog = ({
  application,
  open,
  onOpenChange,
}: ApplicationDetailsDialogProps) => {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh]">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl font-bold text-foreground">
            Job Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Header with Company and Role */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">
                {application.role}
              </h3>
              <p className="text-lg text-muted-foreground">
                {application.company_name}
              </p>
            </div>

            {/* Status Badge */}
            <div>
              <Badge
                className={`${statusColors[application.status]} text-sm px-3 py-1`}
                variant="secondary"
              >
                {application.status.charAt(0).toUpperCase() +
                  application.status.slice(1)}
              </Badge>
            </div>

            {/* Details Grid */}
            <div className="grid gap-4">
              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Location
                  </p>
                  <p className="text-foreground">
                    {locationLabels[application.location_type]}
                  </p>
                </div>
              </div>

              {/* Date Applied */}
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Date Applied
                  </p>
                  <p className="text-foreground">
                    {format(new Date(application.date_applied), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              {/* Application Link */}
              {application.application_link && (
                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Application Link
                    </p>
                    <a
                      href={application.application_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {application.application_link}
                    </a>
                  </div>
                </div>
              )}

              {/* Notes */}
              {application.notes && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Notes
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-foreground whitespace-pre-wrap">
                        {application.notes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
