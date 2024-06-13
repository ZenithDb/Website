---
title: Manage branches
enableTableOfContents: true
isDraft: false
redirectFrom:
  - /docs/get-started-with-neon/get-started-branching
updatedOn: '2024-02-22T14:29:54.387Z'
---

Data resides in a branch. Each Neon project is created with a [root branch](#root-branch) called `main`, which is also designated as your [primary branch](#primary-branch). You can create child branches from `main` or from previously created branches. A branch can contain multiple databases and roles. Tier limits define the number of branches you can create in a project and the amount of data you can store in a branch.

A child branch is a copy-on-write clone of the parent branch. You can modify the data in a branch without affecting the data in the parent branch.
For more information about branches and how you can use them in your development workflows, see [Branching](/docs/introduction/branching).

You can create and manage branches using the Neon Console, [Neon CLI](/docs/reference/neon-cli), or [Neon API](https://api-docs.neon.tech/reference/getting-started-with-neon-api).

<Admonition type="important">
When working with branches, it is important to remove old and unused branches. Branches hold a lock on the data they contain, preventing disk space from being reallocated. Neon retains a data history by default. You can configure the retention period. See [Point-in-time restore](/docs/introduction/point-in-time-restore). To keep data storage to a minimum, remove branches before they age out of the history retention window.
</Admonition>

## Primary branch

Each Neon project has a primary branch. In the Neon Console, your primary branch is identified by a `PRIMARY` tag. You can designate any branch as the primary branch for your project. The advantage of the primary branch is that its compute endpoint remains accessible if you exceed your project's limits, ensuring uninterrupted access to data that resides on the primary branch, which is typically the branch used in production.

- For Neon Free Tier users, the compute endpoint associated with the primary branch is always available.
- For users on paid plans, the compute endpoint associated with the primary branch is exempt from the limit on simultaneously active computes, ensuring that it is always available. Neon has a default limit of 20 simultaneously active computes to protect your account from unintended usage.

## Non-primary branch

Any branch not designated as the primary branch is considered a non-primary branch. You can rename or delete non-primary branches.

- For Neon Free Tier users, compute endpoints associated with non-primary branches are suspended if you exceed the Neon Free Tier  _active hours_ limit of 20 hours per month.
- For users on paid plans, default limits prevent more than 20 simultaneously active compute endpoints. Beyond that limit, a compute endpoint associated with a non-primary branch remains suspended.

## Protected branch

"Protected" is a status assigned to a branch that limits access based on IP addresses. Only IPs listed in the project’s IP allowlist can access this branch. Typically, a protected status is given to a branch or branches that hold production data or sensitive data. The protected branch feature is only supported on Neon's [Scale](/docs/introduction/plans#scale) plan, where you can designate up to 5 protected branches. For information about how to configure a protected branch, see [Set a branch as protected](#set-a-branch-as-protected).

## Create a branch

To create a branch:

1. In the Neon Console, select a project.
2. Select **Branches**.
3. Click **Create branch** to open the branch creation dialog.
![Create branch dialog](/docs/manage/create_branch.png)
4. Enter a name for the branch.
5. Select a parent branch. You can branch from your Neon project's [primary branch](#primary-branch) or a [non-primary branch](#non-primary-branch).
6. Select an **Include data up to** option to specify the data to be included in your branch.
    - **Current point in time**: Creates a branch with the latest available data from the parent (the default).
    - **Specific date and time**: Creates a branch with data up to a specific date and time, allowing for point-in-time restore.
    - **Specific Log Sequence Number**: Creates a branch with data up to a specific [Log Sequence Number (LSN)](/docs/reference/glossary#lsn) in the database log, allowing for precise point-in-time restore.

    <Admonition type="note">
    The **Specific date and time** and the **Specific Log Sequence Number Data** options do not include data changes that occurred after the specified date and time or LSN, which means the branch contains data as it existed previously, allowing for point-in-time restore. You can only specify a date and time or LSN value that falls within your history retention window. See [Configure history retention](/docs/manage/projects#configure-history-retention).
    </Admonition>

8. Click **Create new branch** to create your branch.

You are directed to the **Branch** overview page where you are shown the details for your new branch.

## View branches

To view the branches in a Neon project:

1. In the Neon Console, select a project.
1. Select **Branches** to view all current branches in the project.

   ![all branches](/docs/manage/branches_all_list.png)

   Branch details in this table view include:

   - **Branch**: The branch name, which is a generated name if no name was specified when created.
   - **Parent**: Indicates the parent from which this branch was created, helping you track your branch hierarchy.
   - **Active time**: Number of hours the branch's compute was active so far in the current billing period.
   - **RW Compute**: Shows the current compute size and status for the branch's compute.
   - **Data size**: Indicates the logical data size of each branch, helping you monitor your plan's storage limit. Data size does not include history.
   - **Last active**: Shows when the branch's compute was last active.

1. Select a branch from the table to view details about the branch.

    ![View branch details](/docs/manage/branch_details.png)

    Branch details shown on the branch page include:

    - **ID**: The branch ID. Branch IDs have a `br-` prefix.
    - **Created**: The date and time the branch was created.
    - **Compute hours**: The compute hours used by the branch in the current billing period.
    - **Active hours since**: The active hours used by the branch compute in the current billing period.
    - **Data size**: The logical data size of the branch. Data size does not include history.
    - **Parent branch**: The branch from which this branch was created (only applicable to child branches).
    - **Branching point**: The point in time, in terms of data, from which the branch was created (only applicable to child branches).
    - **Last data reset**: The last time the branch was reset from the parent branch (only applicable to child branches). For information about the **Reset from parent** option, see [Reset from parent](/docs/guides/reset-from-parent).
    - **Compare to parent**: For information about the **Open schema diff** option, see [Schema diff](/docs/guides/schema-diff).

The branch details page also includes details about the **Computes**, **Roles & Databases**, and **Child branches** that belong to the branch. In Neon, all of these objects are associated with a particular branch. For information about these objects, see:

- [Manage computes](/docs/manage/endpoints#view-a-compute-endpoint).
- [Manage roles](/docs/manage/roles)
- [Manage databases](/docs/manage/databases)
- [View branches](#view-branches)

## Rename a branch

Neon permits renaming a branch, including your project's primary branch. To rename a branch:

1. In the Neon Console, select a project.
2. Select **Branches** to view the branches for the project.
3. Select a branch from the table.
4. On the branch overview page, click the **Actions** drop-down menu and select **Rename**.
5. Specify a new name for the branch and click **Save**.

## Set a branch as primary

Each Neon project is created with a primary branch called `main`, but you can designate any branch as your project's primary branch. The benefit of the primary branch is that the compute endpoint associated with the primary branch remains accessible if you exceed project limits, ensuring uninterrupted access to data on the primary branch. For more information, see [Primary branch](#primary-branch).

To set a branch as the primary branch:

1. In the Neon Console, select a project.
2. Select **Branches** to view the branches for the project.
3. Select a branch from the table.
4. On the branch overview page, click the **Actions** drop-down menu and select **Set as primary**.
5. In the **Set as primary** confirmation dialog, click **Set as Primary** to confirm your selection.

## Set a branch as protected

"Protected" is a status assigned to a branch that limits access based on IP addresses. Only IPs listed in the project’s IP allowlist can access this branch. This feature is available on Neon's [Scale](/docs/introduction/plans#scale) plan, which supports up to five protected branches.

For the protected status to have any effect, you must:

1. Define an IP allowlist.
2. Select the **Restrict IP access to protected branches only** option.

For instructions, see [Configure IP Allow](/docs/manage/projects#configure-ip-allow).

To designate a branch as protected:

1. In the Neon Console, select a project.
2. Select **Branches** to view the branches for the project.
3. Select a branch from the table.
4. On the branch overview page, click the **Actions** drop-down menu and select **Set as protected**.
5. In the **Set as protected** confirmation dialog, click **Set as protected** to confirm your selection.

For step-by-step instructions, refer to our [Protected branches guide](/docs/guides/protected-branches).

## Connect to a branch

Connecting to a database in a branch requires connecting via a compute endpoint associated with the branch. The following steps describe how to connect using `psql` and a connection string obtained from the Neon Console.

<Admonition type="tip">
You can also query the databases in a branch from the Neon SQL Editor. For instructions, see [Query with Neon's SQL Editor](/docs/get-started-with-neon/query-with-neon-sql-editor).
</Admonition>

1. In the Neon Console, select a project.
2. On the project **Dashboard**, under **Connection Details**, select the branch, the database, and the role you want to connect with.
![Connection details widget](/docs/connect/connection_details.png)
3. Copy the connection string. A connection string includes your role name, the compute endpoint hostname, and database name.
4. Connect with `psql` as shown below.

  ```bash shouldWrap
  psql postgres://[user]:[password]@[neon_hostname]/[dbname]
  ```

<Admonition type="tip">
A compute endpoint hostname starts with an `ep-` prefix. You can also find a compute endpoint hostname on the **Branches** page in the Neon Console. See [View branches](#view-branches).
</Admonition>

If you want to connect from an application, the **Connection Details** widget on the project **Dashboard** and the [Frameworks](/docs/get-started-with-neon/frameworks) and [Languages](/docs/get-started-with-neon/languages) sections in the documentation provide various connection examples. 

## Reset a branch from parent

Use Neon's **Reset from parent** feature to instantly update a branch with the latest schema and data from its parent. This feature can be an integral part of your CI/CD automation.

You can use the Neon Console, CLI, or API. For more details, see [Reset from parent](/docs/guides/reset-from-parent).

## Restore a branch to its own or another branch's history

There are several restore operations available using Neon's Branch Restore feature:

- Restore a branch to its own history
- Restore a branch to the head of another branch
- Restore a branch to the history of another branch

You can use the Neon Console, CLI, or API. For more details, see [Branch Restore](/docs/guides/branch-restore).

## Delete a branch

Deleting a branch is a permanent action. Deleting a branch also deletes the databases and roles that belong to the branch as well as the compute endpoint associated with the branch. You cannot delete a branch that has child branches. The child branches must be deleted first.

To delete a branch:

1. In the Neon Console, select a project.
2. Select **Branches**.
3. Select a branch from the table.
4. On the branch overview page, click the **Actions** drop-down menu and select **Delete**.
5. On the confirmation dialog, click **Delete**.

## Check the data size

Plan limits define the amount of data you can store.

You can check the logical data size of each branch by viewing the `Data size` value on the **Branches** widget or page in the Neon Console. Alternatively, you can run the following query:

```sql
SELECT pg_size_pretty(sum(pg_database_size(datname)))
FROM pg_database;
```

Data size does not include [history](/docs/reference/glossary#history).

<Admonition type="info">
Neon stores data in its own internal format.
</Admonition>

## Branching with the Neon CLI

The Neon CLI supports creating and managing branches. For instructions, see [Neon CLI commands — branches](/docs/reference/cli-branches). For a Neon CLI branching guide, see [Branching with the Neon CLI](/docs/reference/cli-branches).

## Branching with the Neon API

Branch actions performed in the Neon Console can also be performed using the Neon API. The following examples demonstrate how to create, view, and delete branches using the Neon API. For other branch-related API methods, refer to the [Neon API reference](https://api-docs.neon.tech/reference/getting-started-with-neon-api).

<Admonition type="note">
The API examples that follow may not show all of the user-configurable request body attributes that are available to you. To view all of the attributes for a particular method, refer to the method's request body schema in the [Neon API reference](https://api-docs.neon.tech/reference/getting-started-with-neon-api).
</Admonition>

The `jq` option specified in each example is an optional third-party tool that formats the `JSON` response, making it easier to read. For information about this utility, see [jq](https://stedolan.github.io/jq/).

### Prerequisites

A Neon API request requires an API key. For information about obtaining an API key, see [Create an API key](/docs/manage/api-keys#create-an-api-key). In the examples shown below, `$NEON_API_KEY` is specified in place of an actual API key, which you must provide when making a Neon API request.

### Create a branch with the API

The following Neon API method creates a branch. To view the API documentation for this method, refer to the [Neon API reference](https://api-docs.neon.tech/reference/createprojectbranch).

```http
POST /projects/{project_id}/branches 
```

The API method appears as follows when specified in a cURL command. The `endpoints` attribute creates a compute endpoint, which is required to connect to the branch. A branch can be created with or without a compute endpoint. The `branch` attribute specifies the parent branch.

<Admonition type="note">
This method does not require a request body. Without a request body, the method creates a branch from the project's primary branch, and a compute endpoint is not created.
</Admonition>

```bash
curl 'https://console.neon.tech/api/v2/projects/autumn-disk-484331/branches' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer $NEON_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "endpoints": [
    {
      "type": "read_write"
    }
  ],
  "branch": {
    "parent_id": "br-wispy-dew-591433"
  }
}' | jq
```

- The `project_id` for a Neon project is found on the **Project settings** page in the Neon Console, or you can find it by listing the projects for your Neon account using the Neon API.
- The `parent_id` can be obtained by listing the branches for your project. See [List branches](#list-branches-with-the-api). The `<parent_id>` is the `id` of the branch you are branching from. A branch `id` has a `br-` prefix. You can branch from your Neon project's primary branch or a previously created branch.

The response body includes information about the branch, the branch's compute endpoint, and the `create_branch` and `start_compute` operations that were initiated.

<details>
<summary>Response body</summary>

```json
{
  "branch": {
    "id": "br-dawn-scene-747675",
    "project_id": "autumn-disk-484331",
    "parent_id": "br-wispy-dew-591433",
    "parent_lsn": "0/1AA6408",
    "name": "br-dawn-scene-747675",
    "current_state": "init",
    "pending_state": "ready",
    "created_at": "2022-12-08T19:55:43Z",
    "updated_at": "2022-12-08T19:55:43Z"
  },

  "endpoints": [
    {
      "host": "ep-small-bush-675287.us-east-2.aws.neon.tech",
      "id": "ep-small-bush-675287",
      "project_id": "autumn-disk-484331",
      "branch_id": "br-dawn-scene-747675",
      "autoscaling_limit_min_cu": 1,
      "autoscaling_limit_max_cu": 1,
      "region_id": "aws-us-east-2",
      "type": "read_write",
      "current_state": "init",
      "pending_state": "active",
      "settings": {
        "pg_settings": {}
      },
      "pooler_enabled": false,
      "pooler_mode": "transaction",
      "disabled": false,
      "passwordless_access": true,
      "created_at": "2022-12-08T19:55:43Z",
      "updated_at": "2022-12-08T19:55:43Z",
      "proxy_host": "us-east-2.aws.neon.tech"
    }
  ],
  "operations": [
    {
      "id": "22acbb37-209b-4b90-a39c-8460090e1329",
      "project_id": "autumn-disk-484331",
      "branch_id": "br-dawn-scene-747675",
      "action": "create_branch",
      "status": "running",
      "failures_count": 0,
      "created_at": "2022-12-08T19:55:43Z",
      "updated_at": "2022-12-08T19:55:43Z"
    },
    {
      "id": "055b17e6-ffe3-47ab-b545-cfd7db6fd8b8",
      "project_id": "autumn-disk-484331",
      "branch_id": "br-dawn-scene-747675",
      "endpoint_id": "ep-small-bush-675287",
      "action": "start_compute",
      "status": "scheduling",
      "failures_count": 0,
      "created_at": "2022-12-08T19:55:43Z",
      "updated_at": "2022-12-08T19:55:43Z"
    }
  ]
}
```

</details>

### List branches with the API

The following Neon API method lists branches for the specified project. To view the API documentation for this method, refer to the [Neon API reference](https://api-docs.neon.tech/reference/listprojectbranches).

```http
GET /projects/{project_id}/branches
```

The API method appears as follows when specified in a cURL command:

```bash
curl 'https://console.neon.tech/api/v2/projects/autumn-disk-484331/branches' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer $NEON_API_KEY" | jq
```

The `project_id` for a Neon project is found on the **Project settings** page in the Neon Console, or you can find it by listing the projects for your Neon account using the Neon API.

The response body lists the project's primary branch and any child branches. The name of the primary branch in this example is `main`.

<details>
<summary>Response body</summary>

```json
{
  "branches": [
    {
      "id": "br-dawn-scene-747675",
      "project_id": "autumn-disk-484331",
      "parent_id": "br-wispy-dew-591433",
      "parent_lsn": "0/1AA6408",
      "name": "br-dawn-scene-747675",
      "current_state": "ready",
      "logical_size": 28,
      "created_at": "2022-12-08T19:55:43Z",
      "updated_at": "2022-12-08T19:55:43Z"
    },
    {
      "id": "br-wispy-dew-591433",
      "project_id": "autumn-disk-484331",
      "name": "main",
      "current_state": "ready",
      "logical_size": 28,
      "physical_size": 31,
      "created_at": "2022-12-07T00:45:05Z",
      "updated_at": "2022-12-07T00:45:05Z"
    }
  ]
}
```

</details>

### Delete a branch with the API

The following Neon API method deletes the specified branch. To view the API documentation for this method, refer to the [Neon API reference](https://api-docs.neon.tech/reference/deleteprojectbranch).

```http
DELETE /projects/{project_id}/branches/{branch_id}
```

The API method appears as follows when specified in a cURL command:

```bash
curl -X 'DELETE' \
  'https://console.neon.tech/api/v2/projects/autumn-disk-484331/branches/br-dawn-scene-747675' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer $NEON_API_KEY" | jq
```

- The `project_id` for a Neon project is found on the **Project settings** page in the Neon Console, or you can find it by listing the projects for your Neon account using the Neon API.
- The `branch_id` can be found by listing the branches for your project. The `<branch_id>` is the `id` of a branch. A branch `id` has a `br-` prefix. See [List branches](#list-branches-with-the-api).

The response body shows information about the branch being deleted and the `suspend_compute` and `delete_timeline` operations that were initiated.

<details>
<summary>Response body</summary>

```json
{
  "branch": {
    "id": "br-dawn-scene-747675",
    "project_id": "autumn-disk-484331",
    "parent_id": "br-shy-meadow-151383",
    "parent_lsn": "0/1953508",
    "name": "br-flat-darkness-194551",
    "current_state": "ready",
    "created_at": "2022-12-08T20:01:31Z",
    "updated_at": "2022-12-08T20:01:31Z"
  },
  "operations": [
    {
      "id": "c7ee9bea-c984-41ac-8672-9848714104bc",
      "project_id": "autumn-disk-484331",
      "branch_id": "br-dawn-scene-747675",
      "endpoint_id": "ep-small-bush-675287",
      "action": "suspend_compute",
      "status": "running",
      "failures_count": 0,
      "created_at": "2022-12-08T20:01:31Z",
      "updated_at": "2022-12-08T20:01:31Z"
    },
    {
      "id": "41646f65-c692-4621-9538-32265f74ffe5",
      "project_id": "autumn-disk-484331",
      "branch_id": "br-dawn-scene-747675",
      "action": "delete_timeline",
      "status": "scheduling",
      "failures_count": 0,
      "created_at": "2022-12-06T01:12:10Z",
      "updated_at": "2022-12-06T01:12:10Z"
    }
  ]
}
```

</details>

You can verify that a branch is deleted by listing the branches for your project. See [List branches](#list-branches-with-the-api). The deleted branch should no longer be listed.


<NeedHelp/>
