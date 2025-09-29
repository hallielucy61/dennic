import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search } from "lucide-react";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Get all unique tags
  const allTags = Array.from(
    new Set(projects?.flatMap((p) => p.tags || []) || [])
  );

  // Filter projects
  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      project.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || project.tags?.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-foreground">Our Projects</h1>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of successful electrical engineering projects, showcasing our
              commitment to quality, innovation, and client satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section - Hidden by default to match design */}
      <section className="py-4 bg-muted/30 border-b hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => {
                const bgColors = ["project-card-blue", "project-card-gray", "project-card-teal", "project-card-teal", "project-card-gray", "project-card-gray"];
                const bgClass = bgColors[idx % bgColors.length];
                
                return (
                  <Link key={project.id} to={`/projects/${project.slug}`}>
                    <Card className="overflow-hidden hover:shadow-elevated transition-all group cursor-pointer h-full">
                      <div className={`aspect-video ${bgClass} flex items-center justify-center relative overflow-hidden`}>
                        {project.cover_image_path ? (
                          <img
                            src={project.cover_image_path}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-white/20 text-sm">Project Image</div>
                        )}
                      </div>
                      <CardContent className="pt-6 pb-6">
                        <h3 className="text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.summary}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-accent">
                          View Case Study →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No projects found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
