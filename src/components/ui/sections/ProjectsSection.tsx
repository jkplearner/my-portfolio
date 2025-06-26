import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon } from 'lucide-react';

interface Contributor {
  name: string;
  role: string;
  github: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  links: {
    github?: string;
    liveDemo?: string;
  };
  contributors?: Contributor[]; // Optional field
}

const ProjectsSection: React.FC = () => {
  const projects: Project[] = [
    {
      title: "SmartMatch Resumes",
      description:
        "An intelligent resume screening tool that semantically matches resumes with job descriptions using NLP and deep learning. Features resume ranking, skill extraction, and personalized feedback.",
      tags: ["Python", "NLP", "Streamlit", "Deep Learning", "AI"],
      links: {
        github: "https://github.com/jkplearner/smartMatchResumes", 
        liveDemo: "https://smartmatchresumes-live-demo.streamlit.app/", 
      },
    },
    {
      title: "Nutrimap FoodAnalyzer",
      description:
        "A web application that analyzes food items and provides nutritional information. Built using JavaScript and CSS.",
      tags: ["JavaScript", "CSS", "Nutrition", "Web App"],
      links: {
        github: "https://github.com/jkplearner/Nutrimap-FoodAnalyzer", 
      },
    },
    {
      title: "Chatbot using Gemini",
      description:
        "A chatbot application developed using the MERN stack and integrated with the Gemini API. Features include speech-to-text, text-to-speech, image sending, and chat history management.",
      tags: ["MERN", "Gemini API", "Chatbot", "AI"],
      links: {
        github: "https://github.com/jkplearner/Chatbot-using-gemini", 
      },
    },
    {
      title: "Dairy Management App",
      description:
        "A web-based application designed to streamline dairy products operations by managing records of milk products, sales, and inventory with automated data handling and real-time analytics.",
      tags: ["Salesforce", "Apex", "Lightning Web Components (LWC)", "Salesforce Automation"],
      links: {
        github: "https://github.com/jkplearner/Dairy-Management", 
      },
    },
    {
      title: "Quizzy",
      description:
        "An AI-powered quiz application that dynamically generates quizzes based on user-selected topics and difficulty levels using Gemini API. Features include real-time scoring, MCQ and FIB support, question navigation, and downloadable results.",
      tags: ["React", "AI", "Gemini API", "JavaScript", "Vercel"],
      links: {
        github: "https://github.com/jkplearner/Quizzy", 
        liveDemo: "https://quizzy-project.vercel.app/", 
      },
      contributors: [
        {
          name: "Jaya Krishna Pavan Mummaneni",
          role: "Backend & AI Logic",
          github: "https://github.com/jkplearner", 
        },
        {
          name: "Srineela Reddy M",
          role: "Frontend & UI Design",
          github: "https://github.com/srinime1806", 
        },
      ],
    },
    {
  title: "StegaNest",
  description:
    "A secure image steganography app built with the MERN stack that allows users to hide encrypted messages inside images and retrieve them using password-based AES decryption. Supports real-time LSB encoding, multi-format image input, and downloadable encoded output.",
  tags: ["React", "Steganography", "CryptoJS", "JavaScript", "Vercel"],
  links: {
    github: "https://github.com/jkplearner/StegaNest",
    liveDemo: "https://stega-nest.vercel.app/",
  },
  contributors: [
    {
      name: "Jaya Krishna Pavan Mummaneni",
      role: "Fullstack Developer & Crypto Logic",
      github: "https://github.com/jkplearner",
    },
    {
      name: "Srineela Reddy M",
      role: "UI Collaboration & Visual Design",
      github: "https://github.com/srinime1806",
    }
  ],
}

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="bg-black/30 backdrop-blur-md rounded-xl p-8 md:p-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          My{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Projects
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-white/10 rounded-full text-white/80 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Contributors Section */}
                {project.contributors && project.contributors.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/60 mb-2">Contributors:</h4>
                    <ul className="space-y-1">
                      {project.contributors.map((contributor, idx) => (
                        <li key={idx} className="text-xs text-white/60" style={{ fontWeight: 'bold' }}>
                          <a href={contributor.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {contributor.name} - <span className="italic">{contributor.role}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  {project.links.github && (
                    <motion.a
                      href={project.links.github}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/80 text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon size={14} />
                      <span>Code</span>
                    </motion.a>
                  )}

                  {project.links.liveDemo && (
                    <motion.a
                      href={project.links.liveDemo}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/80 text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <motion.a
            href="https://github.com/jkplearner?tab=repositories"
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium transition-all hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;