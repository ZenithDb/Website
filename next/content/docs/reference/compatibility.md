---
title: PostgreSQL Compatibility
enableTableOfContents: true
redirectFrom:
  - /docs/conceptual-guides/compatibility
---

Neon is protocol and application-compatible with PostgreSQL. However, when using the Neon cloud service, there are some limitations that you should be aware of.

## PostgreSQL versions

Neon cloud service is currently compatible with PostgreSQL 14 and PostgreSQL 15. You can select the PostgreSQL version you want to use when creating a Neon project. PostgreSQL 15 selected by default. For information about creating a Neon project, See [Manage projects](../../manage/projects).

## Permissions and extension support

Neon cloud service does not currently provide users with access permissions other than those granted to standard database owners in PostgreSQL. Therefore, Neon users cannot access replication methods, create additional users or roles from a PostgreSQL connection, or install PostgreSQL extensions other than those permitted by Neon. For information about the PostgreSQL extensions that Neon supports, see [PostgreSQL Extensions](../pg-extensions).

<a id="default-parameters/"></a>

## Neon PostgreSQL parameter settings

The following table lists Neon PostgreSQL parameter settings that may differ from the expected default.

| Parameter       | Value   | Note                                                                              |
| --------------- | ------- | --------------------------------------------------------------------------------- |
| fsync           | off     | Neon syncs data to the Neon Storage Engine to store your data safely and reliably |
| max_connections |         | The value depends on compute size. Set to 100 for the Technical Preview.          |
| shared_buffers  |         | The value depends on compute size                                                 |
| wal_level       | replica | Logical replication is currently not supported                                    |

<Admonition type="note">
You can enable connection pooling in Neon to increase the number of supported connections. For more information, see [Connection pooling](../../connect/connection-pooling).
</Admonition>

## Unlogged tables

Unlogged tables are maintained on Neon compute local storage. These tables do not survive compute restart (including when compute becomes idle). This is unlike a standalone PostgreSQL installation, where unlogged tables are only truncated in the event of abnormal process termination. Additionally, unlogged tables are limited by compute local storage size.

## Spill and index build handling

Certain queries in PostgreSQL can generate large datasets that do not fit in memory. In such cases, storage spills the data. In Neon, the size of compute local storage limits the ability to create large indexes or execute certain queries that generate large datasets.

## Temporary tables

Temporary tables, which are stored in compute local storage, are limited by compute local storage size.

## Session context

The Neon cloud service automatically closes idle connections after a period of inactivity, as described in [Compute lifecycle](/docs/conceptual-guides/compute-lifecycle/). When connections are closed, anything defined within a session context is forgotten and must be recreated before being used again. For example, temporary tables, prepared statements, advisory locks, and notifications and listeners that were defined using the [NOTIFY](https://www.postgresql.org/docs/14/sql-notify.html)/[LISTEN](https://www.postgresql.org/docs/14/sql-listen.html) commands only exist for the duration of the current session and are lost when the session ends.

## Statistics collection

Statistics collected by the PostgreSQL [cumulative statistics system](https://www.postgresql.org/docs/14/monitoring-stats.html) are currently not saved when the Neon compute node is suspended due to inactivity or restarted. For information about the lifecycle of a Neon compute, see [Compute lifecycle](/docs/conceptual-guides/compute-lifecycle/).

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
