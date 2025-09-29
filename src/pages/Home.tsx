import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, Award, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Home() {
  const { data: projects } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center hero-bg text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Expert Electrical Engineering by Dennic
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Dennic delivers unparalleled electrical engineering solutions. Our team of
              certified professionals is dedicated to providing safe, reliable, and innovative
              designs for projects of any scale.
            </p>
            <div className="pt-4">
              <Link to="/services">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4 text-foreground">Our Expertise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Power Systems Design",
                icon: "⚡",
              },
              {
                title: "Lighting & Controls",
                icon: "💡",
              },
              {
                title: "Renewable Energy Systems",
                icon: "⚡",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all">
                <CardContent className="pt-8 pb-8">
                  <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4 text-foreground">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Commercial Building Design", desc: "Designed a state-of-the-art office complex with sustainable features.", bg: "project-card-teal" },
              { title: "Infrastructure Development", desc: "Managed the construction of a major highway expansion project.", bg: "project-card-blue" },
              { title: "Environmental Engineering", desc: "Developed an advanced water treatment facility for a large municipality.", bg: "project-card-gray" },
            ].map((project, index) => (
              <Link key={index} to="/projects">
                <Card className="overflow-hidden hover:shadow-elevated transition-all group cursor-pointer h-full">
                  <div className={`aspect-video ${project.bg} flex items-center justify-center`}>
                    {/* Placeholder for project image */}
                  </div>
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-foreground">Ready to Start Your Project?</h2>
          <div className="pt-4">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
