export const skillDescriptions: Record<string, string> = {
  // Frontend
  React: 'A JavaScript library for building user interfaces with component-based architecture',
  'Next.js': 'React framework with server-side rendering, routing, and optimizations',
  TypeScript: 'Typed superset of JavaScript that compiles to plain JavaScript',
  JavaScript: 'High-level programming language for web development',
  'Tailwind CSS': 'Utility-first CSS framework for rapid UI development',
  HTML: 'Standard markup language for creating web pages',
  CSS: 'Style sheet language for describing presentation of web pages',

  // Backend
  'Node.js': "JavaScript runtime built on Chrome's V8 engine for server-side development",
  Express: 'Fast, unopinionated web framework for Node.js',
  PHP: 'Server-side scripting language designed for web development',
  Laravel: 'PHP framework for web artisans with elegant syntax',
  MySQL: 'Open-source relational database management system',
  PostgreSQL: 'Advanced open-source relational database with SQL support',
  MongoDB: 'NoSQL document database for modern applications',

  // Tools & Others
  Git: 'Distributed version control system for tracking changes in code',
  GitHub: 'Web-based platform for version control and collaboration',
  Docker: 'Platform for developing, shipping, and running applications in containers',
  'VS Code': 'Lightweight but powerful source code editor',
  Figma: 'Collaborative interface design tool',
  Postman: 'API development and testing platform',
  Linux: 'Open-source Unix-like operating system',
};

export function getSkillDescription(skillName: string): string {
  return skillDescriptions[skillName] || `Learn more about ${skillName}`;
}
