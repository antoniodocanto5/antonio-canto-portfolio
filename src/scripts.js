import { projects } from './data/projects-data.js';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

console.log('Script carregado')

// gsap.registerPlugin(ScrollTrigger);

console.log("aqui2")

// document.addEventListener('DOMContentLoaded', () => {
//      console.log("aqui")
//   // Renderiza projetos
//   const container = document.getElementById('projects-container');

//   projects.forEach(project => {
//     const div = document.createElement('div');
//     div.className = 'relative bg-white/5 backdrop-blur-md rounded-lg border border-cyan-400/20 hover:border-cyan-400 shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-cyan-500/40';
//     div.innerHTML = `
//       <h3 class="text-xl font-orbitron font-semibold mb-2 text-white">${project.title}</h3>
//       <p class="text-gray-300 mb-4">${project.description}</p>
//       <a href="${project.link}" class="text-cyan-300 hover:underline">Ver Projeto</a>
//     `;
//     container.appendChild(div);
//   });

//   // Smooth scroll para âncoras
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//       e.preventDefault();
//       document.querySelector(this.getAttribute('href')).scrollIntoView({
//         behavior: 'smooth'
//       });
//     });
//   });




//   // Animações GSAP
//   gsap.from('#home h1, #home p, #home a', {
//     opacity: 0,
//     y: 50,
//     duration: 1.5,
//     stagger: 0.3,
//     ease: 'power3.out'
//   });

//   gsap.from('#about img, #about p', {
//     opacity: 0,
//     x: (index) => (index % 2 === 0 ? -100 : 100),
//     duration: 1.2,
//     stagger: 0.3,
//     scrollTrigger: {
//       trigger: '#about',
//       start: 'top 80%'
//     }
//   });

//   gsap.from('#projects .grid > div', {
//     opacity: 0,
//     y: 30,
//     duration: 1,
//     stagger: 0.2,
//     scrollTrigger: {
//       trigger: '#projects',
//       start: 'top 80%'
//     }
//   });

//   gsap.from('#contact a', {
//     opacity: 0,
//     scale: 0.5,
//     duration: 0.8,
//     stagger: 0.2,
//     scrollTrigger: {
//       trigger: '#contact',
//       start: 'top 80%'
//     }
//   });



// });



// Function to populate projects-container
function populateProjects() {
  const container = document.getElementById('projects-container');
  container.innerHTML = ''; // Clear existing content

  // Group projects by category
  const categories = [...new Set(projects.map(p => p.category))];
  categories.forEach(category => {
    // Create subsection
    const subsection = document.createElement('div');
    subsection.className = 'mb-12';

    // Add category header
    const header = document.createElement('h3');
    header.className = 'text-2xl font-orbitron font-semibold text-cyan-300 mb-6';
    header.textContent = category;
    subsection.appendChild(header);

    // Create grid for projects
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';

    // Add projects to grid
    projects.filter(p => p.category === category).forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card bg-gray-800 p-6 rounded-xl border border-cyan-400';
      projectCard.innerHTML = `
        <h4 class="text-xl font-semibold text-white">${project.title}</h4>
        <p class="text-gray-300">${project.description}</p>
        
        <!-- Seção de Tecnologias -->
  <div class="flex flex-wrap gap-2 my-3">
    ${project.technologies.map(tech => 
      `<span class="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">${tech}</span>`
    ).join('')}
  </div>

   <!-- Seção de Arquitetura -->
  <div class="flex flex-wrap gap-2 my-3">
    ${project.architecture.map(arch => 
      `<span class="text-xs bg-pink-900/20 text-pink-100 px-2 py-1 rounded-full border border-pink-800/30">${arch}</span>`
    ).join('')}
  </div>

  <!-- Barra de progresso -->
    ${project.status !== undefined ? `
      <div class="mt-4">
        <div class="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progresso</span>
          <span>${project.status}%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            class="h-2.5 rounded-full ${getStatusColor(project.status)}" 
            style="width: ${project.status}%"
          ></div>
        </div>
      </div>
    ` : `
      <p class="mt-4 text-sm text-gray-400 italic">Big Side Project</p>
    `}

        <a 
  href="${project.link}" 
  target="_blank" 
  rel="noopener noreferrer" 
  class="text-cyan-400 hover:text-cyan-200"
>
  Ver Projeto
</a>
      `;
      grid.appendChild(projectCard);
    });

    subsection.appendChild(grid);
    container.appendChild(subsection);
  });
}

function getStatusColor(status) {
  if (status >= 70) return 'bg-green-500';
  if (status >= 40) return 'bg-yellow-500';
  return 'bg-amber-200';
}

document.querySelector('.dual-link').addEventListener('click', (e) => {
  e.preventDefault();
  window.open('https://github.com/antoniodocanto5', '_blank', 'noopener,noreferrer');
  window.open('https://github.com/antoniodcanto', '_blank', 'noopener,noreferrer');
});


// Populate projects on page load
populateProjects();

// Expand/collapse functionality
const expandBtn = document.getElementById('expand-btn');
const projectsContainer = document.getElementById('projects-container');
let isExpanded = false;

expandBtn.addEventListener('click', () => {
  isExpanded = !isExpanded;
  projectsContainer.classList.toggle('projects-hidden', !isExpanded);
  projectsContainer.classList.toggle('projects-expanded', isExpanded);
  expandBtn.querySelector('i').classList.toggle('fa-expand-arrows-alt', !isExpanded);
  expandBtn.querySelector('i').classList.toggle('fa-compress-arrows-alt', isExpanded);
});


