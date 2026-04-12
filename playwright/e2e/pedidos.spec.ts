import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

/// AAA - Arrange, Act, Assert

describe('Consultar Pedido', () => {

    test('Deve consultar um pedido existente', async ({ page }) => {

        // Test Data
        const orderNumber = 'VLO-I5FFLE';

        // Arrange - prepara o teste
        await page.goto('http://localhost:5173/');
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

        // Act - executa o teste
        await page.getByTestId('search-order-id').fill(orderNumber);
        await page.getByTestId('search-order-button').click();

        // Assert - verifica o resultado
        await expect(page.getByTestId(`order-result-${orderNumber}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${orderNumber}
            - img
            - text: APROVADO
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: Glacier Blue
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: aero Wheels
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: Fernando Barros
            - paragraph: Email
            - paragraph: fmarcioc.barros@gmail.com
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `);
    });
});