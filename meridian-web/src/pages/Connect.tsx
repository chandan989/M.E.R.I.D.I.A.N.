import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Wallet,
  CheckCircle2,
  Loader2,
  UserPlus,
  Database,
  LogIn,
  ArrowRight,
  Info,
  Shield,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { useDid } from "../contexts/DidContext";
import { useUserType } from "../contexts/UserTypeContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ConnectPageNavigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-white/80 backdrop-blur-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="M.E.R.I.D.I.A.N. Logo" className="h-6 w-auto" />
          <span
            className={`text-xl font-black transition-colors ${
              scrolled
                ? "text-gray-800"
                : "bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent"
            }`}
          >
            M.E.R.I.D.I.A.N.
          </span>
        </Link>
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </header>
  );
};

const Connect = () => {
  const navigate = useNavigate();
  const { did, setDid } = useDid();
  const { userType: globalUserType, setUserType: setGlobalUserType } = useUserType();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"provider" | "buyer" | null>(null);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [authAction, setAuthAction] = useState<"login" | "register">("register");
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (did && globalUserType) {
      navigate(globalUserType === "provider" ? "/provider-dashboard" : "/buyer-dashboard");
    }
  }, [did, globalUserType, navigate]);

  const resetAuthStates = () => {
    setWalletId(null);
    setUserType(null);
    setStep(1);
    setUsername("");
    setLoading(false);
  };

  const handleConnectWallet = (action: "login" | "register") => {
    setLoading(true);
    setTimeout(() => {
      const simulatedId = `did:web5:${Date.now()}`;
      setWalletId(simulatedId);
      setDid(simulatedId);
      setLoading(false);
      toast.success("Web5 wallet connected successfully!");
      if (action === 'register') {
        setStep(2);
      }
    }, 2000);
  };

  const handleRegister = () => {
    if (!userType) {
      toast.error("Please select your user type");
      return;
    }
    setLoading(true);
    setGlobalUserType(userType);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Registration complete! Welcome, ${username}!`);
      navigate(userType === "provider" ? "/provider-dashboard" : "/buyer-dashboard");
    }, 1500);
  };
  
  const handleLogin = () => {
    if (!userType) {
      toast.error("Please select your role to login");
      return;
    }
    setLoading(true);
    setGlobalUserType(userType);
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful! Welcome back.");
      navigate(userType === "provider" ? "/provider-dashboard" : "/buyer-dashboard");
    }, 1000);
  };

  const renderLogin = () => (
     <Card className="animate-fade-in border-2 shadow-2xl shadow-[#FD4102]/10">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-xl">
              <KeyRound className="h-6 w-6 text-[#FD4102]" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Login to Your Account</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Connect your wallet and select your role to continue.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {!walletId ? (
             <Button
                size="lg"
                className="w-full h-14 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30"
                onClick={() => handleConnectWallet('login')}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wallet className="mr-2 h-6 w-6" />}
                {loading ? 'Connecting...' : 'Connect Web5 Wallet'}
              </Button>
          ) : (
            <>
              <div>
                <Label className="mb-4 block text-base font-bold text-gray-900">Select your role:</Label>
                <div className="grid gap-6 sm:grid-cols-2">
                  {renderUserTypeSelector("provider")}
                  {renderUserTypeSelector("buyer")}
                </div>
              </div>
               <Button
                  size="lg"
                  className="w-full h-14 text-base font-bold"
                  onClick={handleLogin}
                  disabled={loading || !userType}
                >
                  {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <LogIn className="mr-2 h-6 w-6" />}
                  Login
                </Button>
            </>
          )}
          <div className="text-center pt-2">
            <Button variant="link" className="text-muted-foreground" onClick={() => { setAuthAction('register'); resetAuthStates(); }}>
              Don't have an account? Register
            </Button>
          </div>
        </CardContent>
     </Card>
  );

  const renderRegister = () => (
    <Card className="animate-fade-in border-2 shadow-2xl shadow-[#FD4102]/10">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {step === 1 && "Step 1: Connect your secure Web5 wallet."}
              {step === 2 && "Step 2: Choose a unique username for your profile."}
              {step === 3 && "Step 3: Choose how you'll participate in the network."}
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Info className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs z-50">
                <div className="space-y-4 p-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-background rounded-md shadow-sm border">
                        <Shield className="h-5 w-5 text-[#FD4102]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-md mb-1">What is Web5?</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Web5 gives you complete control over your data and identity. No
                          intermediaries, no data brokers - just pure self-sovereignty.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-700">Key Benefits</h4>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                        <span className="text-xs font-medium">Your data stays in your personal DWN</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                        <span className="text-xs font-medium">You control who accesses your information</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                        <span className="text-xs font-medium">Cryptographically secured identity</span>
                      </div>
                    </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <Button
            size="lg"
            className="w-full h-14 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30"
            onClick={() => handleConnectWallet('register')}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wallet className="mr-2 h-6 w-6" />}
            {loading ? 'Connecting...' : 'Connect Web5 Wallet'}
          </Button>
        )}

        {step === 2 && (
          <>
            <div>
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700 mb-2 block">
                Choose a Username
              </Label>
              <Input 
                id="username" 
                placeholder="my_awesome_username"
                className="h-12 px-4 border-2 focus:border-[#FD4102] transition-colors"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <Button
              size="lg"
              className="w-full h-14 text-base font-bold"
              onClick={() => {
                if (username.trim().length < 3) {
                  toast.error("Username must be at least 3 characters");
                  return;
                }
                setStep(3);
              }}
            >
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <Label className="mb-4 block text-base font-bold text-gray-900">I want to:</Label>
              <div className="grid gap-6 sm:grid-cols-2">
                {renderUserTypeSelector("provider")}
                {renderUserTypeSelector("buyer")}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#FD4102]/5 via-transparent to-transparent p-4 border space-y-2">
                <div>
                    <p className="text-xs font-semibold text-gray-500">Your DID:</p>
                    <code className="text-xs text-gray-600 break-all">{walletId}</code>
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-500">Your Username:</p>
                    <code className="text-sm text-gray-800 font-bold">{username}</code>
                </div>
            </div>
            <Button
              size="lg"
              className="w-full h-14 text-base font-bold"
              onClick={handleRegister}
              disabled={loading || !userType}
            >
              {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <UserPlus className="mr-2 h-6 w-6" />}
              Complete Registration
            </Button>
          </>
        )}
        <div className="text-center pt-2">
          <Button variant="link" className="text-muted-foreground" onClick={() => { setAuthAction('login'); resetAuthStates(); }}>
            Already have an account? Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  const renderUserTypeSelector = (type: "provider" | "buyer") => {
    const icons = {
      provider: <Database className={`h-8 w-8 ${userType === type ? "text-white" : "text-[#FD4102]"}`} />,
      buyer: <Wallet className={`h-8 w-8 ${userType === type ? "text-white" : "text-[#FD4102]"}`} />
    };
    const titles = {
      provider: "Provide Data",
      buyer: "Buy Data"
    };
    const descriptions = {
      provider: "Upload and monetize datasets.",
      buyer: "Access high-quality datasets."
    };

    return (
      <Card
        className={`cursor-pointer border-2 transition-all duration-300 hover:scale-105 group ${
          userType === type
            ? "border-[#FD4102] bg-[#FD4102]/5 shadow-lg"
            : "hover:border-[#FD4102]/50"
        }`}
        onClick={() => setUserType(type)}
      >
        <CardContent className="flex flex-col items-center p-4 text-center">
          <div className={`p-3 rounded-xl mb-3 transition-all duration-300 ${
            userType === type 
              ? "bg-gradient-to-br from-[#FD4102] to-[#FF6B35] shadow-md" 
              : "bg-gray-100 group-hover:bg-[#FD4102]/10"
          }`}>
            {icons[type]}
          </div>
          <h3 className="mb-1 text-md font-bold">{titles[type]}</h3>
          <p className="text-xs text-muted-foreground">{descriptions[type]}</p>
          {userType === type && (
            <div className="mt-2 flex items-center gap-1 text-[#FD4102] text-xs font-semibold">
              <CheckCircle2 className="h-3 w-3" />
              Selected
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      <ConnectPageNavigation />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-md w-full">
            <div className="mb-8 text-center animate-fade-in">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">
                  Join The Network
                </span>
              </div>
              <h1 className="mb-2 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
                {authAction === 'register' ? 'Create Your Identity' : 'Access Your Account'}
              </h1>
              <p className="text-lg text-muted-foreground">
                True Data Sovereignty with Web5
              </p>
            </div>

            {authAction === 'register' && renderRegister()}
            {authAction === 'login' && renderLogin()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
