import { Button } from "@/components/ui/button";
import { ApplicationStatus } from "@/types/application";

interface StatusFilterProps {
  selected: ApplicationStatus | "all";
  onChange: (status: ApplicationStatus | "all") => void;
}

const statuses: { value: ApplicationStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const StatusFilter = ({ selected, onChange }: StatusFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <Button
          key={status.value}
          variant={selected === status.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(status.value)}
        >
          {status.label}
        </Button>
      ))}
    </div>
  );
};

export default StatusFilter;
