require("chromedriver"); 
var assert = require('assert');

const {Builder, By, Key} = require('selenium-webdriver');

describe('ToDo app', async function () {
    it('ToDo hinzufügen', async function () {
        let driver = new Builder().forBrowser('chrome').build();

        await driver.get('http://localhost:3000/');

        await driver.findElement(By.id("todo-input")).sendKeys("Automatisiertes Todo")
        await driver.findElement(By.id("add-todo")).click()
        let ul = await driver.findElement(By.className("theList"));
        let listItems = await ul.findElements(By.css("li"))

        assert.equal(listItems.length, 1)

        await driver.quit()
    });

    it('2 ToDos hinzufügen', async function () {
        // Einrichten
        let driver = new Builder().forBrowser('chrome').build();

        await driver.get('http://localhost:3000/');
        /////////////////////////////////////////////////////////////

        // Testen
        await driver.findElement(By.id("todo-input")).sendKeys("Automatisiertes Todo")
        await driver.findElement(By.id("add-todo")).click()

        await driver.findElement(By.id("todo-input")).sendKeys("Automatisiertes Todo 2")
        await driver.findElement(By.id("add-todo")).click()

        let ul = await driver.findElement(By.className("theList"));
        let listItems = await ul.findElements(By.css("li"))
        ////////////////////////////////////////////////////////////////

        // Überprüfen / Assert
        assert.equal(listItems.length, 2)

        // Clean-up / Aufräumen
        await driver.quit()
    });
});