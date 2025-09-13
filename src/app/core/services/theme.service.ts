import { Injectable, PLATFORM_ID, Renderer2, RendererFactory2, signal, inject, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

const THEME_KEY = 'theme';
type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  private _isDarkMode = signal<boolean>(false);

  constructor() {
    this.loadInitialTheme();
    this.listenForOsThemeChanges();
  }

  public toggleTheme(): void {
    this._isDarkMode.update(isDark => !isDark);
  }

  public atualThemeIsDarkMode(): boolean {
    return this._isDarkMode();
  }

  private loadInitialTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

      const initialDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
      this._isDarkMode.set(initialDarkMode);
    }
  }

  private _ = effect(() => {
    const isDark = this._isDarkMode();
    const theme: Theme = isDark ? 'dark' : 'light';

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(THEME_KEY, theme);
    }

    if (isDark) {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
    }
  });

  private listenForOsThemeChanges(): void {
    if (isPlatformBrowser(this.platformId)) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      mediaQuery.addEventListener('change', (e) => {
        if (localStorage.getItem(THEME_KEY) === null) {
          this._isDarkMode.set(e.matches);
        }
      });
    }
  }
}
