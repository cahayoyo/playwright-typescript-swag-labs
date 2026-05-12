import test, {Page, expect} from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
}