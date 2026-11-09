import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import RennerPage from '../support/pages/RennerPage';

test.describe('Lojas Renner E2E', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.renner')
    .retrieveData();
  const TERMO = 'camiseta';
  let rennerPage: RennerPage;

  test.beforeEach(async ({ page }) => {
    rennerPage = new RennerPage(page);
    await rennerPage.acessarHome(BASE_URL);
  });

  test('CT01 - deve carregar a home com logo e campo de busca', async () => {
    await rennerPage.verifyTitle(/Renner/i);
    await rennerPage.validarHome();
  });

  test('CT02 - deve buscar um produto e listar resultados', async () => {
    await rennerPage.buscarProduto(TERMO);
    await rennerPage.validarResultadoDaBusca(TERMO);
  });

  test('CT03 - deve abrir a página de um produto a partir da busca', async () => {
    await rennerPage.buscarProduto(TERMO);
    await rennerPage.validarResultadoDaBusca(TERMO);
    await rennerPage.abrirPrimeiroProduto();
    await rennerPage.validarPaginaDoProduto();
  });
});
