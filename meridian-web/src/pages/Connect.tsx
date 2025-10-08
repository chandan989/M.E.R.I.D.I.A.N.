import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Wallet,
  Shield,
  CheckCircle2,
  ArrowRight,
  Loader2,
  User,
  Database,
} from "lucide-react";

const Connect = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"provider" | "buyer" | null>(null);

  const handleConnectWallet = () => {
    setLoading(true);
    // Simulate wallet connection
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      toast.success("Web5 wallet connected successfully!");
    }, 2000);
  };

  const handleCreateDID = () => {
    setLoading(true);
    // Simulate DID creation
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      toast.success("Decentralized Identity created!");
    }, 2500);
  };

  const handleCompleteSetup = () => {
    if (!userType) {
      toast.error("Please select your user type");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Setup complete! Welcome to M.E.R.I.D.I.A.N.");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold">Welcome to M.E.R.I.D.I.A.N.</h1>
            <p className="text-muted-foreground">
              Set up your Web5 identity and start your data sovereignty journey
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-1 w-12 ${
                        step > s ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Connect Wallet */}
          {step === 1 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-6 w-6 text-primary" />
                  Connect Your Web5 Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">What is Web5?</h4>
                      <p className="text-sm text-muted-foreground">
                        Web5 gives you complete control over your data and identity. No
                        intermediaries, no data brokers - just pure self-sovereignty.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Your data stays in your personal DWN</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>You control who accesses your information</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Cryptographically secured identity</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleConnectWallet}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect Web5 Wallet
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Don't have a Web5 wallet?{" "}
                  <Button variant="link" className="h-auto p-0">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Create DID */}
          {step === 2 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Create Your Decentralized Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Your Personal Data Vault</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll set up your Decentralized Web Node (DWN) - a personal data vault
                        that only you control.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Choose a Username</Label>
                    <Input id="username" placeholder="myusername" className="mt-1.5" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Generating your unique DID</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Setting up your Decentralized Web Node</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Securing your data with encryption</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleCreateDID}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Identity...
                    </>
                  ) : (
                    <>
                      Create My DID
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Profile Setup */}
          {step === 3 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6 text-primary" />
                  Complete Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-4 block">I want to:</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card
                      className={`cursor-pointer border-2 transition-all ${
                        userType === "provider"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setUserType("provider")}
                    >
                      <CardContent className="flex flex-col items-center p-6 text-center">
                        <Database className="mb-3 h-12 w-12 text-primary" />
                        <h3 className="mb-2 font-semibold">Provide Data</h3>
                        <p className="text-sm text-muted-foreground">
                          Upload and monetize your datasets
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer border-2 transition-all ${
                        userType === "buyer"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setUserType("buyer")}
                    >
                      <CardContent className="flex flex-col items-center p-6 text-center">
                        <Wallet className="mb-3 h-12 w-12 text-primary" />
                        <h3 className="mb-2 font-semibold">Buy Data</h3>
                        <p className="text-sm text-muted-foreground">
                          Access high-quality datasets
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm">
                    <strong>Your DID:</strong>
                    <br />
                    <code className="text-xs">did:web5:eyJraWQi...a8Vk9fQ</code>
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleCompleteSetup}
                  disabled={loading || !userType}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;
