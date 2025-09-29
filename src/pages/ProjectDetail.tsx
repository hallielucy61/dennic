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
      {/* Content */}
      <section className="py-12 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link to="/projects">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          <div className="space-y-12">
            <div>
              <h1 className="mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground">
                {project.summary || "A detailed look into Dennic's expert electrical engineering solutions for a modern manufacturing facility."}
              </p>
            </div>

            {/* Hero Image Placeholder */}
            {project.cover_image_path && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={project.cover_image_path}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Project Overview */}
            <div>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-accent">Project Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description || "This case study details Dennic's role in the complete electrical system overhaul for a large-scale manufacturing plant. The project demanded innovative electrical engineering solutions to enhance efficiency, ensure robust power distribution, and meet future expansion needs while adhering to the strictest safety protocols."}
              </p>
            </div>

            {/* Challenges */}
            <div>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-accent">Challenges</h2>
              <p className="text-muted-foreground leading-relaxed">
                The primary challenges included upgrading a live facility with minimal downtime, integrating new high-demand automated machinery, and ensuring the new system was both scalable and energy-efficient. Dennic's expertise was critical in navigating complex existing infrastructure and developing a phased implementation plan to avoid production disruptions.
              </p>
            </div>

            {/* Solutions */}
            <div>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-accent">Solutions by Dennic</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Dennic team conducted a comprehensive power system analysis and designed a new, resilient power distribution network. Our solution featured custom switchgear, advanced circuit protection, and a state-of-the-art power monitoring system. We implemented a meticulously planned, phased rollout, allowing sections of the plant to be upgraded during scheduled maintenance windows, ensuring our client's operations remained uninterrupted.
              </p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-accent">Results</h2>
              <p className="text-muted-foreground leading-relaxed">
                The project was completed on time and within budget, significantly improving the plant's electrical reliability and capacity. Dennic's expert electrical engineering solution led to a 20% increase in energy efficiency and provided a scalable foundation for the client's future growth. The facility now stands as a testament to modern industrial electrical design, showcasing Dennic's commitment to quality and technical excellence.
              </p>
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Client Testimonial */}
              <div className="bg-accent/5 border-l-4 border-accent p-6 rounded">
                <h2 className="text-2xl font-bold mb-4">Client Testimonial</h2>
                <p className="text-muted-foreground italic mb-4">
                  "Dennic's deep expertise in electrical engineering was the key to our project's success. Their professionalism and innovative solutions not only met our complex requirements but exceeded our expectations. We couldn't have asked for a better partner."
                </p>
                <p className="text-sm font-semibold">
                  - {project.client || "John Carter"}, Plant Manager, Innovate Manufacturing
                </p>
              </div>

              {/* Technical Specifications */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Main Power Supply</span>
                    <span className="text-muted-foreground">12.47 kV</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Total Connected Load</span>
                    <span className="text-muted-foreground">5 MVA</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Distribution System</span>
                    <span className="text-muted-foreground">480V/277V, 3-Phase, 4-Wire</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Key Equipment</span>
                    <span className="text-muted-foreground">Custom Switchgear, VFDs, PLCs</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Safety Standards</span>
                    <span className="text-muted-foreground">NEC, NFPA 70E</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Energy Efficiency</span>
                    <span className="text-muted-foreground font-semibold text-accent">20% Improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
