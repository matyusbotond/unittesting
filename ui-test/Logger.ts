// tslint:disable:no-console
class Logger {
  public error(message?: any, ...optionalParams: any[]): void {
    console.error(`ERROR: ${message}`, this.printIfNotEmpty(optionalParams));
  }
  public info(message?: any, ...optionalParams: any[]): void {
    console.info(message, this.printIfNotEmpty(optionalParams));
  }
  public log(message?: any, ...optionalParams: any[]): void {
    console.log(message, this.printIfNotEmpty(optionalParams));
  }
  public warn(message?: any, ...optionalParams: any[]): void {
    console.warn(message, this.printIfNotEmpty(optionalParams));
  }
  public trace(message?: any, ...optionalParams: any[]): void {
    console.trace(message, this.printIfNotEmpty(optionalParams));
  }
  public debug(message?: any, ...optionalParams: any[]): void {
    console.debug(message, this.printIfNotEmpty(optionalParams));
  }

  private printIfNotEmpty(params: any[]): any {
    if (params.length < 1) {
      return '';
    }
    return params;
  }
}

export const logger: Logger = new Logger();
