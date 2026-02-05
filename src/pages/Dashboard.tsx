import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useApplications } from "@/hooks/useApplications";
import { Application, ApplicationStatus } from "@/types/application";
import StatsCards from "@/components/dashboard/StatsCards";
import StatusFilter from "@/components/dashboard/StatusFilter";
import ApplicationCard from "@/components/dashboard/ApplicationCard";
import ApplicationFormDialog from "@/components/dashboard/ApplicationFormDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const {
    applications,
    isLoading,
    createApplication,
    updateApplication,
    deleteApplication,
    isCreating,
    isUpdating,
  } = useApplications();

  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredApplications = useMemo(() => {
    if (statusFilter === "all") return applications;
    return applications.filter((app) => app.status === statusFilter);
  }, [applications, statusFilter]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleEdit = (application: Application) => {
    setEditingApplication(application);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (editingApplication) {
      updateApplication({ id: editingApplication.id, updates: data });
    } else {
      createApplication({ ...data, user_id: user!.id });
    }
    setEditingApplication(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteApplication(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">JobTracker</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your job applications</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards applications={applications} />
        </div>

        {/* Filter and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <StatusFilter selected={statusFilter} onChange={setStatusFilter} />
          <Button 
            onClick={() => setFormOpen(true)}
            className="w-full sm:w-auto transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Application
          </Button>
        </div>

        {/* Applications List */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading applications...</div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No applications yet</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your job search by adding your first application.
            </p>
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Application
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Form Dialog */}
      <ApplicationFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingApplication(null);
        }}
        application={editingApplication}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
