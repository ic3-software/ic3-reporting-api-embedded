import ReportingVersion from "./ReportingVersion";
import {AppNotification, IAppNotificationCallback, IAppNotificationToken} from "./INotification";

export interface IReportDefinition {

    getName(): string;

    getPath(): string;

    getDefaultSchemaName(): string;

    setDefaultSchemaName(name: string): void;

    getDefaultCubeName(): string | undefined;

    setDefaultCubeName(name: string): void;

    /**
     * Returns the theme ID set in the report.
     */
    getThemeUID(): string;

    /**
     * Sets the theme ID used by the report. With {@see setChangeThemeCallback}, you can set a callback to change the
     * options of this theme.
     *
     * @param uid ID of the theme.
     */
    setThemeUID(uid: string): void;

    /**
     * Set a callback that changes the theme before it is applied to the dashboard. For example,
     * you can change the primary color of the theme.
     *
     * The caller should not keep the theme instance as it might contain a proxy that will be
     * revoked after this call.
     *
     * If you need to modify a Javascript function of the theme and later need to print the dashboard,
     * then use the 'setThemeProcessorCall' instead.
     *
     * Examples:
     * - Change the primary color of the theme to red: `theme.palette.primary.main = "#ff0000";`
     * - Change default chart color: `theme.palette.ic3.chartSingleColors.default = "#ff0000";`
     * - Change background: `theme.palette.ic3.pageBackgroundColor = "#ff0000";`
     * - Change selected color: `theme.palette.ic3.selected = "#ff0000";`
     *
     * @param theme a MUI theme. Note the type is not exported to prevent React import issues.
     */
    setChangeThemeCallback(callback: (theme: any) => void): void;

    /**
     * The call must be available from the installed plugins. This method takes precedences over
     * the 'setChangeThemeCallback' method.
     */
    setThemeProcessorCall(call: IThemeProcessorCall): void;
}

export interface IThemeProcessorCall
{
    name : string;
    params?: any;

}

export interface IReportAppDefinition {

    getName(): string;

    getPath(): string;

    setInitialReportPath(initialReportPath: string): void;

}

export interface IEventContentItem {

    /**
     * Localized name or name.
     */
    caption: string;

    name: string;

    uniqueName: string;
    // uniqueNameCS: boolean;
}

export type IEventContent = IEventContentItem | IEventContentItem[]

/**
 * Used to setup filter initial selection.
 */
export interface IReportParam {
    channelName: string;
    value: IEventContent;
}

export interface IOpenGadgetOptions {

    /**
     * Full path of the gadget (e.g., shared:/marc/my-gadget).
     */
    path: string;

}

export interface IOpenReportOptions {

    embedded?: boolean;

    /**
     * Full path of the report (e.g., shared:/marc/my-report).
     */
    path: string;

    /**
     * When opening a report in viewer mode (i.e., /viewer URL) icCube is checking that the default schema
     * is being authorized and generates an error. When opening a report from a host application and changing
     * the default schema on the fly, you might want to disable that check.
     */
    disableDefaultSchemaAuthCheck?: boolean;

    /**
     * Optional JSON object (i.e., constant / filter default value).
     */
    params?: IReportParam[];

    /**
     * Called before the report definition is actually applied. Give the opportunity
     * to change the definition (e.g., schema name, theme).
     *
     * The caller should not keep the report instance as it might contain a proxy that will be
     * revoked after this call.
     */
    onDefinition?: (report: IReportDefinition) => void;

    /**
     * If the method exist and return true then the default error dispatcher is not
     * being called. Give the caller the opportunity to render the error.
     */
    onError?: (error: any) => boolean;

    /**
     * Called when the report is loaded without errors.
     */
    onSuccess?: () => void;

}

export interface IOpenReportAppOptions {

    /**
     * Full path of the report app. (e.g., shared:/my-app).
     */
    path: string;

    /**
     * Called before the application definition is actually applied.
     * Give the opportunity to change the definition.
     */
    onDefinition?: (app: IReportAppDefinition) => void;

    /**
     * If the method exist and return true then the default error dispatcher is not
     * being called. Give the caller the opportunity to render the error.
     */
    onError?: (error: any) => boolean;

    /**
     * Called when the application is loaded without errors.
     */
    onSuccess?: () => void;
}

export interface IPathInfo {

    name: string;
    path: string;

}

export interface IRootPaths {

    shared?: IPathInfo;
    home?: IPathInfo;
    users?: IPathInfo;

}

export interface IPath {

    folder: boolean;

    name: string;
    path: string;

}

export interface IPathsCallback {

    onSuccess: (paths: IPath[]) => void;

    onError: (error: any) => void;

}

/**
 * An instance of icCube reporting application.
 */
export interface IReporting {

    getVersion(): ReportingVersion;

    /**
     * The root paths for accessing dashboards, dashboards applications
     * according to the security profile of the user.
     */
    getRootPaths(): IRootPaths;

    /**
     * Asynchronous retrieval of dashboards paths.
     */
    getDashboardPaths(path: string, callback: IPathsCallback): void;

    /**
     * Asynchronous retrieval of dashboard applications paths.
     */
    getDashboardApplicationPaths(path: string, callback: IPathsCallback): void;

    /**
     * @param options            path, ...
     * @param pushToHistory      defaulted to true
     * @param keepGlobalFilter   defaulted to true. Apply the global filter to the newly opened report.
     *
     * @see IOpenReportOptions#onDefinition
     */
    openReport(options: IOpenReportOptions, pushToHistory?: boolean, keepGlobalFilter?: boolean): void;

    /**
     * @param options          path, ...
     * @param pushToHistory    defaulted to true
     *
     * @see IOpenReportOptions#onDefinition
     */
    openReportApp(options: IOpenReportAppOptions, pushToHistory?: boolean): void;

    /**
     * Publish a widget event to the dashboard.
     */
    fireEvent(eventName: string, value: IEventContent | null): void;

    /**
     * Subscribe to a widget event.
     */
    onEvent(eventName: string, callback: (value: IEventContent | null) => void): void;

    /**
     * Publish an application notification (e.g., print-report).
     *
     * Note that a single 'print' notification can be active in the application.
     *
     * @param callback currently used to monitor a 'print' notification.
     */
    fireAppNotification(notification: AppNotification, callback?: IAppNotificationCallback): void;

    /**
     * Attempt to cancel an ongoing application notification (e.g., print).
     *
     * @param token as returned via the 'onSuccess' method in the 'fireAppNotification' callback.
     */
    cancelAppNotification(token: IAppNotificationToken): void;

}
