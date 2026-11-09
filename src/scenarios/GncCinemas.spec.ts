import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import GncPage from '../support/pages/GncPage';

test.describe('GNC Cinemas E2E', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.gnc')
    .retrieveData();
  let gncPage: GncPage;

  test.beforeEach(async ({ page }) => {
    gncPage = new GncPage(page);
    await gncPage.acessarHome(BASE_URL);
  });

  test('CT01 - deve carregar a home com menu e seções principais', async () => {
    await gncPage.verifyTitle(/GNC Cinemas/);
    await gncPage.validarMenuPrincipal();
    await gncPage.validarSecoesDaHome();
  });

  test('CT02 - deve navegar para Em breve e listar estreias', async () => {
    await gncPage.abrirEmBreve();
    await gncPage.validarListaEmBreve();
  });

  test('CT03 - deve navegar para o Movie Club pelo menu', async () => {
    await gncPage.abrirMovieClub();
    await gncPage.validarMovieClub();
  });
});
