import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: true });
      
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
            <h1>Our Services</h1>
            <p className="text-xl text-primary-foreground/90">
              Comprehensive engineering solutions tailored to your unique challenges
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-elevated transition-all group"
                >
                  <CardContent className="pt-6">
                    <div className="h-16 w-16 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <div className="h-8 w-8 bg-accent rounded" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                    <p className="text-muted-foreground text-lg">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is ready to discuss your unique engineering challenges
          </p>
          <a href="/contact">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Get In Touch
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
