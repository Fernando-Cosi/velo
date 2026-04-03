import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

test('Deve consultar um pedido existente', async ({ page }) => {
    // Arrange - prepara o teste
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
    
    // Act - executa o teste
    await page.getByTestId('search-order-id').fill('VLO-I5FFLE');
    await page.getByTestId('search-order-button').click();

    // Assert - verifica o resultado
    await expect(page.getByTestId('order-result-id')).toBeVisible();
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-I5FFLE');
    await expect(page.getByTestId('order-result-status')).toBeVisible();
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});