import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useApplications } from "@/hooks/useApplications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
    Briefcase,
    CheckCircle2,
    XCircle,
    CalendarDays,
    Mail,
    User,
    Clock,
    Pencil,
    Save,
    X
} from "lucide-react";
import { format } from "date-fns";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { applications, isLoading } = useApplications();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.user_metadata?.full_name || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) return;

        try {
            setIsSaving(true);
            await updateProfile({ full_name: name });
            setIsEditing(false);
            toast({
                title: "Profile updated",
                description: "Your name has been updated successfully.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update profile",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setName(user?.user_metadata?.full_name || "");
        setIsEditing(false);
    };

    // Calculate statistics
    const stats = {
        total: applications.length,
        interview: applications.filter(app => app.status === 'interview').length,
        offer: applications.filter(app => app.status === 'offer').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
    };

    const getInitials = () => {
        if (name) {
            return name.substring(0, 2).toUpperCase();
        }
        if (user?.user_metadata?.full_name) {
            return user.user_metadata.full_name.substring(0, 2).toUpperCase();
        }
        if (!user?.email) return "U";
        return user.email.substring(0, 2).toUpperCase();
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        try {
            return format(new Date(dateString), "PPP");
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border sticky top-0 bg-background z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
                        <img src={logo} alt="JobTracker logo" className="h-8 w-8 rounded-lg" />
                        <span className="text-2xl font-bold text-foreground">JobTracker</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <ProfileDropdown />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
                        <Button variant="outline" onClick={() => navigate("/dashboard")}>
                            Back to Dashboard
                        </Button>
                    </div>

                    {/* User Info Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <Avatar className="h-24 w-24 border-2 border-primary/10">
                                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                                    <AvatarFallback className="text-2xl bg-primary/5 text-primary">
                                        {getInitials()}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="space-y-4 text-center md:text-left flex-1">
                                    <div className="flex-1">
                                        {isEditing ? (
                                            <div className="flex items-center gap-2 mb-2">
                                                <Input
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Enter your name"
                                                    className="max-w-xs"
                                                />
                                                <Button size="icon" variant="ghost" onClick={handleSave} disabled={isSaving} title="Save">
                                                    <Save className="h-4 w-4 text-green-600" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={handleCancel} disabled={isSaving} title="Cancel">
                                                    <X className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                                <h2 className="text-2xl font-semibold">
                                                    {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                                                </h2>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 opacity-50 hover:opacity-100"
                                                    onClick={() => {
                                                        setName(user?.user_metadata?.full_name || user?.email?.split('@')[0] || "");
                                                        setIsEditing(true);
                                                    }}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mt-1">
                                            <Mail className="h-4 w-4" />
                                            <span>{user?.email}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground bg-secondary/50 py-2 px-4 rounded-full w-fit mx-auto md:mx-0">
                                        <CalendarDays className="h-4 w-4" />
                                        <span>Joined {formatDate(user?.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Statistics Grid */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Application Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{isLoading ? "-" : stats.total}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                                    <User className="h-4 w-4 text-orange-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{isLoading ? "-" : stats.interview}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Offers</CardTitle>
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{isLoading ? "-" : stats.offer}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Rejections</CardTitle>
                                    <XCircle className="h-4 w-4 text-destructive" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{isLoading ? "-" : stats.rejected}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
