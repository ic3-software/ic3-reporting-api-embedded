## icCube Javascript Configuration

Once loaded the behavior of the icCube Javascript code can be configured via dedicated URL parameters
(`iframe` approach). Note when using the [div](#div) approach, equivalent parameters can be specified
with the `DashboardsLoaderDivContext`.

### URL Parameter: ic3customHeaders

When specified, icCube is going to request some custom HTTP headers before sending any `Ajax` request.
This might be required for example to add `JWT-token` before the icCube requests are hitting your API
backend where they are forwarded to the actual icCube server.

The host application must implement an event listener listening for `ic3-custom-headers-request` message.
Following is a possible implementation. icCube is posting the message at startup time and then listen forever
the message `ic3-custom-headers-reply` to update the actual HTTP headers to send.

```javascript
window.addEventListener("message", event => {

    const data = event.data;

    if (data.type === "ic3-custom-headers-request") {
        const embeddedDiv = (data.ic3callerType === "div");
        const ic3customheaders = data.ic3customheaders /* as specified in the URL */;

        const target = !embeddedDiv
            ? document.getElementById(ic3customheaders)?.["contentWindow"]
            : window
        ;

        target && target.postMessage(
            {
                type: "ic3-custom-headers-reply",
                data: {
                    headers: {
                        "Authorization": "JWT @xyz",
                    }
                }
            },
            "*"
        );
    }
})
```

Any value can be used for this parameter. Its value is passed to the `ic3-custom-headers-request` message
in the `data.ic3customHeaders` field. The host application can then act accordingly: e.g., identifying an
`iframe` instance for posting back the reply.

### URL Parameter: ic3configuration

When specified, icCube is going to adapt the actual UI to an embedded scenario. For example, the `logout` menu
item is being removed and all `open-in-new-tab` actions are either removed or replaced accordingly.

For the time being, any value can be used for this parameter. In the future, possible ad-hoc configuration
mechanism could be specified. Right now some sort of a default behavior is being applied.

Note that this parameter is assumed being defined when:

- using the `ic3customHeaders`,
- embedding icCube using the `div` approach,
- embedding icCube using an `iframe` using the `DashboardsLoaderFrame` approach.

### DIV

When embedding icCube Dashboards using a `div` there is no URL to configure. Please refer to the specific API
that explain how to specify this behavior. We strongly advise checking the available source code of a working
example [ic3-demo-embedded-react](https://github.com/ic3-software/ic3-demo-embedded-react).

_