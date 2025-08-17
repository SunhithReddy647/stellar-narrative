import { Code, Coffee, Heart, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code that stands the test of time."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with cross-functional teams to deliver exceptional results."
    },
    {
      icon: Coffee,
      title: "Problem Solving",
      description: "Turning complex challenges into simple, elegant solutions through creative thinking."
    },
    {
      icon: Heart,
      title: "User Focus",
      description: "Putting users first in every decision to create meaningful digital experiences."
    }
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate frontend developer with a keen eye for design and a love for creating 
            exceptional user experiences that make a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="fade-in-left">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              My Journey
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With over 5 years of experience in web development, I've had the privilege of working 
                on diverse projects ranging from startup MVPs to enterprise-scale applications. My 
                passion lies in bridging the gap between design and functionality.
              </p>
              <p>
                I believe that great software is not just about clean code, but about understanding 
                user needs and creating solutions that are both beautiful and practical. Every line 
                of code I write is driven by the desire to make technology more accessible and enjoyable.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open 
                source projects, or enjoying a good cup of coffee while reading about the latest 
                trends in web development.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 fade-in-right">
            {highlights.map((item) => (
              <Card key={item.title} className="card-gradient border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;