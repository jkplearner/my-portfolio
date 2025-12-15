import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

const CertificateSection: React.FC = () => {
    const certificates = [
        {
            title: "Salesforce Certified Agentforce Specialist",
            issuer: "Salesforce",
            date: "December 5th, 2025",
            description: "Validated expertise in building and deploying autonomous agents with Agentforce.",
            pdfUrl: "/Cert7122858_AgentforceSpecialist_20251205.pdf"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-black/30 backdrop-blur-md rounded-xl p-8 md:p-12 border border-white/5"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-bold text-white mb-8"
                >
                    My <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">Certifications</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300"
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                    <FileText size={24} />
                                </div>
                                <span className="text-white/40 text-sm">{cert.date}</span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {cert.title}
                            </h3>

                            <p className="text-white/60 mb-1">{cert.issuer}</p>
                            <p className="text-white/50 text-sm mb-6 line-clamp-3">
                                {cert.description}
                            </p>

                            <a
                                href={cert.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                View Certificate
                                <ExternalLink size={14} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default CertificateSection;
