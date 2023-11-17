require("chromedriver");
const assert = require('assert');
const { Builder, By } = require('selenium-webdriver');

describe('ToDo app', async function () {
    it('ToDo hinzufügen', async function () {
        let driver = await new Builder().forBrowser('chrome').build();

        await driver.get('http://localhost:3000/');

        await driver.findElement(By.className("radios")).sendKeys("Automatisiertes Todo");
        await driver.findElement(By.className("radios")).click();

        let ul = await driver.findElement(By.className("theList"));
        let listItems = await ul.findElements(By.css("li"));

        assert.equal(listItems.length, 1);

        await driver.quit();
    });

    it('2 ToDos hinzufügen', async function () {
        let driver = await new Builder().forBrowser('chrome').build();

        await driver.get('http://localhost:3000/');

        await driver.findElement(By.id("root")).sendKeys("Automatisiertes Todo");
        await driver.findElement(By.id("root")).click();

        await driver.findElement(By.id("root")).sendKeys("Automatisiertes Todo 2");
        await driver.findElement(By.id("root")).click();

        let ul = await driver.findElement(By.className("theList"));
        let listItems = await ul.findElements(By.css("li"));

        assert.equal(listItems.length, 2);

        await driver.quit();
    });
});
