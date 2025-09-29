import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock } from "lucide-react";

export default function Careers() {
  const positions = [
    {
      title: "Senior Structural Engineer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      description: "Lead structural design projects for commercial and residential buildings.",
    },
    {
      title: "Project Manager",
      department: "Management",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Oversee multiple engineering projects from conception to completion.",
    },
    {
      title: "Civil Engineer",
      department: "Engineering",
      location: "Chicago, IL",
      type: "Full-time",
      description: "Design and supervise infrastructure projects including roads and bridges.",
    },
    {
      title: "Engineering Intern",
      department: "Engineering",
      location: "Multiple Locations",
      type: "Internship",
      description: "Gain hands-on experience in various engineering disciplines.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-foreground">Join Our Team</h1>
            <p className="text-lg text-muted-foreground">
              Build your career with industry-leading engineering experts
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Why Work With Us?</h2>
            <p className="text-xl text-muted-foreground">
              We offer more than just a job - we offer a career
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Competitive Compensation",
                description: "Industry-leading salaries and comprehensive benefits packages",
              },
              {
                title: "Professional Growth",
                description: "Continuous learning opportunities and career advancement paths",
              },
              {
                title: "Work-Life Balance",
                description: "Flexible schedules and generous time-off policies",
              },
              {
                title: "Innovative Projects",
                description: "Work on cutting-edge engineering challenges",
              },
              {
                title: "Collaborative Culture",
                description: "Supportive team environment that values diverse perspectives",
              },
              {
                title: "Modern Technology",
                description: "Access to state-of-the-art tools and resources",
              },
            ].map((benefit, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground">
              Explore opportunities to grow your engineering career
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {positions.map((position, index) => (
              <Card key={index} className="hover:shadow-card transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">{position.title}</h3>
                      <p className="text-muted-foreground mb-4">{position.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          {position.department}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {position.type}
                        </div>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6">Don't See the Right Position?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always interested in hearing from talented engineers. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a href="/contact">
            <Button size="lg">Contact Us</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
