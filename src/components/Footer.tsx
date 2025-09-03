import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        
        {/* Left Side: Logo & Tagline */}
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center gap-2">
            Worldline <span>🚀</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            “A journey through history’s most impactful events — from ancient eras to modern milestones.”
          </p>
        </div>

        {/* Right Side: Social & Certified */}
        <div className="flex flex-col items-center md:items-end gap-3">
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-indigo-500 transition"
            >
              <Github className="w-5 h-5 text-gray-300 hover:text-white" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-indigo-500 transition"
            >
              <Linkedin className="w-5 h-5 text-gray-300 hover:text-white" />
            </a>
          </div>

          {/* Certified Line */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Worldline — Certified Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
