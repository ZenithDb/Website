---
title: The Neon Datadog integration
subtitle: Send metrics and events from Neon Postgres to Datadog
enableTableOfContents: true
tag: new
updatedOn: '2024-10-12T11:16:13.585Z'
---

<InfoBlock>
<DocsList title="What you will learn:">
<p>How to set up the integration</p>
<p>The full list of externally-available metrics</p>
</DocsList>

<DocsList title="External docs" theme="docs">
<a href="https://docs.datadoghq.com/account_management/api-app-keys/">Datadog API and Application Keys</a>
<a href="https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site/">Identify Datadog site</a>
</DocsList>
</InfoBlock>

Available for Scale and Business Plan users, the Neon Datadog integration lets you monitor Neon database performance, resource utilization, and system health directly from Datadog's observability platform.

<ComingSoon/>

## How it works

The integration leverages a [list of metrics](#available-metrics) that Neon makes available for export to third-party services. By configuring the integration with your Datadog API key, Neon automatically sends metrics from your project to your selected Datadog site. Some of the key metrics include:

- **Connection counts** &#8212; Tracks active and idle database connections.
- **Database size** &#8212; Monitors total size of all databases in bytes.
- **Replication delay** &#8212; Measures replication lag in bytes and seconds.
- **Compute metrics** &#8212; Includes CPU and memory usage statistics for your compute.

<Admonition type="note"> 
Metrics are sent for all computes in your Neon project. For example, if you have multiple branches, each with an attached compute, metrics will be collected and sent for each compute. 
</Admonition>

## Prerequisites

Before getting started, ensure the following:

- You have a Neon account and project. If not, see [Sign up for a Neon account](/docs/get-started-with-neon/signing-up).
- You have a Datadog account and API key.
- You know the region you selected for your Datadog account. Here's how to check: [Find your Datadog region](https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site)

## Steps to integrate Datadog with Neon

1. In the Neon Console, navigate to the **Integrations** page in your Neon project.
2. Locate the **Datadog** card and click **Add**.
3. Enter your **Datadog API key**. You can generate or retrieve [Datadog API Keys](https://app.datadoghq.com/organization-settings/api-keys) from your Datadog organization.
4. Select the Datadog **site** that you used when setting up your Datadog account.
5. Click **Confirm** to complete the integration.

Once set up, Neon will start sending metrics to Datadog, and you can use these metrics to create custom dashboards and alerts in Datadog.

<Admonition type="note"> 
Neon computes only send metrics when they are active. If the [Autosuspend](/docs/introduction/auto-suspend) feature is enabled and a compute is suspended due to inactivity, no metrics will be sent during the suspension. This may result in gaps in your Datadog metrics. If you notice missing data in Datadog, check if your compute is suspended. You can verify a compute's status as `Idle` or `Active` on the **Branches** page in the Neon console, and review **Suspend compute** events on the **System operations** tab of the **Monitoring** page.

Additionally, if you are setting up Neon’s Datadog integration for a project with an inactive compute, you'll need to activate the compute before it can send metrics to Datadog. To activate it, simply run a query from the [Neon SQL Editor](/docs/get-started-with-neon/query-with-neon-sql-editor) or any connected client on the branch associated with the compute.
</Admonition>

## Example usage in Datadog

Once integrated, you can create custom dashboards in Datadog by querying the metrics sent from Neon. Use Datadog's **Metrics Explorer** to search for metrics like `connection_counts`, `db_total_size`, and `host_cpu_seconds_total`. You can also set alerts based on threshold values for critical metrics.

## Available metrics

Neon makes the following metrics available for export to third parties; for now, availability is limited to the Datadog integration but will soon be expanded to other providers.

All metrics include the following labels:

- `project_id`
- `endpoint_id`
- `compute_id`
- `job`

Here's an example of the metric `db_total_size` with all labels:

```json shouldWrap
db_total_size{project_id="square-daffodil-12345678", endpoint_id="ep-aged-art-260862", compute_id="compute-shrill-blaze-b4hry7fg", job="sql-metrics"} 10485760
```

<Admonition type="note">
In Datadog, metric labels are referred to as `tags.` See [Getting Started with Tags](https://docs.datadoghq.com/getting_started/tagging/) in the Datadog Docs.
</Admonition>

| Name                                     | Job                  | Description                                                                                                                                              |
| ---------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| connection_counts                        | sql-metrics          | Connection counts. The `state` label is reported as `state` from the `pg_stat_activity` Postgres view. Example values: `state="active"`, `state="idle"`. |
| db_total_size                            | sql-metrics          | Size of all databases for the project, measured in bytes.                                                                                                |
| lfc_approximate_working_set_size_windows | sql-metrics          | Approximate working set size in pages of 8192 bytes. Duration values: `duration="5m"`, `duration="15m"`, `duration="1h"`.                                |
| lfc_cache_size_limit                     | sql-metrics          | LFC cache size limit in bytes.                                                                                                                           |
| lfc_hits                                 | sql-metrics          | Number of cache hits in the LFC.                                                                                                                         |
| lfc_misses                               | sql-metrics          | Number of cache misses in the LFC.                                                                                                                       |
| lfc_used                                 | sql-metrics          | LFC chunks used (`chunk` = 1MB).                                                                                                                         |
| lfc_writes                               | sql-metrics          | Number of writes to the LFC.                                                                                                                             |
| max_cluster_size                         | sql-metrics          | The `neon.max_cluster_size` setting in MB.                                                                                                               |
| pg_stats_userdb                          | sql-metrics          | Metrics from `pg_stat_database` for oldest non-system databases. Metrics: database size, deadlocks, rows inserted, updated, or deleted.                  |
| replication_delay_bytes                  | sql-metrics          | Bytes between received and replayed LSN (`Log Sequence Number`).                                                                                         |
| replication_delay_seconds                | sql-metrics          | Time since the last `LSN` was replayed.                                                                                                                  |
| host_cpu_seconds_total                   | compute-host-metrics | The number of CPU seconds accumulated in different operating modes (user, system, idle, etc.).                                                           |
| host_load1                               | compute-host-metrics | System load averaged over the last 1 minute. Example: for 0.25 vCPU, `host_load1` of `0.25` means full utilization, >0.25 indicates waiting processes.   |
| host_load5                               | compute-host-metrics | System load averaged over the last 5 minutes.                                                                                                            |
| host_load15                              | compute-host-metrics | System load averaged over the last 15 minutes.                                                                                                           |
| host_memory_active_bytes                 | compute-host-metrics | The number of bytes of active main memory.                                                                                                               |
| host_memory_available_bytes              | compute-host-metrics | The number of bytes of main memory available.                                                                                                            |
| host_memory_buffers_bytes                | compute-host-metrics | The number of bytes of main memory used by buffers.                                                                                                      |
| host_memory_cached_bytes                 | compute-host-metrics | The number of bytes of main memory used by cached blocks.                                                                                                |
| host_memory_free_bytes                   | compute-host-metrics | The number of bytes of main memory not used.                                                                                                             |
| host_memory_shared_bytes                 | compute-host-metrics | The number of bytes of main memory shared between processes.                                                                                             |
| host_memory_swap_free_bytes              | compute-host-metrics | The number of free bytes of swap space.                                                                                                                  |
| host_memory_swap_total_bytes             | compute-host-metrics | The total number of bytes of swap space.                                                                                                                 |
| host_memory_swap_used_bytes              | compute-host-metrics | The number of used bytes of swap space.                                                                                                                  |
| host_memory_swapped_in_bytes_total       | compute-host-metrics | The number of bytes that have been swapped into main memory.                                                                                             |
| host_memory_swapped_out_bytes_total      | compute-host-metrics | The number of bytes that have been swapped out from main memory.                                                                                         |
| host_memory_total_bytes                  | compute-host-metrics | The total number of bytes of main memory.                                                                                                                |
| host_memory_used_bytes                   | compute-host-metrics | The number of bytes of main memory used by programs or caches.                                                                                           |

## Feedback and future improvements

We’re always looking to improve! If you have feature requests or feedback, please let us know via the [Feedback form](https://console.neon.tech/app/projects?modal=feedback) in the Neon Console or on our [Discord channel](https://discord.com/channels/1176467419317940276/1176788564890112042).

<NeedHelp/>
