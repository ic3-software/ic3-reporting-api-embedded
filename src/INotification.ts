import {PaperOrientation, PaperSizeName} from "./ITypes";

export type AppNotificationType =
    "edit-report" |
    "print-report-dialog" |
    "print-report" |
    "print-report-without-state" |
    "print-report-in-browser" |
    "clear-selection-all-widgets" |
    "initialize-selection-all-widgets" |
    "save-state-to-localstorage" |
    "restore-state-from-localstorage" |
    "save-ownprops-to-localstorage" |
    "restore-ownprops-from-localstorage" |
    "save-reportwidgets-ownprops-to-localstorage" |
    "restore-reportwidgets-ownprops-from-localstorage"
    ;

export interface IAppNotification {

    /**
     * E.g., print-report.
     */
    readonly type: AppNotificationType;

}

export interface IAppNotificationWithPayload<PAYLOAD> extends IAppNotification {

    /**
     * E.g., print-report.
     */
    readonly type: AppNotificationType;

    /**
     * E.g., print-report file name.
     */
    readonly payload: PAYLOAD;

}

export interface AppEditReportNotification extends IAppNotification {

    readonly type: "edit-report";

}

export interface AppPrintReportNotificationPayload {

    fileName?: string;

    paperSizeName?: PaperSizeName;
    paperOrientation?: PaperOrientation;

    // Expressed in paper units (Letter, Legal, Ledger in inches, others in mm).

    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;

}

export interface IAppPrintReportNotification extends IAppNotificationWithPayload<AppPrintReportNotificationPayload> {

}

export interface AppPrintReportNotification extends IAppPrintReportNotification {

    readonly type: "print-report";

}

export interface AppPrintReportWithoutStateNotification extends IAppPrintReportNotification {

    readonly type: "print-report-without-state";

}

export interface AppPrintReportInBrowserNotification extends IAppPrintReportNotification {

    readonly type: "print-report-in-browser";

}

export interface AppPrintReportDialogNotification extends IAppNotification {

    readonly type: "print-report-dialog";

}

export interface SaveStateToLocalStorageNotification extends IAppNotification {

    readonly type: "save-state-to-localstorage";

}

export interface RestoreStateFromLocalStorageNotification extends IAppNotification {

    readonly type: "restore-state-from-localstorage";

}

export interface SaveOwnPropsToLocalStorageNotification extends IAppNotification {

    readonly type: "save-ownprops-to-localstorage";

}

export interface RestoreOwnPropsFromLocalStorageNotification extends IAppNotification {

    readonly type: "restore-ownprops-from-localstorage";

}

export interface SaveWidgetOwnPropsToLocalStorageNotification extends IAppNotification {

    readonly type: "save-reportwidgets-ownprops-to-localstorage";

}

export interface RestoreWidgetOwnPropsFromLocalStorageNotification extends IAppNotification {

    readonly type: "restore-reportwidgets-ownprops-from-localstorage";

}

export interface ClearSelectionAllWidgetsNotification extends IAppNotification {

    readonly type: "clear-selection-all-widgets";

}

export interface InitializeSelectionAllWidgetsNotification extends IAppNotification {

    readonly type: "initialize-selection-all-widgets";

}


export type AppNotification =
    AppEditReportNotification |
    AppPrintReportDialogNotification |
    AppPrintReportNotification |
    AppPrintReportWithoutStateNotification |
    AppPrintReportInBrowserNotification |
    SaveStateToLocalStorageNotification |
    RestoreStateFromLocalStorageNotification |
    SaveOwnPropsToLocalStorageNotification |
    RestoreWidgetOwnPropsFromLocalStorageNotification |
    SaveWidgetOwnPropsToLocalStorageNotification |
    RestoreOwnPropsFromLocalStorageNotification |
    InitializeSelectionAllWidgetsNotification |
    ClearSelectionAllWidgetsNotification
    ;

export interface IAppNotificationToken {

    type: AppNotificationType;

    uid: number;

}

export interface IAppNotificationCallback {

    onStarted: (token: IAppNotificationToken) => void;

    onSuccess: (token: IAppNotificationToken) => void;

    onError: (token: IAppNotificationToken, error: any) => void;

}