import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOne } from "@/contexts/OneContext";
import { useEffect } from "react";
import { toast } from "sonner";

const DisplayDataset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();

  useEffect(() => {
    if (!isLoading) {
      if (!did) {
        toast.error("You must be logged in to view this page.");
        navigate("/connect");
      } else if (userType === 'provider') {
        navigate("/provider-dashboard");
        toast.error("This page is for data buyers to view their acquired datasets.");
      }
    }
  }, [did, userType, isLoading, navigate]);

  // Mock data for a single dataset
  const dataset = {
    id: id,
    name: "Global Weather Patterns",
    description: "A comprehensive dataset of global weather patterns from 2000-2023.",
    files: [
      { name: "weather_data_2000-2010.csv", size: "1.2 GB" },
      { name: "weather_data_2011-2020.csv", size: "1.5 GB" },
      { name: "weather_data_2021-2023.csv", size: "0.5 GB" },
      { name: "data_dictionary.pdf", size: "1.2 MB" },
    ],
    sampleData: [
      { date: "2023-01-01", location: "New York", temperature: "35°F", precipitation: "0.1 in" },
      { date: "2023-01-01", location: "London", temperature: "8°C", precipitation: "2 mm" },
      { date: "2023-01-01", location: "Tokyo", temperature: "10°C", precipitation: "1 mm" },
    ],
  };

  if (isLoading || !did || userType !== 'buyer') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">Verifying authentication...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link to="/my-datasets">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Datasets
          </Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{dataset.name}</span>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Full Dataset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{dataset.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dataset.files.map((file) => (
                <li key={file.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="mr-3 h-5 w-5 text-muted-foreground" />
                    <span>{file.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{file.size}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sample Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(dataset.sampleData[0]).map((key) => (
                    <TableHead key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataset.sampleData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DisplayDataset;
