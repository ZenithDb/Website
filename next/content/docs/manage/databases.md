---
title: Manage databases
enableTableOfContents: true
isDraft: false
---

A database is a container for SQL objects such as schemas, tables, views, functions, and indexes. In the Neon object hierarchy, a database exists within a branch of a project. There is no limit on the number of databases you can create.

A Neon project's root branch is created with a default database called `neondb`, which is owned by your project's default user (see [Users](../users) for more information). You can create your own databases in a project's root branch or in a child branch.

All databases in Neon are created with a `public` schema. SQL objects are created in the `public` schema by default. For more information about the `public` schema, refer to [The Public schema](https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PUBLIC), in the _PostgreSQL documentation_.

Databases belong to branch. If you create a child branch, databases from the parent branch are copied to the child branch. For example, if database `mydb` exists in the parent branch, database `mydb` is copied to the child branch. The only time this does not occur is when you create a branch that only includes data up to a particular point in time. If a database was created in the parent branch after that point in time, that database is not copied to the child branch.

## Create a database

To create a database:

1. Navigate to the [Neon Console](https://console.neon.tech).
2. Select **Settings** > **Databases**.
3. Click **New Database**.
4. Select the branch where you want to create the database, enter a database name, and select a database owner.
5. Click **Create**.

## View databases

To view databases:

1. Navigate to the [Neon Console](https://console.neon.tech).
2. Select **Settings** > **Databases**
3. Select a branch to view the databases in the branch.

## Delete a database

Deleting a database is a permanent action. All database objects belonging to the database such as schemas, tables, and roles are also deleted.

To delete a database:

1. Navigate to the [Neon Console](https://console.neon.tech).
2. Select **Settings** > **Databases**.
3. Select a branch to view the databases in the branch.
4. For the database you want to delete, click the delete icon.
5. In the confirmation dialog, click **Delete**.

## Manage databases with the Neon API

Database actions performed in the Neon Console can also be also performed using the Neon API. The following examples demonstrate how to create, view, update, and delete databases using the Neon API. For other database-related methods, refer to the [Neon API reference](https://neon.tech/api-reference/v2/).

In Neon, databases belong to branches, which means that when you create a database, it is created in a branch.  Database-related requests are therefore performed using branch API methods.

<Admonition type="note">
The API examples that follow may not show all of the user-configurable request body attributes that are available to you. To view all of the attributes for a particular method, refer to method's request body schema in the [Neon API reference](https://neon.tech/api-reference/v2/).
</Admonition>

The `jq` option specified in each example is an optional third-party tool that formats the `JSON` response, making it easier to read. For information about this utility, see [jq](https://stedolan.github.io/jq/).

### Prerequisites

A Neon API request requires an API key. For information about obtaining an API key, see [Create an API key](../../manage/api-keys/#create-an-api-key). In the cURL examples shown below, `$NEON_API_KEY` is specified in place of an actual API key, which you must provide when making a Neon API request.

### Create a database with the API

The following Neon API method creates a database. To view the API documentation for this method, refer to the [Neon API reference](https://neon.tech/api-reference/v2/#/Branch/createProjectBranchDatabase).

```text
POST /projects/{project_id}/branches/{branch_id}/databases
```

The API method appears as follows when specified in a cURL command. The `project_id` and `branch_id` are required parameters, and a database `name` and `owner` are required attributes.

```bash
curl 'https://console.neon.tech/api/v2/projects/hidden-cell-763301/branches/br-blue-tooth-671580/databases' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $NEON_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
  "database": {
    "name": "mydb",
    "owner_name": "casey"
  }
}' | jq
```

Response:

```json
{
  "database": {
    "id": 1140822,
    "branch_id": "br-blue-tooth-671580",
    "name": "mydb",
    "owner_name": "casey",
    "created_at": "2023-01-04T21:17:17Z",
    "updated_at": "2023-01-04T21:17:17Z"
  },
  "operations": [
    {
      "id": "6fc5969a-c445-4bc1-9f94-4dfbab4ad293",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "apply_config",
      "status": "running",
      "failures_count": 0,
      "created_at": "2023-01-04T21:17:17Z",
      "updated_at": "2023-01-04T21:17:17Z"
    },
    {
      "id": "a0e78873-399a-45e4-9728-dde0b36f0941",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "suspend_compute",
      "status": "scheduling",
      "failures_count": 0,
      "created_at": "2023-01-04T21:17:17Z",
      "updated_at": "2023-01-04T21:17:17Z"
    }
  ]
}
```

### List databases with the API

The following Neon API method lists databases for the specified branch. To view the API documentation for this method, refer to the [Neon API reference](https://neon.tech/api-reference/v2/#/Branch/listProjectBranchDatabases).

```text
GET /projects/{project_id}/branches/{branch_id}/databases
```

The API method appears as follows when specified in a cURL command. The `project_id` and `branch_id` are required parameters.

```bash
curl 'https://console.neon.tech/api/v2/projects/hidden-cell-763301/branches/br-blue-tooth-671580/databases' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $NEON_API_KEY' | jq
```

Response:

```json
{
  "databases": [
    {
      "id": 1139149,
      "branch_id": "br-blue-tooth-671580",
      "name": "neondb",
      "owner_name": "casey",
      "created_at": "2023-01-04T18:38:23Z",
      "updated_at": "2023-01-04T18:38:23Z"
    },
    {
      "id": 1140822,
      "branch_id": "br-blue-tooth-671580",
      "name": "mydb",
      "owner_name": "casey",
      "created_at": "2023-01-04T21:17:17Z",
      "updated_at": "2023-01-04T21:17:17Z"
    }
  ]
}
```

### Update a database with the API

The following Neon API method updates the specified database. To view the API documentation for this method, refer to the [Neon API reference](https://neon.tech/api-reference/v2/#/Branch/updateProjectBranchDatabase).

```text
PATCH /projects/{project_id}/branches/{branch_id}/databases/{database_name}
```

The API method appears as follows when specified in a cURL command. The `project_id` and `branch_id` are required parameters. This example updates the database `name` value to `database1`.

```bash
curl 'https://console.neon.tech/api/v2/projects/hidden-cell-763301/branches/br-blue-tooth-671580/databases/mydb' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $NEON_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
  "database": {
    "name": "database1"
  }
}' | jq
```

Response:

```json
{
  "database": {
    "id": 1140822,
    "branch_id": "br-blue-tooth-671580",
    "name": "database1",
    "owner_name": "casey",
    "created_at": "2023-01-04T21:17:17Z",
    "updated_at": "2023-01-04T21:17:17Z"
  },
  "operations": [
    {
      "id": "7a3e05b0-385e-490c-a6a3-60bbb8906f57",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "apply_config",
      "status": "running",
      "failures_count": 0,
      "created_at": "2023-01-04T21:19:35Z",
      "updated_at": "2023-01-04T21:19:35Z"
    },
    {
      "id": "f2805f7f-4d83-4c58-b3d1-dc678e699106",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "suspend_compute",
      "status": "scheduling",
      "failures_count": 0,
      "created_at": "2023-01-04T21:19:35Z",
      "updated_at": "2023-01-04T21:19:35Z"
    }
  ]
}
```

### Delete a database with the API

The following Neon API method deletes the specified database. To view the API documentation for this method, refer to the [Neon API reference](https://neon.tech/api-reference/v2/#/Branch/deleteProjectBranchDatabase).

```text
DELETE /projects/{project_id}/branches/{branch_id}/databases/{database_name}
```

The API method appears as follows when specified in a cURL command. The `project_id`, `branch_id`, and `database_name` are required parameters.

```bash
curl -X 'DELETE' \
  'https://console.neon.tech/api/v2/projects/hidden-cell-763301/branches/br-blue-tooth-671580/databases/database1' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $NEON_API_KEY' | jq
```

Response:

```json
{
  "database": {
    "id": 1140822,
    "branch_id": "br-blue-tooth-671580",
    "name": "database1",
    "owner_name": "casey",
    "created_at": "2023-01-04T21:17:17Z",
    "updated_at": "2023-01-04T21:17:17Z"
  },
  "operations": [
    {
      "id": "1a52afa4-f21b-4ed0-a97f-f7abda9ab49f",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "apply_config",
      "status": "running",
      "failures_count": 0,
      "created_at": "2023-01-04T21:20:24Z",
      "updated_at": "2023-01-04T21:20:24Z"
    },
    {
      "id": "f3fe437e-259a-4442-a750-3613d89dbbff",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "suspend_compute",
      "status": "scheduling",
      "failures_count": 0,
      "created_at": "2023-01-04T21:20:24Z",
      "updated_at": "2023-01-04T21:20:24Z"
    }
  ]
}
```

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
