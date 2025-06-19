import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, LogIn } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-md w-full mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-800">
              Base Calendar
            </CardTitle>
            <CardDescription>
              A modern calendar application with scheduling and team
              collaboration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/login" className="block">
              <Button className="w-full h-12 gap-3 bg-cal-primary hover:bg-cal-primary/90">
                <LogIn className="w-5 h-5" />
                Go to Login
              </Button>
            </Link>
            <Link to="/calendar" className="block">
              <Button variant="outline" className="w-full h-12 gap-3">
                <Calendar className="w-5 h-5" />
                Go to Calendar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
