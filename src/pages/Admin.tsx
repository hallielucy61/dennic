import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Project management interface coming soon. You can manage projects directly in the Cloud backend.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Service management interface coming soon. You can manage services directly in the Cloud backend.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Team management interface coming soon. You can manage team members directly in the Cloud backend.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Contact submissions interface coming soon. You can view submissions directly in the Cloud backend.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
