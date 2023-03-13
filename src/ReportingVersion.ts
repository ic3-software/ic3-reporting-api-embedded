export default class ReportingVersion {

    /**
     * e.g., 8.0.0-alpha.1
     */
    public readonly version: string;

    public readonly timestamp: string;

    constructor(version: string, timestamp: string) {

        this.version = version;
        this.timestamp = timestamp;
    }

    public getInfo() {
        return this.version + " (" + this.timestamp + ")";
    }

}
