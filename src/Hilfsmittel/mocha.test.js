require("chromedriver");
const assert = require('assert');
const { Builder, By } = require('selenium-webdriver');

describe('Notizbuch app', async function () {
    it('Notiz hinzufügen', async function () {
        let driver = await new Builder().forBrowser('chrome').build();

        await driver.get('http://localhost:3000/');

        await driver.findElement(By.id("title-input")).sendKeys("Automatisierte Notiz");
        await driver.findElement(By.id("Notiz-erstellen")).click();

        let ul = await driver.findElement(By.className("create-button"));
        let listItems = await ul.findElements(By.css("li")); // Änderung hier: Verwende By.css statt By.src

        assert.equal(listItems.length, 1);

        await driver.quit();
    });

    it('2 Notiz hinzufügen', async function () {
        let driver = await new Builder().forBrowser('chrome').build();

        await driver.get('http://localhost:3000/');

        await driver.findElement(By.id("title-input")).sendKeys("Automatisierte Notiz");
        await driver.findElement(By.id("Notiz-erstellen")).click();

        await driver.findElement(By.id("title-input")).clear(); // Korrekte Eingabe löschen

        await driver.findElement(By.id("title-input")).sendKeys("Automatisierte Notiz 2");
        await driver.findElement(By.id("Notiz-erstellen")).click();

        let ul = await driver.findElement(By.className("create-button"));
        let listItems = await ul.findElements(By.css("li"));

        assert.equal(listItems.length, 2);

        await driver.quit();
    });
});
