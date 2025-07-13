'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Github, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Programming language floating icons
const programmingLanguages = [
  { name: 'JS', color: '#F7DF1E', x: '10%', y: '20%', delay: 0 },
  { name: 'TS', color: '#3178C6', x: '85%', y: '15%', delay: 0.5 },
  { name: 'React', color: '#61DAFB', x: '15%', y: '70%', delay: 1 },
  { name: 'Node', color: '#339933', x: '80%', y: '60%', delay: 1.5 },
  { name: 'Python', color: '#3776AB', x: '20%', y: '40%', delay: 2 },
  { name: 'Java', color: '#ED8B00', x: '75%', y: '35%', delay: 2.5 },
  { name: 'C++', color: '#00599C', x: '30%', y: '80%', delay: 3 },
  { name: 'Go', color: '#00ADD8', x: '70%', y: '80%', delay: 3.5 },
  { name: 'Rust', color: '#000000', x: '90%', y: '45%', delay: 4 },
  { name: 'PHP', color: '#777BB4', x: '5%', y: '50%', delay: 4.5 },
  { name: 'Swift', color: '#FA7343', x: '40%', y: '25%', delay: 5 },
  { name: 'Kotlin', color: '#7F52FF', x: '60%', y: '70%', delay: 5.5 },
];

// Reduced set for mobile devices
const mobileProgrammingLanguages = [
  { name: 'JS', color: '#F7DF1E', x: '10%', y: '20%', delay: 0 },
  { name: 'React', color: '#61DAFB', x: '15%', y: '70%', delay: 1 },
  { name: 'Python', color: '#3776AB', x: '20%', y: '40%', delay: 2 },
  { name: 'Java', color: '#ED8B00', x: '75%', y: '35%', delay: 2.5 },
  { name: 'Go', color: '#00ADD8', x: '70%', y: '80%', delay: 3.5 },
];

const FloatingLanguage = ({ name, x, y, delay }: { name: string, x: string, y: string, delay: number }) => (
  <motion.div
    className="absolute opacity-30 dark:opacity-20 select-none pointer-events-none motion-safe"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.3, 0.4, 0.3],
      scale: [1, 1.1, 1],
      x: [0, 10, -10, 0],
      y: [0, -15, 15, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "linear",
      repeatType: "reverse"
    }}
  >
    <div className="flex items-center justify-center text-sm font-mono font-bold">
      <span className="text-muted-foreground/60 dark:text-muted-foreground/40 text-lg mr-1">&lt;</span>
      <span className="bg-background/80 dark:bg-background/60 text-foreground/80 dark:text-foreground/70 px-2 py-1 rounded border border-border/50 shadow-sm backdrop-blur-sm">
        {name}
      </span>
      <span className="text-muted-foreground/60 dark:text-muted-foreground/40 text-lg ml-1">/&gt;</span>
    </div>
  </motion.div>
);

const skills = [
  { 
    name: 'Programming Languages', 
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Kotlin', 'Swift', 'Go', 'Rust', 'PHP'] 
  },
  { 
    name: 'Web Dev', 
    items: ['React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Django', 'Flask', 'HTML5', 'CSS3', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'GraphQL'] 
  },
  { 
    name: 'Mobile Dev', 
    items: ['React Native', 'Flutter', 'Android (Kotlin)', 'iOS (Swift)', 'Expo', 'Ionic', 'Firebase', 'App Store Connect', 'Google Play Console', 'Mobile UI/UX'] 
  },
  { 
    name: 'AI & ML', 
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'LangChain', 'OpenAI API', 'Computer Vision', 'NLP', 'Data Analysis', 'Neural Networks'] 
  },
];

