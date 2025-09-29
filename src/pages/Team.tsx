import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Linkedin } from "lucide-react";

export default function Team() {
  const { data: team, isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1>Our Team</h1>
            <p className="text-xl text-primary-foreground/90">
              Meet the experts driving innovation and excellence
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
            </div>
          ) : team && team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {team.map((member) => (
                <Card
                  key={member.id}
                  className="overflow-hidden hover:shadow-elevated transition-all group"
                >
                  <div className="aspect-square bg-gradient-accent relative overflow-hidden">
                    {member.photo_path ? (
                      <img
                        src={member.photo_path}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary-foreground">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-accent font-medium mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {member.bio}
                      </p>
                    )}
                    {member.linked_in && (
                      <a
                        href={member.linked_in}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn Profile
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No team members to display yet
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Want to Join Our Team?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented engineers to join our growing team
          </p>
          <a href="/careers">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              View Open Positions
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
