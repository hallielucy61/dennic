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
      <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Engineering Excellence
              <span className="block text-accent">For Tomorrow</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              We deliver cutting-edge engineering solutions that transform ideas into reality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects">
                <Button size="lg" variant="secondary" className="group">
                  View Our Work
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, value: "500+", label: "Projects Completed" },
              { icon: Users, value: "50+", label: "Expert Engineers" },
              { icon: Award, value: "25+", label: "Awards Won" },
              { icon: TrendingUp, value: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive engineering solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services?.map((service) => (
              <Card key={service.id} className="hover:shadow-elevated transition-all cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <div className="h-6 w-6 bg-accent rounded" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground">
              Showcasing our latest innovative engineering solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <Link key={project.id} to={`/projects/${project.slug}`}>
                <Card className="overflow-hidden hover:shadow-elevated transition-all group cursor-pointer">
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
                    <p className="text-muted-foreground mb-4">{project.summary}</p>
                    {project.tags && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag: string, idx: number) => (
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
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button size="lg">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Let's collaborate to bring your engineering vision to life
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
