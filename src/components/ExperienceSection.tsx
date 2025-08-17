import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: [
        'Led the development of a React-based dashboard that increased user engagement by 40%',
        'Mentored junior developers and established coding standards for the frontend team',
        'Collaborated with UX designers to implement responsive design systems',
        'Optimized application performance, reducing load times by 35%'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Innovations Inc.',
      location: 'Austin, TX',
      period: '2020 - 2022',
      description: [
        'Developed and maintained multiple client-facing web applications',
        'Implemented modern JavaScript frameworks and improved code quality',
        'Worked closely with backend teams to integrate RESTful APIs',
        'Participated in agile development processes and sprint planning'
      ],
      technologies: ['React', 'JavaScript', 'SASS', 'Express.js', 'MongoDB']
    },
    {
      title: 'Junior Web Developer',
      company: 'Creative Web Studio',
      location: 'Remote',
      period: '2019 - 2020',
      description: [
        'Built responsive websites and landing pages for various clients',
        'Learned modern web development best practices and workflows',
        'Collaborated with designers to translate mockups into functional websites',
        'Gained experience with version control and deployment processes'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'WordPress']
    }
  ];

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My professional journey in web development, building impactful solutions 
            and growing expertise across various technologies and teams.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card
              key={experience.company}
              className="card-gradient border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-2">
                      {experience.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium text-primary">
                      {experience.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col md:items-end mt-4 md:mt-0 space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{experience.period}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{experience.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {experience.description.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;