import { Card, CardContent } from "@/components/ui/card";
import { Application } from "@/types/application";
import { Briefcase, Users, Trophy, XCircle } from "lucide-react";

interface StatsCardsProps {
  applications: Application[];
}

const StatsCards = ({ applications }: StatsCardsProps) => {
  const stats = {
    total: applications.length,
    interviews: applications.filter((app) => app.status === "interview").length,
    offers: applications.filter((app) => app.status === "offer").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.interviews}</p>
            <p className="text-sm text-muted-foreground">Interviews</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Trophy className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.offers}</p>
            <p className="text-sm text-muted-foreground">Offers</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
