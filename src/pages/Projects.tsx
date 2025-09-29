import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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
      <section className="py-20 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1>Our Projects</h1>
            <p className="text-xl text-primary-foreground/90">
              Explore our portfolio of innovative engineering solutions
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30 border-b">
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
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !selectedTag
                    ? "bg-accent text-accent-foreground"
                    : "bg-background border hover:bg-muted"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-accent text-accent-foreground"
                      : "bg-background border hover:bg-muted"
                  }`}
                >
                  {tag}
                </button>
              ))}
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
              {filteredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.slug}`}>
                  <Card className="overflow-hidden hover:shadow-elevated transition-all group cursor-pointer h-full">
                    <div className="aspect-video bg-gradient-accent relative overflow-hidden">
                      {project.cover_image_path && (
                        <img
                          src={project.cover_image_path}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {project.summary}
                      </p>
                      {project.tags && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
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
