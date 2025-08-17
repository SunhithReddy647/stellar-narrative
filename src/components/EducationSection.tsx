import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EducationSection = () => {
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      period: '2015 - 2019',
      gpa: '3.8/4.0',
      description: 'Focused on software engineering, algorithms, and data structures. Completed senior capstone project on machine learning applications in web development.',
      coursework: ['Data Structures & Algorithms', 'Web Development', 'Database Systems', 'Software Engineering', 'Computer Graphics', 'Machine Learning']
    }
  ];

  const certifications = [
    {
      title: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      year: '2023',
      credentialId: 'AWS-CDA-2023-001'
    },
    {
      title: 'React Developer Certification',
      issuer: 'Meta',
      year: '2022',
      credentialId: 'META-RDC-2022-456'
    },
    {
      title: 'Google Analytics Certified',
      issuer: 'Google',
      year: '2021',
      credentialId: 'GAIQ-2021-789'
    }
  ];

  const achievements = [
    'Dean\'s List (6 semesters)',
    'Outstanding Senior Project Award',
    'ACM Programming Contest - Regional Finalist',
    'Computer Science Department Scholarship Recipient'
  ];

  return (
    <section id="education" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Education & Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Continuous learning and professional development to stay at the forefront 
            of technology and best practices.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <div className="fade-in-left">
            <div className="flex items-center mb-8">
              <GraduationCap className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-semibold text-foreground">Education</h3>
            </div>

            {education.map((edu) => (
              <Card key={edu.degree} className="card-gradient border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {edu.degree}
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {edu.institution}
                  </CardDescription>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{edu.period}</span>
                    <span className="font-semibold">GPA: {edu.gpa}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-6">{edu.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Relevant Coursework</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-sm text-muted-foreground"
                        >
                          • {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Achievements</h4>
                    <ul className="space-y-2">
                      {achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start">
                          <Award className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div className="fade-in-right">
            <div className="flex items-center mb-8">
              <BookOpen className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-semibold text-foreground">Certifications</h3>
            </div>

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Card
                  key={cert.title}
                  className="card-gradient border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {cert.title}
                    </CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {cert.issuer}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Year: {cert.year}</span>
                      <span className="text-muted-foreground">ID: {cert.credentialId}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Continuous Learning */}
            <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Continuous Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Currently pursuing additional certifications and staying updated with:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Next.js 14', 'TypeScript Advanced', 'Cloud Architecture', 'DevOps Practices'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;