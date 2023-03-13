## icCube Dashboards API: Console

Similarly to the Dashboards [permalinks](./EmbeddingPermaLink.md), both the `Server Administration UI` and
the `Dashboards Editor` can be embedded using a `iframe` approach. The host application needs to set up the
`iframe.src` attribute with the console URLs.

For example, embedding the `Server Administration UI` can be done as following:

```javascript
    iframe.src = "https://analytics.iccube.com:/icCube/console/"
```

And the `Dashboards Editor`:

```javascript
    iframe.src = "https://analytics.iccube.com:/icCube/report/console"
```

### Configuration

The specified console URL might contain some parameters related to the way the application is being configured.
Please refer to this [page](./EmbeddingConfiguration.md) for more details.

_