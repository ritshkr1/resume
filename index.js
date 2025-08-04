window.onload = function () {
  fetch("resume-data.json")
    .then((res) => res.json())
    .then((data) => renderResume(data))
    .catch((err) => console.error("Failed to load resume.json:", err));
};

function renderResume(resumeData) {
  const { personal, summary, skills, education, experience, projects } = resumeData;

  document.getElementById("header").innerHTML = `
    <h1>${personal.name}</h1>
    <h2>${personal.title}</h2>
    <div class="contact">
      ${personal.contacts.phone} | 📧 <a href="mailto:${personal.contacts.email}">${personal.contacts.email}</a> |
      <a href="${personal.contacts.linkedin}">LinkedIn</a> | 
      <a href="${personal.contacts.github}">GitHub</a>
      <div>${education[0].degree},${education[0].university} -${education[0].year}  | ${education[0].location}</div>
    </div>
  `;

  document.getElementById("summary").innerHTML = `
    <h2>SUMMARY</h2>
    <hr>
    <ul>${summary.map(item => `<li>${item}</li>`).join("")}</ul>
    
  `;

  document.getElementById("skills").innerHTML = `
    <h2>SKILLS</h2>
    <hr>
    <ul>
      <li><strong>Languages:</strong> ${skills.languages.join(", ")}</li>
      <li><strong>Frameworks & UI:</strong> ${skills.frameworks.join(", ")}</li>
      <li><strong>Tools:</strong> ${skills.tools.join(", ")}</li>
      <li><strong>Workflow:</strong> ${skills.workflow.join(", ")}</li>
    </ul>
  `;

  const expHTML = experience.map(company => {
    const rolesHTML = company.roles.map(role => `
      <div class="experience-block">
        <h4>${role.title} — ${role.from} to ${role.to}</h4>
        <ul>${role.details.map(d => `<li>${d}</li>`).join("")}</ul>
      </div>
    `).join("");
    return `
      <div>
        <h3>${company.company} | ${company.location}</h3>
        ${rolesHTML}
      </div>
    `;
  }).join("");
  document.getElementById("experience").innerHTML = `<h2>EXPERIENCE</h2><hr>${expHTML}`;

  const projHTML = projects.map(p => `
    <div class="project-block">
      <h4>${p.name}</h4>
      <p><strong>Tech:</strong> ${p.tech.join(", ")}</p>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">🔗 View Project</a>
    </div>
  `).join("");
  document.getElementById("projects").innerHTML = `
    <h2>PROJECTS</h2>
    <hr>
    <div class="project-grid">${projHTML}</div>
  `;
}
