const {Builder,By,Key,util, promise} = require("selenium-webdriver");


async function search(){
    let driver = await new Builder().forBrowser("MicrosoftEdge").build();
    await driver.get("https://www.google.com");
    await driver.findElement(By.name("q")).sendKeys("What are online cookies?");
    await sleep(10);
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER);
}

async function sleep(seconds) {
    return new Promise(resolve=>(setTimeout(resolve,1000*seconds)));
}
search();