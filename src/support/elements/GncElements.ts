import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class GncElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCookieButton(): Locator {
    return this.page.getByText('continuar e fechar', { exact: true });
  }

  getLogo(): Locator {
    return this.page.locator('a[href$="/home"]:visible').first();
  }

  getMenuLink(path: string): Locator {
    return this.page.locator(`a[href$="${path}"]:visible`).first();
  }

  getMenuLabel(label: string): Locator {
    return this.page.getByText(label, { exact: true }).first();
  }

  getMovieLinks(): Locator {
    return this.page.locator(
      'main a[href*="gnccinemas.com.br/"]:has(:text-matches("Estreia", "i"))'
    );
  }

  getHeading(text: string | RegExp): Locator {
    return this.page.getByRole('heading', { name: text }).first();
  }

  getTextOnPage(text: string | RegExp): Locator {
    return this.page.getByText(text).first();
  }
}
