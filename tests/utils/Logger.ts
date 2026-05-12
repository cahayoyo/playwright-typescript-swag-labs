export class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString().replace('T', ' ').slice(0, 19);
  }

  static info(message: string, data?: any) {
    console.log(`[INFO] ${this.getTimestamp()} - ${message}`);
    if (data) console.log(data);
  }

  static success(message: string) {
    console.log(`[SUCCESS] ${this.getTimestamp()} - ${message}`);
  }

  static error(message: string, error?: any) {
    console.error(`[ERROR] ${this.getTimestamp()} - ${message}`);
    if (error) console.error(error);
  }

  static step(message: string) {
    console.log(`[STEP] ${this.getTimestamp()} - ${message}`);
  }
}