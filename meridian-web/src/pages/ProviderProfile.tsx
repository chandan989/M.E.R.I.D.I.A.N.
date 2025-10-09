import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Shield, CheckCircle, Mail, Phone, Loader2, Briefcase, Tag, MessageSquare } from "lucide-react";
import { useOne } from "@/contexts/OneContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const ProviderProfile = () => {
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();

  useEffect(() => {
    if (!isLoading && !did) {
      toast.error("You must be logged in to view profiles.");
      navigate("/connect");
    }
  }, [did, isLoading, navigate]);

  // This would typically be fetched based on a URL parameter
  const provider = {
    did: "did:web5:provider...xyz", // Example DID
    name: "DataProvider Inc.",
    avatarUrl: "/avatars/01.png",
    bio: "Leading provider of high-quality, ethically sourced data for machine learning and business intelligence. We specialize in climate, economic, and healthcare data, empowering innovation and driving progress.",
    rating: 4.9,
    reviews: 128,
    verified: true,
    memberSince: "2021",
    contact: {
      email: "contact@dataprovider.com",
      phone: "+1 (555) 123-4567",
    },
    tags: ["Climate", "Economics", "Healthcare", "Machine Learning", "Big Data", "AI"],
  };

  if (isLoading || !did) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">Verifying authentication...</p>
      </div>
    );
  }

  const isOwner = userType === 'provider' && did === provider.did;

  return (
    <div className="min-h-screen bg-white text-gray-800 animate-fade-in relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Profile Header */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage src={provider.avatarUrl} alt={provider.name} />
            <AvatarFallback className="text-4xl">{provider.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">{provider.name}</h1>
              {provider.verified && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-700 border-green-200">
                  <Shield className="h-4 w-4" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-6 text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-bold">{provider.rating}</span>
                <span>({provider.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Member since {provider.memberSince}</span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">{provider.bio}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: About & Specialties */}
          <div className="md:col-span-2 space-y-8">
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#FD4102]" />
                        About {provider.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{provider.bio}</p>
                </CardContent>
            </Card>
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Tag className="h-5 w-5 text-[#FD4102]" />
                        Specialties & Tags
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        {provider.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-sm px-3 py-1">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact & Actions */}
          <div className="space-y-8">
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href={`mailto:${provider.contact.email}`} className="hover:underline text-[#FD4102] font-semibold">
                    {provider.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">{provider.contact.phone}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-50 bg-gradient-to-br from-[#FD4102]/10 to-transparent">
                <CardContent className="pt-6">
                    {isOwner ? (
                        <Link to="/profile/edit" className="w-full">
                        <Button size="lg" className="w-full h-12 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl transition-all duration-300">Edit Profile</Button>
                        </Link>
                    ) : (
                        <Button size="lg" className="w-full h-12 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl transition-all duration-300">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Send a Message
                        </Button>
                    )}
                    <p className="text-xs text-center mt-3 text-muted-foreground">Connect with {provider.name} to discuss your data needs.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
