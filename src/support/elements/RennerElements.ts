import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class RennerElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCookieButton(): Locator {
    return this.page.getByText(/Li, aceito os Termos de Uso/i).first();
  }

  getLogo(): Locator {
    return this.page.getByRole('link', { name: /Logo das lojas Renner/i });
  }

  getSearchField(): Locator {
    return this.page.getByRole('textbox', { name: /Buscar produtos/i });
  }

  getProductLinks(): Locator {
    return this.page.locator('a[href*="/p/"]');
  }

  getPrice(): Locator {
    return this.page.getByText(/R\$\s?\d/).first();
  }

  getProductTitle(): Locator {
    return this.page.getByRole('heading', { level: 1 }).first();
  }
}
