import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-foreground">About Dennic Engineering</h1>
            <p className="text-lg text-muted-foreground">
              Leading the way in innovative engineering solutions since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Founded in 2010, Dennic Engineering has grown from a small team of passionate engineers to a leading firm in comprehensive engineering solutions.
                </p>
                <p>
                  Our journey has been defined by innovation, excellence, and an unwavering commitment to delivering projects that exceed expectations.
                </p>
                <p>
                  Today, we serve clients across multiple industries, bringing cutting-edge engineering expertise to every challenge we undertake.
                </p>
              </div>
            </div>
            <div className="aspect-video rounded-lg bg-gradient-accent shadow-elevated" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground text-lg">
                  To deliver innovative engineering solutions that transform challenges into opportunities, while maintaining the highest standards of quality, safety, and sustainability.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <Eye className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground text-lg">
                  To be the most trusted engineering partner, recognized globally for our innovation, expertise, and commitment to building a better future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                description: "Pursuing the highest standards in every project",
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Working together to achieve exceptional results",
              },
              {
                icon: Target,
                title: "Innovation",
                description: "Embracing new technologies and creative solutions",
              },
              {
                icon: Eye,
                title: "Integrity",
                description: "Operating with honesty and transparency always",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all">
                <CardContent className="pt-6">
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 hero-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Projects" },
              { value: "50+", label: "Engineers" },
              { value: "25+", label: "Countries" },
              { value: "15+", label: "Years" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-bold mb-2 text-accent">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
