import { useState, useEffect, useRef } from 'react';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills = [
    { name: 'React & Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript (ES6+)', level: 95 },
    { name: 'HTML5 & CSS3', level: 98 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Node.js & Express', level: 85 },
    { name: 'Git & Version Control', level: 88 },
    { name: 'UI/UX Design', level: 80 },
  ];

  const tools = [
    'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express',
    'MongoDB', 'PostgreSQL', 'Git', 'Docker', 'AWS', 'Figma', 'Framer Motion',
    'React Query', 'Zustand', 'Jest', 'Cypress', 'Webpack', 'Vite'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks to bring ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className="fade-in-left">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Technical Proficiency
            </h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className={`skill-progress ${isVisible ? 'animate-pulse' : ''}`}
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${skills.indexOf(skill) * 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="fade-in-right">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Tools & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool}
                  className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-sm font-medium text-foreground">{tool}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-foreground mb-3">
                Currently Learning
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Rust', 'Go', 'Web3', 'Three.js'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;