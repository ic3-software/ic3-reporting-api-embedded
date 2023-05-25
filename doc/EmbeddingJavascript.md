## icCube Dashboards API: Javascript Integration

The Javascript API allows for loading the icCube Dashboards within an `iframe` or a `div` and then drive the
Dashboards application via the `IReporting` instance sent back icCube via a callback.

This integration allows for a two ways communication between the host application and the icCube Dashboards:

- open a dashboard,
- send events to a dashboard,
- listen to events from a dashboard,
- etc.

The source code of a running [example](https://github.com/ic3-software/ic3-demo-embedded-react)
is available for more (up to date) details.

### Loading icCube (iframe)

You can use the `DashboardsLoaderFrame()` function to load an icCube Dashboards within an `iframe`. Once loaded the
icCube Dashboards application is passing back an instance of `IReporting` to be able to open and manipulate dashboards.

The source code of this simple function is freely available so feel free to modify it according to your needs if
required. It basically creates an `iframe` and set it `src` attribute to open the icCube Dashboards
(via the `url` passed as parameter) and add the parameter `ic3callback` to request icCube to pass back an instance
of `IReporting` using a callback registered in the global object `window.ic3loader`.

Following is an extract of the source code of the live example as mentioned earlier:

```tsx

// The icCube dashboards application as a IReporting instance.
const [reporting, setReporting] = useState<IReporting>();

// ...

const ic3ready = useCallback((ic3: IReporting) => {
    setReporting(ic3);
}, []);

// ...

const url = "/icCube/report/viewer?ic3demo=";

// ...
<DashboardsFrame containerId={"ic3dashboards"} onReady={ic3ready} url={url}/>
```

**Configuration:** the specified console URL might contain some parameters related to the way the application is being
configured.
Please refer to this [page](EmbeddingConfiguration.md) for more details.

### Loading icCube (div)

You can use the `DashboardsLoaderDivContext` class to load the icCube Dashboards in the host application.
This class allows for pre-loading icCube as soon as the host application is ready. Similarly to the `iframe`
approach, an instance of `IReporting` is passed back to the host application.

Please refer to the source code of a running [example](https://github.com/ic3-software/ic3-demo-embedded-react)
for more details about this context usage and configuration. The source code of the `DashboardsLoaderDivContext`
class is available [here](https://github.com/ic3-software/ic3-reporting-api-embedded/blob/main/src/Loader.ts)
for up-to-date information.

**Configuration:** while loading icCube several parameters related to the way the application is being configured can
be specified. Please refer to this [page](EmbeddingConfiguration.md) for more details.

### Open Report

The `IReporting.openReport()` allows for opening a dashboard with an optional list of parameters.

#### Changing Schema/Cube and Theme

The `onDefinition()` callback allows for retrieving the report definition. This definition can be modified to change
for example the default **schema/cube**, or the **theme** used by the dashboard. This allows for **adapting a single
dashboard definition** according to the host application needs before the icCube Dashboards application is using it.
Check the [IReporting](https://github.com/ic3-software/ic3-reporting-api-embedded/blob/main/src/IReporting.ts) source
code for up-to-date information.

Following is an extract of the source code of the live example as mentioned earlier that is opening the
dashboard `shared:/Embedded/Sales` passing the `continent` parameter:

```javascript
reporting.openReport({

    path: "shared:/Embedded/Sales",

    params: [
        {
            channelName: "continent",
            value: [
                {caption: "Asia", name: "Asia", uniqueName: "[Asia]"},
                {caption: "Europe", name: "Europe", uniqueName: "[Europe]"},
                {caption: "North America", name: "North America", uniqueName: "[North America]"},
            ]
        }
    ],

    onDefinition: (report: IReportDefinition) => {
        setReportDef(report);
    },

});
```

#### Dashboard Parameters

Dashboards parameters are used to initialize the initial value of the dashboard's events as well as the initial
selection of the filters (or charts/tables acting as filters) that are publishing a selection event with the names of
the parameters.

You can check the `Dashboard2wayFilterSync.tsx` in the source code of the live example as mentioned earlier.

#### Sending Events to icCube Dashboards

The `IReporting.fireEvent()` allows for sending an event to the opened dashboard.

```javascript
reporting.fireEvent("continent", { caption: "Asia", name: "Asia", uniqueName: "[Asia]"});
```

Should you need to send multiple values, you can use an array as following:

```javascript
reporting.fireEvent("continent", [
    { caption: "Asia", name: "Asia", uniqueName: "[Asia]"},
    { caption: "Europe", name: "Europe", uniqueName: "[Europe]"}
]);
```

Note that the unique name is an actual MDX unique name.

##### Query Generation

Note that event values are not limited to filter widgets. Indeed, an event value can for example be used to generate the
actual query being used by a dashboard widget. Have a look to the `Dashboard1wayDynamicQuery.tsx`
in the source code of the live example as mentioned earlier.

#### Listen to Events from icCube Dashboards

The `IReporting.onEvent()` allows for listening events fired in the opened dashboard and to for example keep the host
application synchronized with the dashboard.

You can check the `Dashboard2wayFilterSync.tsx` in the source code of the live example as mentioned earlier.

#### Sending Notifications to icCube Dashboards

Notifications can be thought of as an action triggered by the host application. For example, the host application can
request icCube to print the opened dashboard.

```javascript
reporting.fireAppNotification({
    type: "print-report",
    payload: {
        paperSizeName: "A4",
        fileName: "my-report.pdf"
    }
});
```

_