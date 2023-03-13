## icCube Dashboards API Reference Documentation

The API allows for embedding the icCube Dashboards into an existing Web application. This API allows for a two ways
communication between the host application and the icCube Dashboards.

Note that both the `Server Administration UI` and the `Dashboards Editor` can be embedded as well using an approach
similar to the dashboard permalinks explained below in this document.

### Dashboard Permalink

The simplest way to embed an icCube dashboard is to set up an `iframe` using as `src` the permalink of that report.

Refer to this [page](./EmbeddingPermaLink.md) for more details.

### Driving icCube Dashboards from the Host Application

A more complex approach is to use the Javascript API to embed the icCube Dashboards application. The API is
providing an instance of the icCube Dashboards application that is then used to open a dashboard, send events
to a dashboard, listen to events from a dashboard, etc... This integration allows for a two ways communication
between the host application and the icCube Dashboards.

The host application can decide to embed the icCube Dashboards application either via a `div` or an `iframe`.
The `div` approach is more flexible regarding the CSS configuration of the main HTML container of icCube in
the host application and should be more flexible and more efficient regarding the loading time of the required
JS libraries.

In case using the `div` approach is not possible (e.g., Javascript code clash between icCube and the host
application), using an `iframe` is the way to go. Please refer to this [page](./iFrameUsageConsideration.md)
for more details about using an `iframe` within the host application.

Refer to this [page](./EmbeddingJavascript.md) for mode details.

### Console

Both the icCube `Server Administration UI` and the `Dashboards Editor` can be embedded as well using an approach
similar to the dashboard permalinks explained earlier in this document.

Refer to this [page](./EmbeddingConsole.md) for more details.

_
