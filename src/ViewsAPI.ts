/**
 * JSON String of the view data.
 */
export type FilterPanelViewData = string;

/**
 * The display name of the filter panel view. This name is unique for the schema * cube combination.
 */
export type FilterPanelViewName = string;

export interface AdditionActionButton {
    /**
     * ID for the button. Also used for the CSS classname of the button.
     */
    id: string;

    /**
     * Button text.
     */
    caption: string;

    /**
     * Name of the icon for the button. The API retrieves the icons from the theme API to prevent React conflicts.
     * Return your icon in this function of the theme API: theme.ic3.icons.getViewsMenuCustomButtonIcon(icon).
     */
    icon?: string;

    /**
     * Callback when the user click the button.
     */
    callback: () => void;
}

/**
 * For a given schema and (possibly undefined) cube.
 */
export interface FilterPanelViewStorage {

    getSchemaName(): string;

    getCubeName(): string | undefined;

    /**
     * Get current views in the model.
     *
     * Reject the promise to report error : the reason of the error should be a message for the end user.
     *
     * @return All the views for the schema * cube for that user.
     */
    getViews(): Promise<FilterPanelViewName[]>;

    /**
     * Add a view to the model.
     *
     * Overwrite any existing view with the same name.
     *
     * Reject the promise to report error : the reason of the error should be a message for the end user.
     *
     * @return A promise.
     */
    saveView(viewName: FilterPanelViewName, viewData: FilterPanelViewData): Promise<void>;

    /**
     * Callback when a view is deleted.
     *
     * Reject the promise to report error : the reason of the error should be a message for the end user.
     *
     * @return A promise.
     */
    deleteView(viewName: FilterPanelViewName): Promise<void>;

    /**
     * The user selected this view. The component requests the view data for this view.
     *
     * Reject the promise to report error : the reason of the error should be a message for the end user.
     *
     * @return A promise with the view data.
     */
    getView(viewName: FilterPanelViewName): Promise<FilterPanelViewData>;

    /**
     * Additional actions in the views menu. These buttons are rendered below the save-button.
     */
    additionalActions?(): AdditionActionButton[];

}

export interface FilterPanelViewStorageFactory {

    /**
     * Get the view API for the schema and cube used by the filter panel.
     *
     * @param schemaName the name of the schema in the filter panel
     * @param cubeName the name of the cube in the filter panel. This can be empty. If empty, you might choose to return all the views for that schema.
     *
     * @return The api for managing the views.
     */
    getViewStorage: (schemaName: string, cubeName: string | undefined) => FilterPanelViewStorage;

}