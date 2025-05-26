import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MailIcon, PhoneIcon, MapPinIcon, GithubIcon, LinkedinIcon } from 'lucide-react';

const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    if (!formRef.current) return;

    emailjs.sendForm(
      'service_kyqzoh5',
      'template_79obf6o',
      formRef.current,
      'kZWV_LYRYcOoTZ_Ll'
    ).then(() => {
      setSent(true);
      setSending(false);
      formRef.current?.reset();
    }).catch(() => {
      setSent(false);
      setSending(false);
    });
  };

  const contactInfo = [
    { icon: <MailIcon size={20} />, text: "jkpm4321@gmail.com", href: "mailto:jkpm4321@gmail.com" },
    { icon: <PhoneIcon size={20} />, text: "+91 7013342241", href: "tel:+917013342241" },
    { icon: <MapPinIcon size={20} />, text: "Hyderabad, India", href: "#" }
  ];

  const socialLinks = [
    { icon: <GithubIcon size={20} />, href: "https://github.com/jkplearner" },
    { icon: <LinkedinIcon size={20} />, href: "https://www.linkedin.com/in/jaya-krishna-pavan-mummaneni-b3a611293/" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-black/30 backdrop-blur-md rounded-xl p-8 md:p-12"
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl font-semibold text-white/90 mb-6">Contact Information</h3>
            <ul className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="flex items-center text-white/70 hover:text-white transition-colors group">
                    <span className="mr-3 text-blue-400 group-hover:text-blue-300 transition-colors">{item.icon}</span>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold text-white/90 mb-4">Connect With Me</h3>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white/90 mb-6">Send Me a Message</h3>
            <form ref={formRef} onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2 text-sm">Name</label>
                <input name="name" required className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2 text-sm">Email</label>
                <input type="email" name="email" required className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="Your email" />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/80 mb-2 text-sm">Message</label>
                <textarea name="message" rows={4} required className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white resize-none" placeholder="Your message"></textarea>
              </div>
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Message"}
              </motion.button>
              {sent && <p className="text-green-400 pt-2">Message sent ✅</p>}
            </form>
          </div>
        </div>
      </motion.div>
      <div className="text-center text-white/50 text-sm mt-6 mb-4">
         © 2025 All rights reserved
      </div>
    </div>
  );
};

export default ContactSection;
