import { Page, expect } from '@playwright/test';
import GncElements from '../elements/GncElements';
import BasePage from './BasePage';

export default class GncPage extends BasePage {
  readonly gncElements: GncElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.gncElements = new GncElements(page);
  }

  async acessarHome(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.fecharAvisoDeCookies();
  }

  async fecharAvisoDeCookies(): Promise<void> {
    const botao = this.gncElements.getCookieButton();
    if (await botao.isVisible({ timeout: 5000 }).catch(() => false)) {
      await botao.click();
    }
  }

  async validarMenuPrincipal(): Promise<void> {
    await expect(this.gncElements.getLogo()).toBeVisible();
    for (const path of ['/pre-venda', '/em-breve', '/movie-club']) {
      await expect(this.gncElements.getMenuLink(path)).toBeVisible();
    }
  }

  async validarSecoesDaHome(): Promise<void> {
    await expect(this.gncElements.getHeading('Em cartaz')).toBeVisible();
    await expect(this.gncElements.getHeading('Em breve')).toBeVisible();
  }

  async abrirEmBreve(): Promise<void> {
    await this.gncElements.getMenuLink('/em-breve').click();
  }

  async validarListaEmBreve(): Promise<void> {
    await expect(this.page).toHaveURL(/\/em-breve/);
    await expect(this.gncElements.getTextOnPage(/Estreia/i)).toBeVisible();
  }

  async abrirMovieClub(): Promise<void> {
    await this.gncElements.getMenuLink('/movie-club').click();
  }

  async validarMovieClub(): Promise<void> {
    await expect(this.page).toHaveURL(/\/movie-club/);
    await expect(this.gncElements.getTextOnPage(/Movie Club/i)).toBeVisible();
  }
}
