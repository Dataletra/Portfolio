import { HttpClient } from '@angular/common/http';
import { effect, inject, Service, signal } from '@angular/core';

export type Language = 'en' | 'de';

type Translations = { [key: string]: string | Translations };

const SUPPORTED_LANGUAGES: Language[] = ['en', 'de'];
const DEFAULT_LANGUAGE: Language = 'en';
const STORAGE_KEY = 'portfolio-language';

@Service()
export class TranslationService {
    private http = inject(HttpClient);
    private cache = new Map<Language, Translations>();
    readonly lang = signal<Language>(this.getInitialLanguage());
    private dictionary = signal<Translations>({});

    constructor() {
        this.load(this.lang());

        effect(() => {
            document.documentElement.lang = this.lang();
        });
    }

    setLanguage(lang: Language): void {
        if (!SUPPORTED_LANGUAGES.includes(lang)) return;
        this.lang.set(lang);
        this.saveLanguage(lang);
        this.load(lang);
    }

    toggle(): void {
        this.setLanguage(this.lang() === 'en' ? 'de' : 'en');
    }

    tRaw<T>(key: string): T | undefined {
        return key.split('.').reduce<any>((node, part) => node?.[part], this.dictionary());
    }

    t(key: string, params?: Record<string, string | number>): string {
        const value = key
            .split('.')
            .reduce<string | Translations | undefined>(
                (node, part) => (node && typeof node === 'object' ? node[part] : undefined),
                this.dictionary()
            );

        if (typeof value !== 'string') {
            if (Object.keys(this.dictionary()).length > 0) {
                console.warn(`[i18n] Missing translation: "${key}" (${this.lang()})`);
            }
            return Object.keys(this.dictionary()).length > 0 ? key : '';
        }

        if (!params) return value;
        return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name) => (name in params ? String(params[name]) : match));
    }

    private load(lang: Language): void {
        const cached = this.cache.get(lang);
        if (cached) {
            this.dictionary.set(cached);
            return;
        }

        this.http.get<Translations>(`assets/i18n/${lang}.json`).subscribe({
            next: (translations) => {
                this.cache.set(lang, translations);
                if (this.lang() === lang) {
                    this.dictionary.set(translations);
                }
            },
            error: (err) => console.error(`[i18n] Could not load "${lang}.json"`, err),
        });
    }

    private getInitialLanguage(): Language {
        try {
            const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
            if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;
        } catch {
            // fall through
        }

        const browserLang = (typeof navigator !== 'undefined' ? navigator.language : '').slice(0, 2);
        return SUPPORTED_LANGUAGES.includes(browserLang as Language) ? (browserLang as Language) : DEFAULT_LANGUAGE;
    }

    private saveLanguage(lang: Language): void {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            // ignore
        }
    }
}
