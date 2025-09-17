"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Download,
  Menu,
  X,
  ChevronDown,
  Code,
  Brain,
  Zap,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Interactive Neural Network Component
const InteractiveNeuralNetwork = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nodes] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 400,
      connections: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => Math.floor(Math.random() * 20)
      ),
    }))
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden opacity-10"
      onMouseMove={handleMouseMove}
    >
      <svg className="w-full h-full" viewBox="0 0 800 400">
        {/* Connections */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes[targetId];
            if (!target) return null;
            const distance = Math.sqrt(
              Math.pow(mousePosition.x - node.x, 2) +
                Math.pow(mousePosition.y - node.y, 2)
            );
            const opacity = Math.max(0, 1 - distance / 200);

            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke="#3b82f6"
                strokeWidth="1"
                opacity={opacity}
                animate={{ opacity: opacity * 0.6 }}
                transition={{ duration: 0.3 }}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node) => {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - node.x, 2) +
              Math.pow(mousePosition.y - node.y, 2)
          );
          const scale = Math.max(0.5, 1 - distance / 300);

          return (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r="4"
              fill="#3b82f6"
              animate={{
                scale: scale,
                opacity: scale,
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Typing Animation Component
const TypingAnimation = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className="font-mono">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="text-blue-500"
      >
        |
      </motion.span>
    </span>
  );
};

// Animated Skill Bar Component
const AnimatedSkillBar = ({
  skill,
  percentage,
  delay = 0,
}: {
  skill: string;
  percentage: number;
  delay?: number;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700 font-medium">{skill}</span>
        <span className="text-blue-600 font-semibold">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Interactive Project Card Component
const InteractiveProjectCard = ({
  title,
  description,
  details,
  technologies,
  color,
  icon: Icon,
}: {
  title: string;
  description: string;
  details: string[];
  technologies: string[];
  color: string;
  icon: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setTrainingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTrainingProgress(0);
    }
  }, [isHovered]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-${color}-100`}>
                <Icon className={`h-6 w-6 text-${color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>

          <p className="text-gray-600 mb-4">{description}</p>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4"
            >
              <div className="text-sm text-gray-500 mb-2">
                Training Progress:
              </div>
              <Progress value={trainingProgress} className="h-2" />
              <div className="text-xs text-gray-400 mt-1">
                {trainingProgress}% Complete
              </div>
            </motion.div>
          )}

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            {details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <div
                  className={`w-2 h-2 bg-${color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}
                ></div>
                <p>{detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className={`bg-${color}-50 text-${color}-700 border-${color}-200`}
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 10 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 overflow-x-hidden relative">
      {/* Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-blue-500/20 rounded-full pointer-events-none z-50 mix-blend-multiply"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Floating Data Points */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              AG
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["About", "Experience", "Projects", "Education", "Contact"].map(
                (item) => (
                  <motion.button
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-lg transition-all font-medium ${
                      activeSection === item.toLowerCase()
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item}
                  </motion.button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 space-y-2"
            >
              {["About", "Experience", "Projects", "Education", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    {item}
                  </button>
                )
              )}
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <InteractiveNeuralNetwork />

        <div className="max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Aryaman Goenka
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.1 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 whitespace-nowrap overflow-hidden "
            >
              <TypingAnimation
                text="Computer Science • AI/ML Enthusiast • Full-Stack Developer"
                delay={0.01}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            >
              Building the future with artificial intelligence and innovative
              web technologies. Currently pursuing CS at UMass Amherst with a
              passion for creating intelligent solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Zap className="mr-2 h-5 w-5" />
                Let's Connect
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              <ChevronDown className="h-8 w-8 text-blue-600" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              About Me
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate about the intersection of artificial intelligence and
              software engineering. I build intelligent systems that solve
              real-world problems.
            </p>
          </motion.div>

          {/* Interactive Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "AI & Machine Learning",
                icon: Brain,
                color: "blue",
                skills: [
                  {
                    name: "Neural Networks",
                    description: "Deep learning architectures and training",
                  },
                  {
                    name: "Computer Vision",
                    description: "Image processing and object detection",
                  },
                  {
                    name: "TensorFlow/PyTorch",
                    description: "ML framework expertise",
                  },
                  {
                    name: "Model Optimization",
                    description: "Performance tuning and deployment",
                  },
                ],
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Full-Stack Development",
                icon: Code,
                color: "purple",
                skills: [
                  {
                    name: "React.js/Next.js",
                    description: "Modern frontend frameworks",
                  },
                  {
                    name: "Python/Flask",
                    description: "Backend development and APIs",
                  },
                  {
                    name: "Database Design",
                    description: "SQL and data architecture",
                  },
                  {
                    name: "Cloud Deployment",
                    description: "Scalable application hosting",
                  },
                ],
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Data Science",
                icon: Target,
                color: "green",
                skills: [
                  {
                    name: "Data Analysis",
                    description: "Statistical analysis and insights",
                  },
                  {
                    name: "Visualization",
                    description: "Interactive charts and dashboards",
                  },
                  {
                    name: "Algorithm Design",
                    description: "Efficient problem-solving approaches",
                  },
                  {
                    name: "Research Methods",
                    description: "Scientific approach to development",
                  },
                ],
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-6">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${category.gradient} mr-4`}
                      >
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {category.title}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.2 + skillIndex * 0.1,
                          }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} mt-2 flex-shrink-0`}
                            ></div>
                            <div>
                              <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                                {skill.name}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {skill.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Technology Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Python",
                "JavaScript",
                "TypeScript",
                "React.js",
                "Flask",
                "TensorFlow",
                "PyTorch",
                "OpenCV",
                "SQL",
                "Git",
                "Docker",
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 border border-blue-200 px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="relative py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-9xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Experience
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                company: "Paktolus Solutions",
                position: "Software Engineering Intern",
                duration: "May 2025 – July 2025",
                location: "Florida, USA",
                highlights: [
                  "Architected scalable full-stack User Management System using Django REST Framework, FastAPI, and Next.js",
                  "Integrated JWT authentication and responsive UI with shadcn/ui and Tailwind CSS",
                  "Deployed RESTful APIs with microservices architecture and 80%+ test coverage",
                ],
                tech: ["Django", "FastAPI", "Next.js", "TypeScript", "JWT"],
                color: "purple",
              },
              {
                company: "Advanced Learning Technologies Lab",
                position: "Undergraduate Research Intern",
                duration: "Jan 2025 – May 2025",
                location: "UMass Amherst",
                highlights: [
                  "Built AI agent for automated prompts to top-tier Hugging Face models",
                  "Automated CSV-to-prompt generation, reducing manual parsing time by 60%",
                  "Accelerated behavioral insights for metacognition and embodied learning research",
                ],
                tech: ["Python", "Hugging Face", "AI/ML", "Data Analysis"],
                color: "purple",
              },
              {
                company: "Telspiel Communications",
                position: "Software Development Intern",
                duration: "March 2023 – April 2023",
                location: "Delhi, India",
                highlights: [
                  "Developed interactive dashboard reducing user navigation time by 40%",
                  "Engineered modular GUI components improving cross-platform navigation",
                  "Optimized UI for 150 million daily interactions with 45% efficiency increase",
                ],
                tech: ["React.js", "Bootstrap", "JavaScript", "UI/UX"],
                color: "purple",
              },
            ].map((experience, index) => (
              <motion.div
                key={experience.company}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card
                  className={`bg-gradient-to-br from-${experience.color}-50 to-white border border-${experience.color}-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {experience.position}
                        </h3>
                        <p
                          className={`text-lg font-semibold text-${experience.color}-600 mb-1`}
                        >
                          {experience.company}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {experience.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-500">
                          {experience.duration}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {experience.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-${experience.color}-500 mt-2 flex-shrink-0`}
                          ></div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {experience.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 bg-${experience.color}-100 text-${experience.color}-700 text-xs rounded-full font-medium`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600">
              Interactive AI/ML projects that showcase innovation and technical
              expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <InteractiveProjectCard
              title="Neural Network Builder"
              description="Drag-and-drop interface for designing and training neural networks"
              details={[
                "Real-time training visualization with WebSockets",
                "Support for CNNs, regression, and classification",
                "Multiple export formats (.py, .ipynb, .keras)",
                "Interactive model configuration interface",
              ]}
              technologies={[
                "Python",
                "Flask",
                "React",
                "TensorFlow",
                "WebSockets",
              ]}
              color="blue"
              icon={Brain}
            />

            <InteractiveProjectCard
              title="Modelic"
              description="ML Deployment & Monitoring Platform with automated GitHub integration"
              details={[
                "Automated GitHub-based model deployment (30s latency)",
                "24h drift detection using PSI and KL-Divergence",
                "Real-time inference dashboard and monitoring",
                "Automated alerts with rollback capabilities",
              ]}
              technologies={[
                "FastAPI",
                "Celery",
                "Supabase",
                "GitHub Actions",
                "PSI/KL-Div",
              ]}
              color="purple"
              icon={Target}
            />

            <InteractiveProjectCard
              title="The Inbox Guard"
              description="Email deliverability platform automating DNS configuration and monitoring"
              details={[
                "Automated SPF/DMARC/DKIM setup (70% DNS reduction)",
                "Postmaster monitoring with Slack/email alerts",
                "60% incident response time improvement",
                "Multi-tenant support for 150M+ emails (99.9% uptime)",
              ]}
              technologies={[
                "FastAPI",
                "Next.js",
                "Cloudflare",
                "GCP",
                "PostgreSQL",
              ]}
              color="green"
              icon={Zap}
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Education
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white border border-gray-200 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Bachelor of Science in Computer Science
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold">
                      University of Massachusetts Amherst
                    </p>
                    <p className="text-gray-600">Amherst, Massachusetts</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-blue-600 font-semibold">
                      Expected May 2028
                    </p>
                    <p className="text-green-600 font-bold text-lg">
                      GPA: 3.83/4.00
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Academic Excellence
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Foundations of Programming (Python)",
                        "Object-Oriented Programming (Java)",
                        "Calculus II & III",
                        "Linear Algebra",
                      ].map((course, index) => (
                        <motion.div
                          key={course}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{course}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Leadership & Research
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Project Lead: MassAI",
                        "E-Board Member: CICSoft",
                        "Research Assistant: Khwarizmi Lab",
                        "Undergraduate Intern: Advanced Learning Technologies Lab",
                      ].map((role, index) => (
                        <motion.div
                          key={role}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{role}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to collaborate on the next breakthrough in AI and
              technology? Let's build something amazing together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1800px] mx-auto">
            {[
              {
                href: "mailto:aryamangoenk@umass.edu",
                icon: Mail,
                title: "Email",
                subtitle: "aryamangoenk@umass.edu",
                colorScheme: {
                  bg: "from-blue-50",
                  border: "border-blue-200",
                  icon: "text-blue-600",
                  title: "text-blue-700",
                },
              },
              {
                href: "tel:413-472-9935",
                icon: Phone,
                title: "Phone",
                subtitle: "413-472-9935",
                colorScheme: {
                  bg: "from-green-50",
                  border: "border-green-200",
                  icon: "text-green-600",
                  title: "text-green-700",
                },
              },
              {
                href: "https://www.linkedin.com/in/aryaman-goenka-072abb271/",
                icon: Linkedin,
                title: "LinkedIn",
                subtitle: "aryamangoenka",
                colorScheme: {
                  bg: "from-blue-50",
                  border: "border-blue-200",
                  icon: "text-[#0A66C2]",
                  title: "text-[#0A66C2]",
                },
              },
              {
                href: "https://github.com/aryamangoenka",
                icon: Github,
                title: "GitHub",
                subtitle: "aryamangoenka",
                colorScheme: {
                  bg: "from-gray-50",
                  border: "border-gray-200",
                  icon: "text-gray-600",
                  title: "text-gray-700",
                },
              },
            ].map((contact, index) => (
              <motion.a
                key={contact.title}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Card
                  className={`bg-gradient-to-br ${contact.colorScheme.bg} to-white border ${contact.colorScheme.border} shadow-lg hover:shadow-xl transition-all`}
                >
                  <CardContent className="p-6 text-center">
                    <contact.icon
                      className={`h-8 w-8 ${contact.colorScheme.icon} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    />
                    <h3
                      className={`font-semibold ${contact.colorScheme.title} mb-2`}
                    >
                      {contact.title}
                    </h3>
                    <p className="text-[10px] text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis px-1">
                      {contact.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            © 2024 Aryaman Goenka. Crafted with Next.js, Tailwind CSS, and
            Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}
