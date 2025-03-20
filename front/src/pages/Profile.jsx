import React from 'react';
import { Linkedin, Twitter, Globe, Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample profile data based on the provided JSON
const profileData = {
  success: true,
  data: {
    user: {
      _id: "67dc6fd563258e86cbcf1541",
      name: "John Smith",
      email: "john@example.com",
      role: "founder",
      createdAt: "2025-03-20T19:43:17.719Z",
      updatedAt: "2025-03-20T19:43:17.719Z",
      startups: []
    },
    profile: {
      _id: "67dc6fd563258e86cbcf1542",
      userId: "67dc6fd563258e86cbcf1541",
      name: "John Smith",
      email: "john@example.com",
      bio: "Serial entrepreneur with 10 years of experience in SaaS",
      skills: ["Product Management", "UX Design", "Growth Hacking"],
      experience: [
        {
          title: "CEO",
          company: "PreviousStartup Inc.",
          from: "2018-01-01",
          to: "2022-12-31",
          description: "Led the company from ideation to $5M ARR"
        }
      ],
      education: [
        {
          degree: "MBA",
          institution: "Stanford University",
          year: "2015"
        }
      ],
      achievements: [
        "Featured in Forbes 30 under 30",
        "TechCrunch Disrupt Finalist 2019"
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/johnsmith",
        twitter: "https://twitter.com/johnsmith",
        website: "https://johnsmith.me"
      },
      startups: [],
      createdAt: "2025-03-20T19:43:17.915Z",
      updatedAt: "2025-03-20T19:43:17.915Z"
    }
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const ProfilePage = () => {
  const { profile, user } = profileData.data;
  
  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Custom component definitions with enhanced styling
  const Avatar = ({ children }) => (
    <div className="w-36 h-36 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden border-4 border-white transition-all duration-300 hover:scale-105">
      {children}
    </div>
  );

  const AvatarFallback = ({ children }) => (
    <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
      {children}
    </span>
  );

  const Badge = ({ children, className }) => (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${className} backdrop-blur-sm transition-all duration-300 hover:shadow-md`}>
      {children}
    </span>
  );

  const Card = ({ children, className }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );

  const CardHeader = ({ children, className }) => (
    <div className={`p-6 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className }) => (
    <h2 className={`text-xl font-semibold flex items-center gap-2 text-gray-800 ${className}`}>
      {children}
    </h2>
  );

  const CardContent = ({ children, className }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );

  const Button = ({ children, className, href }) => (
    <a 
      href={href} 
      className={`inline-flex items-center text-sm font-medium py-2.5 px-4 rounded-full transition-all duration-300 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );

  const SkillTag = ({ skill }) => (
    <span className="px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-full shadow-sm hover:shadow hover:bg-gray-100 transition-all duration-300">
      {skill}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-10"
      >
        {/* Profile header - Hero section */}
        <motion.div 
          variants={itemVariants}
          className="relative rounded-3xl bg-white shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
          
          <div className="relative z-10 px-8 py-16 md:px-12 flex flex-col md:flex-row items-center md:items-start gap-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Avatar>
                <AvatarFallback>{user.name.split(' ').map(name => name[0]).join('')}</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="text-center md:text-left md:flex-1 space-y-6">
              <div>
                <motion.h1 
                  variants={itemVariants}
                  className="text-5xl font-bold tracking-tight mb-2 text-gray-900"
                >
                  {user.name}
                </motion.h1>
                <motion.div variants={itemVariants}>
                  <Badge className="text-blue-700 bg-blue-50 border border-blue-100">
                    {user.role}
                  </Badge>
                </motion.div>
              </div>

              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-700 max-w-2xl leading-relaxed"
              >
                {profile.bio}
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center md:justify-start gap-3 pt-2"
              >
                {profile.socialLinks.linkedin && (
                  <Button 
                    href={profile.socialLinks.linkedin} 
                    className="gap-2 bg-white hover:bg-blue-50 text-blue-600 shadow-sm hover:shadow border border-blue-100"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Button>
                )}
                {profile.socialLinks.twitter && (
                  <Button 
                    href={profile.socialLinks.twitter} 
                    className="gap-2 bg-white hover:bg-blue-50 text-blue-400 shadow-sm hover:shadow border border-blue-100"
                  >
                    <Twitter className="h-4 w-4" /> Twitter
                  </Button>
                )}
                {profile.socialLinks.website && (
                  <Button 
                    href={profile.socialLinks.website} 
                    className="gap-2 bg-white hover:bg-blue-50 text-blue-600 shadow-sm hover:shadow border border-blue-100"
                  >
                    <Globe className="h-4 w-4" /> Website
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column for smaller cards */}
          <div className="space-y-8">
            {/* Skills card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SkillTag skill={skill} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>
                  <GraduationCap className="h-5 w-5 text-blue-600" /> Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile.education.map((edu, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-4 last:mb-0"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-gray-600">{edu.institution}</p>
                      <Badge className="bg-blue-50 text-blue-700 border border-blue-100">{edu.year}</Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>
                  <Award className="h-5 w-5 text-blue-600" /> Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {profile.achievements.map((ach, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-sm text-blue-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 pt-1">{ach}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right column for larger sections */}
          <div className="md:col-span-2 space-y-8">
            {/* Experience card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>
                  <Briefcase className="h-5 w-5 text-blue-600" /> Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile.experience.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-8 last:mb-0"
                  >
                    <div className="flex flex-col sm:flex-row justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{exp.title} at {exp.company}</h3>
                      <div className="mt-2 sm:mt-0 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium border border-blue-100 shadow-sm">
                        {formatDate(exp.from)} - {formatDate(exp.to)}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* About me card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a 
                      href={`mailto:${user.email}`} 
                      className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
