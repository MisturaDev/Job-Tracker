import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, TrendingUp, Calendar } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">JobTracker</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Track your applications.
          <br />
          <span className="text-primary">Manage your career journey.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Stay organized and never miss an opportunity. JobTracker helps you manage all your job applications in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Start Tracking Free
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              I already have an account
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Everything you need to organize your job search
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Track Applications</h3>
              <p className="text-muted-foreground">
                Keep all your job applications organized with status updates and notes.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Never Miss Interviews</h3>
              <p className="text-muted-foreground">
                Add notes and reminders for upcoming interviews and follow-ups.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">See Your Progress</h3>
              <p className="text-muted-foreground">
                Dashboard with stats to help you understand your job search progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Ready to take control of your job search?
        </h2>
        <p className="text-muted-foreground mb-8">
          Join thousands of job seekers who use JobTracker to land their dream jobs.
        </p>
        <Link to="/signup">
          <Button size="lg">Get Started for Free</Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 JobTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
