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
import { useOne } from "../contexts/OneContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { web5Service } from "@/services/web5";
import { web3Service } from "@/services/web3";
import { Web5Error } from "@/services/web5/types";
import { Web3Error } from "@/services/web3/types";

const ConnectPageNavigation = () => {
  return (
    <header
      className={`sticky top-0 z-50 w-full bg-black text-white`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="M.E.R.I.D.I.A.N. Logo" className="h-6 w-auto" />
            <span
              className={`text-xl font-bold tracking-tight`}
            >
              M.E.R.I.D.I.A.N.
            </span>
          </Link>
          <Link to="/">
            <Button variant="ghost" className={'text-white'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

const Connect = () => {
  const navigate = useNavigate();
  const { did, setDid, userType: globalUserType, setUserType: setGlobalUserType } = useOne();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"provider" | "buyer" | null>(null);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [web3Address, setWeb3Address] = useState<string | null>(null);
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
    setWeb3Address(null);
    setUserType(null);
    setStep(1);
    setUsername("");
    setLoading(false);
  };

  const handleConnectWeb5 = async (action: "login" | "register") => {
    setLoading(true);
    try {
      console.log('Starting Web5 connection...', { action });
      
      // For registration, create a new DID
      // For login, connect to existing DID
      let newDid: string;
      
      if (action === 'register') {
        console.log('Creating new Web5 wallet...');
        // Create new Web5 wallet (DID + DWN)
        newDid = await web5Service.createDID();
        console.log('Web5 wallet created:', newDid);
        
        // Check if mock mode was used
        if (web5Service.isMockMode()) {
          toast.warning("Development Mode: Using local storage (DHT network unavailable)", {
            duration: 5000,
          });
        } else {
          toast.success("Web5 wallet created successfully!");
        }
      } else {
        console.log('Connecting to existing Web5 wallet...');
        // Connect to existing Web5 wallet
        const result = await web5Service.connect();
        newDid = result.did;
        console.log('Web5 wallet connected:', newDid);
        toast.success("Web5 wallet connected successfully!");
      }
      
      setWalletId(newDid);
      setDid(newDid);
      
      if (action === 'register') {
        setStep(2);
      }
    } catch (error: any) {
      console.error('Failed to connect Web5:', error);
      console.error('Error details:', {
        message: error?.message,
        code: error?.code,
        stack: error?.stack
      });
      
      if (error instanceof Web5Error) {
        // Show the detailed error message
        if (error.code === 'NETWORK_ERROR') {
          toast.error(error.message, {
            duration: 8000, // Show longer for network errors
          });
        } else {
          toast.error(error.message);
        }
      } else {
        const errorMessage = error?.message || "Failed to create Web5 wallet. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWeb3 = async () => {
    setLoading(true);
    try {
      const { address } = await web3Service.connect();
      
      setWeb3Address(address);
      toast.success("Web3 wallet connected successfully!");
      
      return true;
    } catch (error) {
      console.error('Failed to connect Web3:', error);
      
      if (error instanceof Web3Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to connect Web3 wallet. Please try again.");
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!userType) {
      toast.error("Please select your user type");
      return;
    }

    if (!web3Address) {
      toast.error("Please connect your Web3 wallet first");
      return;
    }

    setLoading(true);
    try {
      // Set user type in global context
      setGlobalUserType(userType);
      
      toast.success(`Registration complete! Welcome, ${username}!`);
      navigate(userType === "provider" ? "/provider-dashboard" : "/buyer-dashboard");
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogin = async () => {
    if (!userType) {
      toast.error("Please select your role to login");
      return;
    }

    setLoading(true);
    try {
      // Connect Web3 wallet for login
      const web3Connected = await handleConnectWeb3();
      
      if (!web3Connected) {
        return;
      }

      // Set user type in global context
      setGlobalUserType(userType);
      
      toast.success("Login successful! Welcome back.");
      navigate(userType === "provider" ? "/provider-dashboard" : "/buyer-dashboard");
    } catch (error) {
      console.error('Login failed:', error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
                onClick={() => handleConnectWeb5('login')}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wallet className="mr-2 h-6 w-6" />}
                {loading ? 'Connecting...' : 'Access Your Web5 Wallet'}
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
              {step === 1 && "Step 1: Create your secure Web5 identity (DID + DWN)."}
              {step === 2 && "Step 2: Choose a unique username for your profile."}
              {step === 3 && "Step 3: Choose your role and connect Web3 wallet."}
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
          <>
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Your wallet will be created automatically
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    No external wallet needed! We'll create a secure Web5 identity (DID) and personal data storage (DWN) for you in your browser.
                  </p>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full h-14 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30"
              onClick={() => handleConnectWeb5('register')}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wallet className="mr-2 h-6 w-6" />}
              {loading ? 'Creating Your Wallet...' : 'Create Web5 Wallet'}
            </Button>
          </>
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
            
            {!web3Address ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <p className="text-sm text-blue-800 font-medium">
                    Connect your Web3 wallet to complete registration
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    This wallet will be used for blockchain transactions and NFT operations
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-bold"
                  onClick={handleConnectWeb3}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wallet className="mr-2 h-6 w-6" />}
                  {loading ? 'Connecting...' : 'Connect Web3 Wallet'}
                </Button>
              </div>
            ) : (
              <>
                <div className="rounded-2xl bg-gradient-to-br from-[#FD4102]/5 via-transparent to-transparent p-4 border space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">Your DID (Web5):</p>
                    <code className="text-xs text-gray-600 break-all">{walletId}</code>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500">Your Wallet (Web3):</p>
                    <code className="text-xs text-gray-600 break-all">{web3Address}</code>
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
              : "bg-[#FD4102]/10 "
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
    <div className="min-h-screen bg-white relative flex flex-col">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      <ConnectPageNavigation />

      <main className="flex-grow flex items-center justify-center">
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="mx-auto max-w-lg w-full">
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
      </main>
    </div>
  );
};

export default Connect;
