import { Briefcase } from "lucide-react";

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

const BrandLogo = ({ className = "", iconClassName = "", textClassName = "" }: BrandLogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <div className={`rounded-lg bg-primary/10 p-1.5 ${iconClassName}`.trim()}>
        <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <span className={`text-2xl font-bold text-foreground ${textClassName}`.trim()}>Job Tracker</span>
    </div>
  );
};

export default BrandLogo;
