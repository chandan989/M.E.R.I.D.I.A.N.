import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Shield, CheckCircle, Mail, Phone } from "lucide-react";

const ProviderProfile = () => {
  const provider = {
    name: "DataProvider Inc.",
    avatarUrl: "/avatars/01.png",
    bio: "Leading provider of high-quality, ethically sourced data for machine learning and business intelligence. We specialize in climate, economic, and healthcare data.",
    rating: 4.9,
    reviews: 128,
    verified: true,
    memberSince: "2021",
    contact: {
      email: "contact@dataprovider.com",
      phone: "+1 (555) 123-4567",
    },
    tags: ["Climate", "Economics", "Healthcare", "Machine Learning", "Big Data"],
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={provider.avatarUrl} alt={provider.name} />
            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold">{provider.name}</h1>
              {provider.verified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  Verified Provider
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-bold">{provider.rating}</span>
                <span>({provider.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-5 w-5" />
                <span>Member since {provider.memberSince}</span>
              </div>
            </div>
            <p className="text-muted-foreground">{provider.bio}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {provider.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href={`mailto:${provider.contact.email}`} className="hover:underline">
                    {provider.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{provider.contact.phone}</span>
                </div>
              </div>
              <Button className="mt-6 w-full">Send a Message</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderProfile;
