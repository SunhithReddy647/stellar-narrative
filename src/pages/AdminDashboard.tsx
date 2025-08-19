import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, Code, Briefcase, GraduationCap, PenTool } from 'lucide-react';
import { HeroContentEditor } from '@/components/admin/HeroContentEditor';
import { SkillsEditor } from '@/components/admin/SkillsEditor';
import { ProjectsEditor } from '@/components/admin/ProjectsEditor';
import { ExperienceEditor } from '@/components/admin/ExperienceEditor';
import { EducationEditor } from '@/components/admin/EducationEditor';
import { BlogsEditor } from '@/components/admin/BlogsEditor';

const AdminDashboard = () => {
  const { adminUser, adminSignOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminUser) {
      navigate('/admin/login');
    }
  }, [adminUser, navigate]);

  const handleSignOut = () => {
    adminSignOut();
    navigate('/admin/login');
  };


  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Modern Header */}
      <header className="glass-card border-b border-border/50 backdrop-blur-lg bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="animate-fade-in">
              <h1 className="text-2xl font-display font-bold gradient-text">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Welcome back, {adminUser.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-primary px-6 py-2 rounded-lg text-sm font-medium hover-scale flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="animate-fade-in">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8 bg-muted/50 p-1 rounded-xl backdrop-blur-sm">
              <TabsTrigger value="hero" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 gap-2">
                <User className="h-4 w-4" />
                Hero
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 gap-2">
                <Code className="h-4 w-4" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 gap-2">
                <Briefcase className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 gap-2">
                <Briefcase className="h-4 w-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 gap-2">
                <GraduationCap className="h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger value="blogs" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 gap-2">
                <PenTool className="h-4 w-4" />
                Blogs
              </TabsTrigger>
            </TabsList>

            <div className="stagger-children">
              <TabsContent value="hero" className="card-modern p-6 rounded-xl">
                <HeroContentEditor />
              </TabsContent>
              
              <TabsContent value="skills" className="card-modern p-6 rounded-xl">
                <SkillsEditor />
              </TabsContent>
              
              <TabsContent value="projects" className="card-modern p-6 rounded-xl">
                <ProjectsEditor />
              </TabsContent>
              
              <TabsContent value="experience" className="card-modern p-6 rounded-xl">
                <ExperienceEditor />
              </TabsContent>
              
              <TabsContent value="education" className="card-modern p-6 rounded-xl">
                <EducationEditor />
              </TabsContent>
              
              <TabsContent value="blogs" className="card-modern p-6 rounded-xl">
                <BlogsEditor />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;