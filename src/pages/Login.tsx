import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, navigate to calendar
    navigate("/calendar");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // For demo purposes, navigate to calendar
    navigate("/calendar");
  };

  return (
    <div className="min-h-screen bg-cal-dark-bg flex">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-[448px] bg-cal-sidebar-bg flex flex-col justify-center px-6 lg:px-12 xl:px-16">
        <div className="w-full max-w-sm mx-auto space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Log in</h1>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-[#333335] border-[#333335] text-white hover:bg-[#444446] gap-3"
              onClick={() => handleSocialLogin("Google")}
            >
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs text-blue-500 font-bold">G</span>
              </div>
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-[#333335] border-[#333335] text-white hover:bg-[#444446] gap-3"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-xs text-white font-bold">f</span>
              </div>
              Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cal-text/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-cal-sidebar-bg text-white font-semibold">
                Or
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-cal-input-bg border-cal-input-bg text-white placeholder:text-white/70 h-12 pl-4"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-cal-input-bg border-cal-input-bg text-white placeholder:text-white/70 h-12 pl-4 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70"
                >
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  className="border-cal-text/50 data-[state=checked]:bg-cal-primary"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-cal-primary cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link
                to="/reset-password"
                className="text-sm text-cal-primary hover:text-cal-primary/80"
              >
                Reset Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-cal-primary hover:bg-cal-primary/90 text-white font-semibold"
            >
              Log in
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-white">Don't have account yet? </span>
            <Link
              to="/signup"
              className="text-cal-primary hover:text-cal-primary/80 font-medium"
            >
              New Account
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-cal-dark-bg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-center">
          {/* Clock illustration placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 bg-cal-orange rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-cal-primary rounded-full relative">
                <div className="absolute top-1 left-1/2 w-0.5 h-6 bg-cal-primary transform -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1 w-4 h-0.5 bg-cal-primary transform -translate-y-1/2"></div>
              </div>
            </div>
          </div>

          {/* Workspace illustration placeholder */}
          <div className="relative w-96 h-64 mx-auto">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-40 bg-cal-orange/20 rounded-lg"></div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-cal-primary rounded-lg shadow-lg">
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute top-2 left-8 w-16 h-2 bg-white/50 rounded"></div>
              <div className="absolute top-6 left-2 w-24 h-1 bg-white/30 rounded"></div>
            </div>
            <div className="absolute bottom-12 right-8 w-8 h-16 bg-cal-blue rounded"></div>
            <div className="absolute bottom-4 right-16 w-12 h-8 bg-cal-badge rounded"></div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-cal-dark-bg via-cal-dark-bg to-cal-primary/5"></div>
      </div>
    </div>
  );
};

export default Login;
