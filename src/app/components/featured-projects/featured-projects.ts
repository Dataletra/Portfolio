import { Component } from '@angular/core';

interface Project {
  number: string;
  title: string;
  description: string;
  technologies: { name: string; icon: string }[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
}

@Component({
  selector: 'app-featured-projects',
  imports: [],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.scss',
})
export class FeaturedProjects {
  projects: Project[] = [
    {
      number: '01',
      title: 'Join',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag-and-drop functions, assign users and categories.',
      technologies: [
        { name: 'Angular', icon: '/assets/images/skills/frontend/Angular.svg' },
        { name: 'TypeScript', icon: '/assets/images/skills/frontend/typescript.svg' },
        { name: 'HTML', icon: '/assets/images/skills/frontend/html.svg' },
        { name: 'CSS', icon: '/assets/images/skills/frontend/css.svg' },
        { name: 'Firebase', icon: '/assets/images/skills/frontend/firebase.svg' }
      ],
      liveUrl: 'https://example.com/join',
      githubUrl: 'https://github.com/example/join',
      imageUrl: '/assets/images/JoinHQ.png'
    },
    {
      number: '02',
      title: 'El Pollo Loco',
      description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and salsa bottles to fight against the giant chicken.',
      technologies: [
        { name: 'HTML', icon: '/assets/images/skills/frontend/html.svg' },
        { name: 'CSS', icon: '/assets/images/skills/frontend/css.svg' },
        { name: 'JavaScript', icon: '/assets/images/skills/frontend/javaScript.svg' }
      ],
      liveUrl: 'https://example.com/el-pollo-loco',
      githubUrl: 'https://github.com/example/el-pollo-loco',
      imageUrl: '/assets/images/PoloHQ.png'
    }
  ];

  selectedProjectIndex: number | null = null;

  get currentProject(): Project | null {
    return this.selectedProjectIndex !== null ? this.projects[this.selectedProjectIndex] : null;
  }

  openProjectModal(index: number): void {
    this.selectedProjectIndex = index;
  }

  closeModal(): void {
    this.selectedProjectIndex = null;
  }

  nextProject(): void {
    if (this.selectedProjectIndex !== null) {
      this.selectedProjectIndex = (this.selectedProjectIndex + 1) % this.projects.length;
    }
  }
}