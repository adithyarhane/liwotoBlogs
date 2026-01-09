import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-gray-200">
      {/* Soft Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Lewoto<span className="text-emerald-500">Blogs</span>
            </h2>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              A modern blogging platform where ideas turn into impact. Read
              thoughtfully. Write clearly. Grow consistently.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              <SocialIcon href="https://github.com">
                <Github size={20} />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com">
                <Linkedin size={20} />
              </SocialIcon>
              <SocialIcon href="https://twitter.com">
                <Twitter size={20} />
              </SocialIcon>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <FooterTitle>Explore</FooterTitle>
            <ul className="mt-4 space-y-3 text-sm">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/create-blog">Write a Blog</FooterLink>
              <FooterLink to="/saved-blogs">Saved Blogs</FooterLink>
              <FooterLink to="/my-blogs">My Blogs</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <FooterTitle>Resources</FooterTitle>
            <ul className="mt-4 space-y-3 text-sm">
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <FooterTitle>Stay Updated</FooterTitle>
            <p className="mt-4 text-sm text-gray-600">
              Get notified when new blogs are published.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="relative w-full">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <button className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()} LiwotoBlogs. All rights reserved.
          </span>

          <span className="mt-3 md:mt-0">
            Explore with ❤️ using LiwotoBlogs
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* Reusable Components */

const FooterTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
    {children}
  </h3>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-600 hover:text-emerald-500 transition">
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="p-2 rounded-full border border-gray-300 text-gray-500 hover:text-emerald-500 hover:border-emerald-400 transition"
  >
    {children}
  </a>
);
