import { useState, useEffect } from "react";
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
import { useOne } from "@/contexts/OneContext";
import { useWeb3 } from "@/hooks/useWeb3";
import { useContracts } from "@/hooks/useContracts";
import { web5Service } from "@/services/web5";

const Upload = () => {
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();
  const { isConnected: web3Connected, connect: connectWallet } = useWeb3();
  const { listDataset, isLoading: contractLoading } = useContracts();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [datasetId] = useState(`dataset-${Date.now()}`);
  const [price, setPrice] = useState("1.0");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [datasetTitle, setDatasetTitle] = useState("");
  const [datasetCategory, setDatasetCategory] = useState("");

  useEffect(() => {
    if (!isLoading) {
      if (!did) {
        toast.error("You must be logged in to upload datasets.");
        navigate("/connect");
      } else if (userType === 'buyer') {
        navigate("/marketplace");
        toast.error("You must be a data provider to upload datasets.");
      }
    }
  }, [did, userType, isLoading, navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`File selected: ${file.name}`);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    
    setLoading(true);
    
    try {
      // Read file data
      const fileData = await selectedFile.text();
      
      // Actually write to DWN (or localStorage in mock mode)
      const recordId = await web5Service.writeToDWN(
        {
          datasetId: datasetId,
          title: datasetTitle || selectedFile.name,
          category: datasetCategory || "Other",
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          data: fileData,
          uploadedAt: new Date().toISOString()
        },
        'https://meridian.io/schemas/dataset'
      );
      
      console.log('✅ Data written to DWN/localStorage:', recordId);
      
      toast.success(
        web5Service.isMockMode() 
          ? "File stored locally (mock mode)" 
          : "File uploaded to YOUR DWN!"
      );
      
      setStep(3);
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast.error("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      toast.success("AI analysis complete!");
    }, 3000);
  };

  const handleMint = async () => {
    if (!web3Connected) {
      toast.error("Please connect your MetaMask wallet first");
      await connectWallet();
      return;
    }

    setLoading(true);
    try {
      await listDataset(datasetId, price);
      toast.success("Dataset listed on blockchain marketplace!");
      navigate("/my-datasets");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !did || userType !== 'provider') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">Verifying authentication...</p>
      </div>
    );
  }

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
                    value={datasetTitle}
                    onChange={(e) => setDatasetTitle(e.target.value)}
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
                    {selectedFile ? selectedFile.name : "Drag and drop your file here"}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "or click to browse"}
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".csv,.json,.xml,.xlsx,.sql,.parquet"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FileUp className="mr-2 h-4 w-4" />
                      {selectedFile ? "Change File" : "Choose File"}
                    </label>
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
                    disabled={loading || !selectedFile}
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
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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
                <CardTitle>Mint NFT & List on Blockchain</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!web3Connected && (
                  <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                    <p className="text-sm font-medium text-orange-800 mb-2">
                      ⚠️ MetaMask wallet required to list on blockchain
                    </p>
                    <Button onClick={connectWallet} size="sm" variant="outline">
                      Connect MetaMask
                    </Button>
                  </div>
                )}
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
                    disabled={loading || !web3Connected}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Listing on Blockchain...
                      </>
                    ) : (
                      "List on Blockchain Marketplace"
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
