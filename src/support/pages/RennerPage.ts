import { Page, expect } from '@playwright/test';
import RennerElements from '../elements/RennerElements';
import BasePage from './BasePage';

export default class RennerPage extends BasePage {
  readonly rennerElements: RennerElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.rennerElements = new RennerElements(page);
  }

  async acessarHome(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.fecharAvisoDeCookies();
  }

  async fecharAvisoDeCookies(): Promise<void> {
    const botao = this.rennerElements.getCookieButton();
    if (await botao.isVisible({ timeout: 5000 }).catch(() => false)) {
      await botao.click();
    }
  }

  async validarHome(): Promise<void> {
    await expect(this.rennerElements.getLogo()).toBeVisible();
    await expect(this.rennerElements.getSearchField()).toBeVisible();
  }

  async buscarProduto(termo: string): Promise<void> {
    const campo = this.rennerElements.getSearchField();
    await campo.fill(termo);
    await campo.press('Enter');
  }

  async validarResultadoDaBusca(termo: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(termo, 'i'));
    await expect(this.rennerElements.getProductLinks().first()).toBeVisible();
  }

  async abrirPrimeiroProduto(): Promise<void> {
    await this.rennerElements.getProductLinks().first().click();
  }

  async validarPaginaDoProduto(): Promise<void> {
    await expect(this.page).toHaveURL(/\/p\//);
    await expect(this.rennerElements.getProductTitle()).toBeVisible();
    await expect(this.rennerElements.getPrice()).toBeVisible();
  }
}
