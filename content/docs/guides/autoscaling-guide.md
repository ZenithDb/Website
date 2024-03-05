---
title: Enable Autoscaling in Neon
subtitle: Learn how to enable Neon's Autoscaling feature to automatically scale compute
  resources on demand
enableTableOfContents: true
updatedOn: '2024-02-21T13:17:01.633Z'
---

Neon's _Autoscaling_ feature dynamically adjusts the amount of compute resources allocated to a Neon compute endpoint in response to the current workload, eliminating the need for manual intervention. This guide demonstrates how to enable autoscaling in your Neon project and how to [visualize](#monitor-autoscaling) your usage.

_Autoscaling_ is a paid plan feature. Users on paid plans can enable autoscaling for a new project, for an existing project, or for an individual compute endpoint. Autoscaling is supported with both read-write and read-only compute endpoints. Read-only compute endpoints enable Neon's [Read replica](/docs/introduction/read-replicas) feature.

## Enable autoscaling for a new project

Enabling autoscaling when you create a project allows you to set autoscaling default settings for all compute endpoints created in your project. You can adjust autoscaling settings for individual compute endpoints afterward, but setting defaults when creating a project saves you from having to configure the settings for each compute endpoint later on.

To enable autoscaling when you first create your project:

1. Navigate to the [Neon Console](https://console.neon.tech).
2. If you are creating your very first project, click **Create a project**. Otherwise, click **New Project**.
3. Specify a name, a Postgres version, and a region.
4. Under **Compute size**, use the slider to specify a minimum and maximum compute size.
    ![Autoscaling](/docs/guides/autoscaling_project_creation.png)

    <Admonition type="note">
    You can configure the autosuspend setting for your compute endpoint at the same time. The **Suspend compute after a period of inactivity** setting defines the period of inactivity after which a compute endpoint is automatically suspended. This feature is also referred to as "scale-to-zero".
    </Admonition>

6. Click **Create Project**. Your initial compute endpoint is created with the specified settings. All future compute endpoints that you create will use this setting.

## Enable autoscaling for an existing project

Configuring autoscaling for an existing project sets the project's default, which is applied to all compute endpoints created from that point forward. Existing compute endpoints are unaffected. You can adjust autoscaling default or configure the setting for individual compute endpoints later, as necessary.

To configure autoscaling default settings for an existing project:

1. Select a project in the Neon console.
1. On the Neon **Dashboard**, select **Project settings**.
1. Select **Compute** and click **Change**.
1. Under **Compute size**, use the slider to specify a minimum and maximum compute size.
    ![Autoscaling](/docs/guides/autoscaling_existing_project.png)

    <Admonition type="note">
    You can configure the autosuspend setting for your compute endpoint at the same time. The **Suspend compute after a period of inactivity** setting defines the period of inactivity after which a compute endpoint is automatically suspended. This feature is also referred to as "scale-to-zero".
    </Admonition>

6. Click **Save**.

## Enable autoscaling for a compute endpoint

Users on paid plans can edit an individual compute endpoint to alter the compute endpoint configuration, which includes autoscaling.

To edit a compute endpoint:

1. In the Neon Console, select **Branches**.
1. Select a branch.
1. Click on the compute endpoint you want to edit.
![Edit compute endpoint menu](/docs/guides/autoscaling_edit.png)
1. Under **Compute size**, use the slider to specify a minimum and maximum compute size.
    ![Autoscaling edit settings](/docs/guides/autoscaling_edit_settings.png)

    Neon scales the compute size up and down within the specified range to meet workload demand. Autoscaling currently supports a range of 1/4 (.25) to 8 vCPUs. One vCPU has 4 GB of RAM, 2 vCPUs have 8 GB of RAM, and so on. The amount of RAM in GB is always 4 times the number of vCPUs.

    <Admonition type="note">
    You can configure the autosuspend setting for your compute endpoint at the same time. The **Suspend compute after a period of inactivity** setting defines the period of inactivity after which a compute endpoint is automatically suspended. This feature is also referred to as "scale-to-zero".
    </Admonition>
1. Click **Save**.

## Monitor autoscaling

From the Neon Console, you can view how your vCPU and RAM usage scales over time (last hour, day, and week). From the **Branches** page, open the branch you want to inspect, then open the **Edit** modal for its compute endpoint.

![autoscaling graph example](/docs/guides/autoscaling_graphs_sample.png "no-border")

Some key points about this Autoscaling view:

- Allocation refers to the vCPU and memory size provisioned to handle current demand; autoscaling automatically adjusts this allocation, increasing or decreasing the allocated vCPU and memory size in a step-wise fashion as demand fluctuates, within your minimum and maximum limits.
- Your minimum and maximum limits are shown as solid horizontal lines. This represents the allocation boundary: the size of your allocated vCPU/memory stays within this range so long as your compute endpoint remains active. It scales to zero after the defined period of inactivity.
- A re-activated compute endpoint scales up immediately to your minimum allocation, ensuring adequate performance for your anticipated demand.

Place your cursor anywhere in the graph to get more usage detail about that particular point in time.

![autoscaling graph detail](/docs/guides/autoscaling_graph_detail.png "no-border")

<Admonition type="note">
To refresh the graph, close the **Edit compute endpoint** drawer and reopen it.
</Admonition>

See below for some rules of thumb on actions you might want to take based on trends you see in this view.

### Start with a good minimum

Ideally, for smaller datasets, you want to keep as much of your dataset in memory (RAM) as possible. This improves performance by minimizing I/O operations. We recommend setting a large enough minimum limit to fit your full dataset in memory. For larger datasets and more sizing advice, see [how to size your compute endpoint](/docs/manage/endpoints#how-to-size-your-compute).

### Setting your maximum

If your autoscaling graphs show regular spikes that hit your maximum setting, consider increasing your maximum. However, because these spikes plateau at the maximum setting, it can be difficult to determine your actual demand.

Another approach is to set a higher threshold than you need and monitor usage spikes to get a sense of where your typical maximum demand reaches; you can then throttle the maximum setting down closer to anticipated/historical demand. Either way, with autoscaling you only pay for what you use; a higher setting does not translate to higher costs unless the demand is there to increase usage.

### The neon_utils extension

Another tool for understanding usage, the `neon_utils` extension provides a `num_cpus()` function that helps you monitor how the _Autoscaling_ feature allocates compute resources in response to workload. For more information, see [The neon_utils extension](/docs/extensions/neon-utils).
