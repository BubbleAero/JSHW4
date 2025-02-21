let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
    test("The h1 header content", async () => {
        const firstLink = await page.$("header div div a");
        await firstLink.click();
        await page.waitForSelector('h1', { timeout: 60000 });
        const title2 = await page.title();
        expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
    }, 60000);



    test("The first link attribute", async () => {
        const actual = await page.$eval("a", (link) =>
            link.getAttribute("href")
        );
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
        await page.goto("https://github.com/");
    }, 70000);
    test("The title is 'GitHab:...'", async () => {
        const actual = await page.title();
        expect(actual).toEqual("GitHub · Build and ship software on a single, collaborative platform · GitHub");
    }, 60000);

    test("The link text 'Pricing'", async () => {
        await page.click("a[href='/pricing']");
        await page.waitForSelector('h1');
        const actual = await page.title();
        expect(actual).toContain("Pricing · Plans for every developer · GitHub");
    }, 60000);


    test("Button GitHub Copilot", async () => {
        const [button] = await page.$x("//span[contains(text(), 'Try GitHub Copilot')]");
        await button.click();
        await page.waitForSelector("h1", { timeout: 60000 });
        const actual = await page.title();
        expect(actual).toContain("GitHub Copilot · Your AI pair programmer · GitHub");
    }, 60000);
});