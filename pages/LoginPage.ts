import { BasePage } from './BasePage';
import { Page } from 'playwright';

export class LoginPage extends BasePage {
  constructor(page: Page){
    super(page);
  }
  
  private username = this.page.locator('[data-test="username"]');
  private password = this.page.locator('[data-test="password"]');
  private loginButton = this.page.getByRole('button', { name: 'Login' });


  async loginAsync(userType : string) {
    debugger;
    const password : string = process.env.PASSWORD || "";

    const credentials: Record<string, { username: string}> = {
      standard: { username: process.env.STANDARD_USER || '' },
      lockedout: { username: process.env.LOCKEDOUT_USER || '' },
      problem: { username: process.env.PROBLEM_USER || ''},
      performance: { username: process.env.PERFORMANCE_GLITCH_USER || ''},
      error: { username: process.env.ERROR_USER || ''},
      visual: { username: process.env.VISUAL_USER || ''},
    };
    
    const userName = credentials[userType];
    if(!userName) throw new Error(`No username for ${userType} type`)
    
    await this.username.fill(userName.username);
    await this.password.fill(password);
    await this.loginButton.click({timeout : 10000});
  }
}