const projects = [
  {
    title: "Sanjeevni",
    description: "A modern, user-friendly web application that connects users with holistic Ayurvedic solutions and wellness guidance. The platform provides curated information on traditional remedies, personalized health recommendations, and a seamless browsing experience for users seeking natural healthcare alternatives.",
    image: "/images/sanjeevni.png",
    tags: ["Next.js", "Tailwind CSS", "PHP", "Vercel"],
    github: "https://github.com/swaraj-work/sanjeevani",
    demo: "https://sanjeevani-ved.vercel.app/#home"
  },
  {
    title: "NexTalk",
    description: "A modern, interactive web application that provides a seamless platform for real-time communication. Nextalk is designed to bring people together through instant messaging, enabling users to chat effortlessly with their friends. The platform features a intuitive user interface that ensure enjoyable chatting experience for everyone.",
    image: "/images/signup.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/SinghAbhinav04/NexTalk",
    demo: "https://github.com/SinghAbhinav04/NexTalk"
  },

  {
    title: "PhishGuard",
    description: "A comprehensive web extension that leverages machine learning to detect phishing websites in real-time. The system continuously improves its detection capabilities through user feedback and automated retraining.",
    image: '/images/feedback.png',
    tags: ["Python", "ML", "Node.js", "Express.js", "Flask", "MongoDB"],
    github: "https://github.com/SinghAbhinav04/Phish-Guard",
    demo: "https://github.com/SinghAbhinav04/Phish-Guard"
  }
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [activeSkillTab, setActiveSkillTab] = useState('Programming Languages');
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation variants that respect reduced motion preferences
  const orb1Animation = prefersReducedMotion 
    ? { opacity: 0.2 } 
    : {
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2],
      };

  const orb2Animation = prefersReducedMotion 
    ? { opacity: 0.15 } 
    : {
        scale: [1.1, 1, 1.1],
        opacity: [0.15, 0.25, 0.15],
      };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded request - log to console
    console.log('Form submission:', {
      timestamp: new Date().toISOString(),
      data: formData,
      status: 'success'
    });

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Function to scroll skills into view on mobile
  const scrollSkillsIntoView = () => {
    if (isMobile && skillsContainerRef.current) {
      skillsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <main className="min-h-screen w-[100vw] object-cover overflow-x-hidden">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
        {/* Floating Icons - Conditionally render based on device */}
        <div className="absolute inset-0 pointer-events-none">
          {!prefersReducedMotion && (isMobile ? mobileProgrammingLanguages : programmingLanguages).map((lang, index) => (
            <FloatingLanguage key={index} name={lang.name} x={lang.x} y={lang.y} delay={lang.delay} />
          ))}
        </div>

        {/* Gradient Orbs - Optimized for mobile */}
        <motion.div
          className="absolute top-1/4 left-1/4 md:w-72 md:h-72 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full md:blur-3xl blur-2xl motion-safe"
          animate={orb1Animation}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 md:w-96 md:h-96 w-56 h-56 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full md:blur-3xl blur-2xl motion-safe"
          animate={orb2Animation}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern App
              </span>
              <br />
              <span className="text-foreground">Solutions</span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Creating exceptional digital experiences with cutting-edge technology and thoughtful design.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="group relative z-20"
                onClick={() => {
                  const element = document.querySelector('#projects');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="relative z-20"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate developers creating innovative digital solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card to-muted/20 dark:from-card dark:via-card dark:to-primary/5 border border-border/50 dark:border-border/30 shadow-lg dark:shadow-primary/10 hover:shadow-xl dark:hover:shadow-primary/20 hover:border-primary/30 dark:hover:border-primary/50 overflow-hidden">
                <CardHeader className="relative">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Our Story</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    We, <strong>Abhinav Singh</strong> and <strong>Swadesh Patel</strong>, are two passionate developers, both 21 years old, building innovative digital solutions together. Our journey started with a shared belief: technology should be accessible, impactful, and meaningful for everyone.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-muted/30">
                      <h3 className="font-medium">Abhinav Singh</h3>
                      <a
                        href="https://www.linkedin.com/in/abhinav-singh-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        LinkedIn
                      </a>
                    </div>

                    <div className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-muted/30">
                      <h3 className="font-medium">Swadesh Patel</h3>
                      <a
                        href="https://www.linkedin.com/in/swadesh-patel-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed pt-2">
                    By combining our skills and vision, we deliver high-quality digital products that push boundaries and add real value.
                  </p>
                </CardContent>
              </Card>
            </motion.div>



            {/* Mission & Values */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card to-muted/20 dark:from-card dark:via-card dark:to-primary/5 border border-border/50 dark:border-border/30 shadow-lg dark:shadow-primary/10 hover:shadow-xl dark:hover:shadow-primary/20 hover:border-primary/30 dark:hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To transform ideas into powerful digital solutions that drive innovation and create lasting impact in the digital landscape.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card to-muted/20 dark:from-card dark:via-card dark:to-primary/5 border border-border/50 dark:border-border/30 shadow-lg dark:shadow-primary/10 hover:shadow-xl dark:hover:shadow-primary/20 hover:border-primary/30 dark:hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="text-xl">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-primary/5">Innovation</Badge>
                      <span className="text-sm text-muted-foreground">Pushing creative boundaries</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-primary/5">Quality</Badge>
                      <span className="text-sm text-muted-foreground">Excellence in every detail</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-primary/5">Collaboration</Badge>
                      <span className="text-sm text-muted-foreground">Partnership-driven approach</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging cutting-edge technologies to create innovative solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Custom Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-1">
              <div className="w-full overflow-x-auto pb-2 flex justify-start sm:justify-center no-scrollbar">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-1">
                  {skills.map((category) => (
                    <motion.button
                      key={category.name}
                      onClick={() => {
                        setActiveSkillTab(category.name);
                        scrollSkillsIntoView();
                      }}
                      className={`px-3 py-2 rounded-3xl m-1 text-sm sm:text-base font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                        activeSkillTab === category.name
                          ? 'bg-primary text-primary-foreground shadow-md scale-105'
                          : 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50'
                      }`}
                      whileHover={{ scale: activeSkillTab === category.name ? 1.05 : 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{category.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Display */}
            <motion.div
              ref={skillsContainerRef}
              key={activeSkillTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border/50 rounded-lg p-6 shadow-lg"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
                  <span>{activeSkillTab}</span>
                </h3>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-6"></div>
              </div>
              
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                {skills.find(category => category.name === activeSkillTab)?.items.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group"
                  >
                    <div className="bg-background border border-border/50 rounded-lg px-3 py-2 text-sm sm:text-base shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300">
                      {skill}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/*Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of recent work demonstrating expertise in Development
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative bg-gradient-to-br from-card via-card to-muted/20 dark:from-card dark:via-card dark:to-primary/5 border border-border/50 dark:border-border/30 shadow-lg dark:shadow-primary/10 hover:shadow-xl dark:hover:shadow-primary/20 hover:border-primary/30 dark:hover:border-primary/50">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-primary/10 dark:from-transparent dark:via-primary/10 dark:to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="relative z-10">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground">
              Ready to start your next project? Let's discuss how we can work together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Devverse@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 8146956336</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Chandigarh, India</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and We'll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitted}>
                      {isSubmitted ? 'Message Sent!' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 DevVerse. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}