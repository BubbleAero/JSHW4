let page;

describe("Github page tests", () => {
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("https://github.com/team");
    }, 70000);

    afterEach(async () => {
        await page.close();
    });

    test("The h1 header content", async () => {
        await page.waitForSelector('h1', { timeout: 60000 });
        const title2 = await page.title();
        expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
    }, 60000);

    test("The first link attribute", async () => {
        const actual = await page.$eval("a[href='#start-of-content']", (link) => link.getAttribute("href"));
        expect(actual).toEqual("#start-of-content");
    }, 60000);

    test("The page contains Sign in button", async () => {
        const btnSelector = ".btn-large-mktg.btn-mktg";
        await page.waitForSelector(btnSelector, {
            visible: true,
        });
        const actual = await page.$eval(
            btnSelector,
            (link) => link.textContent
        );
        expect(actual).toContain("Get started with Team");
    }, 60000);

});

describe("Github start page tests", () => {
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('https://github.com/');
    }, 70000);

    afterEach(async () => {
        await page.close();
    });

    test("The title is 'GitHub:...'", async () => {
        await page.waitForSelector('h1', { timeout: 60000 });
        const title2 = await page.title();
        expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
    }, 90000);

    test("The link text 'Pricing'", async () => {
        await page.click("a[href='/pricing']");
        await page.waitForSelector('h1');
        const actual = await page.title();
        expect(actual).toContain("Pricing · Plans for every developer · GitHub");
    }, 90000);

    test("Button Try GitHub Copilot", async () => {
        const button = await page.$("a[href='/features/copilot']");
        if (button) {
            await button.click();
            await page.waitForSelector("h1", { timeout: 60000 });
            const actual = await page.title();
            expect(actual).toContain("GitHub Copilot · Your AI pair programmer · GitHub");
        }
    }, 90000);
});
