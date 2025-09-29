import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/projects">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-accent">
        {project.cover_image_path && (
          <img
            src={project.cover_image_path}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Content */}
      <section className="py-12 -mt-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/projects">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          <div className="bg-card rounded-lg shadow-elevated p-8 md:p-12">
            <h1 className="mb-6">{project.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
              {project.client && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Client: {project.client}</span>
                </div>
              )}
              {project.start_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {format(new Date(project.start_date), "MMM yyyy")}
                    {project.end_date && ` - ${format(new Date(project.end_date), "MMM yyyy")}`}
                  </span>
                </div>
              )}
            </div>

            {project.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.summary && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-lg text-muted-foreground">{project.summary}</p>
              </div>
            )}

            {project.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  {project.description}
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.gallery_paths && Array.isArray(project.gallery_paths) && project.gallery_paths.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.gallery_paths.map((path: string, idx: number) => (
                    <div
                      key={idx}
                      className="aspect-video rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={path}
                        alt={`${project.title} - Image ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
