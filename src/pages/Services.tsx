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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-foreground">Dennic's Electrical Engineering Services</h1>
            <p className="text-lg text-muted-foreground">
              At Dennic, we provide a comprehensive suite of specialized electrical engineering
              services. Our expert team is dedicated to delivering innovative, reliable, and safe
              solutions tailored to the unique challenges of your projects.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services?.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-card transition-all"
                >
                  <CardContent className="pt-8 pb-8">
                    <div className="h-14 w-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                      <div className="h-8 w-8 text-accent">
                        {/* Icon placeholder */}
                        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 13V7h2v6H9zm0 2v2h2v-2H9z"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                    <p className="text-muted-foreground">
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
