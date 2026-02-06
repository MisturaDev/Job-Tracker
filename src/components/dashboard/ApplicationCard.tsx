import { Application, ApplicationStatus } from "@/types/application";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Pencil, Trash2, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ApplicationCardProps {
  application: Application;
  onView: (application: Application) => void;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<ApplicationStatus, string> = {
  applied: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  interview: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  offer: "bg-green-100 text-green-800 hover:bg-green-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100",
};

const locationLabels = {
  remote: "Remote",
  onsite: "On-site",
  hybrid: "Hybrid",
};

const ApplicationCard = ({ application, onView, onEdit, onDelete }: ApplicationCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger view if clicking on action buttons
    if ((e.target as HTMLElement).closest('button, a')) return;
    onView(application);
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary/50"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground text-lg">{application.role}</h3>
                <p className="text-muted-foreground">{application.company_name}</p>
              </div>
              <Badge className={statusColors[application.status]} variant="secondary">
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {locationLabels[application.location_type]}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(application.date_applied), "MMM d, yyyy")}
              </span>
              {application.application_link && (
                <a
                  href={application.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Job
                </a>
              )}
            </div>
            {application.notes && (
              <p className="text-sm text-muted-foreground mt-3 bg-muted p-2 rounded">
                {application.notes}
              </p>
            )}
          </div>
          <div className="flex gap-2 md:flex-col">
            <Button variant="outline" size="icon" onClick={() => onEdit(application)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(application.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
