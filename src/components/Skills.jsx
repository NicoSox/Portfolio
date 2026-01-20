import React from 'react';
import './Skills.css';

const skillIcons = {
  'Java': 'devicon-java-plain colored',
  'Html5': 'devicon-html5-plain colored',
  'Css3': 'devicon-css3-plain colored',
  'JavaScript': 'devicon-javascript-plain colored',
  'Python': 'devicon-python-plain colored',
  'React': 'devicon-react-original colored',
  'Node.js': 'devicon-nodejs-plain colored',
  'MySQL': 'devicon-mysql-plain colored',
  'SQL Server': 'fas fa-database',
  'VS Code': 'devicon-vscode-plain colored',
  'Workbench': 'devicon-mysql-plain colored',
  'NetBeans': 'devicon-netbeans-plain colored'
};

const Skills = ({ data, labels }) => {
  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <div className="section-header">
          <h2 className="section-title">{labels.title}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            {labels.subtitle}
          </p>
        </div>
        <div className="skills-grid">
          {data.lenguajes.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-icon">
                <i className={skillIcons[skill] || 'fas fa-code'}></i>
              </div>
              <h3 className="skill-name">{skill}</h3>
              <div className="skill-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
