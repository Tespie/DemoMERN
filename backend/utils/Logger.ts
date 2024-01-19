class Logger {
    private static instance: Logger;
    private showLogs: boolean = true;

    private constructor() { }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(title: string, ...params: any[]) {
        if (this.showLogs) {
            console.log(`[${title}]`, ...params);
        }
    }

    public warn(title: string, ...params: any[]) {
        if (this.showLogs) {
            console.warn(`[${title}]`, ...params);
        }
    }

    public error(title: string, ...params: any[]) {
        if (this.showLogs) {
            console.error(`[${title}]`, ...params);
        }
    }

    public info(title: string, ...params: any[]) {
        if (this.showLogs) {
            console.info(`[${title}]`, ...params);
        }
    }

    public setShowLogs(show: boolean) {
        this.showLogs = show;
    }
}

export const logger = Logger.getInstance();
