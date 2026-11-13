import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface Project {
    number: string;
    key: 'join' | 'elPolloLoco';
    title: string;
    technologies: { name: string; icon: string }[];
    liveUrl: string;
    githubUrl: string;
    imageUrl: string;
}

@Component({
    selector: 'app-featured-projects',
    imports: [],
    templateUrl: './featured-projects.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './featured-projects.scss',
})
export class FeaturedProjects {
    protected i18n = inject(TranslationService);

    projects: Project[] = [
        {
            number: '01',
            key: 'join',
            title: 'Join',
            technologies: [
                { name: 'Angular', icon: '/assets/images/skills/frontend/Angular.svg' },
                { name: 'TypeScript', icon: '/assets/images/skills/frontend/typescript.svg' },
                { name: 'HTML', icon: '/assets/images/skills/frontend/html.svg' },
                { name: 'CSS', icon: '/assets/images/skills/frontend/css.svg' },
                { name: 'Firebase', icon: '/assets/images/skills/frontend/firebase.svg' },
            ],
            liveUrl: 'https://join.software-ellrich.de',
            githubUrl: 'https://github.com/Dataletra/Join',
            imageUrl: '/assets/images/JoinHQ.png',
        },
        {
            number: '02',
            key: 'elPolloLoco',
            title: 'El Pollo Loco',
            technologies: [
                { name: 'HTML', icon: '/assets/images/skills/frontend/html.svg' },
                { name: 'CSS', icon: '/assets/images/skills/frontend/css.svg' },
                { name: 'JavaScript', icon: '/assets/images/skills/frontend/javaScript.svg' },
            ],
            liveUrl: 'https://loco.software-ellrich.de',
            githubUrl: 'https://github.com/Dataletra/El-Pollo-Loco',
            imageUrl: '/assets/images/PoloHQ.png',
        },
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
