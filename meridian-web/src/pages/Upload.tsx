import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Upload as UploadIcon,
  FileUp,
  CheckCircle2,
  Loader2,
  Sparkles,
  Shield,
  Coins,
} from "lucide-react";

const Upload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleUploadFile = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      toast.success("File uploaded to your DWN successfully!");
    }, 2000);
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      toast.success("AI analysis complete!");
    }, 3000);
  };

  const handleMint = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("NFT minted successfully! Your dataset is now listed.");
      navigate("/my-datasets");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold">Upload Dataset</h1>
            <p className="text-muted-foreground">
              Transform your data into a monetizable NFT in just a few steps
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-1 w-12 ${step > s ? "bg-primary" : "bg-muted"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Dataset Information */}
          {step === 1 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Dataset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Dataset Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Global Healthcare Patient Data"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="demographics">Demographics</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your dataset in detail..."
                    className="mt-1.5 min-h-32"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="healthcare, medical, global, research"
                    className="mt-1.5"
                  />
                </div>

                <Button size="lg" className="w-full" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Upload Data */}
          {step === 2 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileUp className="h-6 w-6 text-primary" />
                  Upload Your Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border-2 border-dashed border-border p-12 text-center hover:border-primary transition-colors">
                  <UploadIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">
                    Drag and drop your file here
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    or click to browse
                  </p>
                  <Button variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h4 className="mb-2 font-semibold">Supported Formats:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["CSV", "JSON", "XML", "XLSX", "SQL", "Parquet"].map(
                      (format) => (
                        <Badge key={format} variant="secondary">
                          {format}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Privacy First</h4>
                      <p className="text-sm text-muted-foreground">
                        Your data is uploaded directly to your personal DWN. We never
                        see or store your data on our servers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleUploadFile}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload to DWN"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: AI Analysis */}
          {step === 3 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  AI Quality Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Temporary Access Grant</h4>
                      <p className="text-sm text-muted-foreground">
                        Our AI will analyze your data for quality scoring and pricing.
                        Access is temporary and can be revoked at any time.
                      </p>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="py-12 text-center">
                    <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
                    <p className="text-lg font-semibold">Analyzing your dataset...</p>
                    <p className="text-sm text-muted-foreground">
                      This may take a few moments
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="mb-1 text-3xl font-bold text-primary">92%</p>
                          <p className="text-sm text-muted-foreground">Quality Score</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="mb-1 text-3xl font-bold text-primary">88%</p>
                          <p className="text-sm text-muted-foreground">Completeness</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="mb-1 text-3xl font-bold text-primary">95%</p>
                          <p className="text-sm text-muted-foreground">Uniqueness</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-3 font-semibold">AI Suggested Price</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-2xl font-bold">
                          <Coins className="h-6 w-6 text-primary" />
                          250 CTC
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on quality, size, and market demand
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="custom-price">Set Your Price (CTC)</Label>
                      <Input
                        id="custom-price"
                        type="number"
                        defaultValue="250"
                        className="mt-1.5"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(2)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={loading ? handleAnalyze : () => setStep(4)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Continue to Minting"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Mint NFT */}
          {step === 4 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Mint NFT & List</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-primary/5 p-6">
                  <h3 className="mb-4 text-lg font-semibold">NFT Preview</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dataset:</span>
                      <span className="font-semibold">
                        Global Healthcare Patient Data
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="secondary">Healthcare</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold">250 CTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quality Score:</span>
                      <span className="font-semibold">4.6 ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gas Fee (est.):</span>
                      <span className="font-semibold">~5 CTC</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Full ownership rights retained</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Automatic royalties on resale</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Instant marketplace listing</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(3)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleMint}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Minting...
                      </>
                    ) : (
                      "Mint NFT & List"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
