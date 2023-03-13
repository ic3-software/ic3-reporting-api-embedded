## icCube Dashboards API: iframe Usage Consideration

In order to avoid any security issue related to the usage of an `iframe` and for example Cross-Origin Resource Sharing
(CORS) access we strongly advise using a `reverse proxy` to make the icCube server part of your host application domain.
Note that a `reverse proxy` is more likely already in place in order to integrate icCube into the host application
authentication framework. You might refer to the general [page](https://www.iccube.com/support/documentation/) for more
details about how the authentication might be performed when embedding icCube.

Once a `reverse proxy` has been put in place, there is no specific issue related to using an `iframe` and more
specifically the host and the icCube Dashboards application can exchange information for performing a two ways
communication. You might refer to this [page](./EmbeddingJavascript.md) for more details.

_
