---
title: Manage users
enableTableOfContents: true
isDraft: false
---

In Neon, users are PostgreSQL users. Each Neon project is created with a default user that takes its name from your Neon account (the Google, GitHub, or partner account that you registered with). This user owns the default database (`neondb`) that is created in a project's root branch. Each project also has a `web_access` PostgreSQL user, which is a system-managed user used by the Neon [SQL Editor](../../get-started-with-neon/query-with-neon-sql-editor) and for [passwordless connections](../../connect/passwordless-connect). You cannot delete or modify this user.

Additional users can be created in a project's root branch or child branches. There is no limit to the number of users you can create.

Users belong to a branch. If you create a child branch, users from the parent branch are duplicated in the child branch. For example, if user `sally` exists in the parent branch, user `sally` is copied to the child branch when the child branch is created. The only time this does not occur is when you create a branch that only includes data up to a particular point in time. If the user was created in the parent branch after that point in time, that user is not duplicated the child branch.

<Admonition type="note">
You can only create database users in the Neon Console or using the [Neon API](https://neon.tech/api-reference). Creating database users directly in PostgreSQL is not yet supported. In Neon, the terms "user" and "role" are synonymous. The Neon API uses the term "role".
</Admonition>

## Create a user

To create a user:

1. Navigate to the [Neon Console](https://console.neon.tech).
2. Select a project.
3. Select **Settings** > **Users**.
4. Select **New User**.
5. In the user creation dialog, select the branch where you want to create the user and specify a user name. The length of the user name is limited to 63 bytes.
6. Click **Create**.

## Delete a user

You cannot delete a user that owns a database.

To delete a user:

1. Navigate to the [Neon Console](https://console.neon.tech).
2. Select a project.
3. Select **Settings** > **Users**.
4. Select a branch to view users in the branch.
5. Click the delete icon for the user you want to delete.
6. On the delete user dialog, click **Delete**.

## Reset a password

To reset a user's password:

1. Navigate to the [Neon Console](https://console.neon.tech).
2. Select a project.
3. Select **Settings** > **Users**.
4. Select a branch to view users in the branch.
5. Select **Reset password**.
6. On the confirmation dialog, click **Sure, reset**.
7. A reset password dialog is displayed. Copy your password or save the `.env` file to a secure location. After you close the reset password dialog, you will no longer be able to access the newly created password.

## Manage roles with the Neon API

In Neon, the term "user" is synonymous with "role". The Neon API uses the term "role". User actions performed in the Neon Console can also be performed using Neon API role methods. The following examples demonstrate how to create, view, reset passwords for, and delete roles using the Neon API. For other role-related methods, refer to the [Neon API reference](https://neon.tech/api-reference/v2/).

In Neon, roles belong to branches, which means that when you create a role, it is created in a branch. Role-related requests are therefore performed using branch API methods.

<Admonition type="note">
The API examples that follow may not show all of the user-configurable request body attributes that are available to you. To view all of the attributes for a particular method, refer to method's request body schema in the [Neon API reference](https://neon.tech/api-reference/v2/).
</Admonition>

The `jq` option specified in each example is an optional third-party tool that formats the `JSON` response, making it easier to read. For information about this utility, see [jq](https://stedolan.github.io/jq/).

### Prerequisites

A Neon API request requires an API key. For information about obtaining an API key, see [Create an API key](../../manage/api-keys/#create-an-api-key). In the cURL examples shown below, `$NEON_API_KEY` is specified in place of an actual API key, which you must provide when making a Neon API request.

### Create a role with the API

The following Neon API method creates a role. To view the API documentation for this method, refer to the [Neon API reference](https://neon.tech/api-reference/v2/#/Branch/createProjectBranchRole).

```text
POST /projects/{project_id}/branches/{branch_id}/roles
```

The API method appears as follows when specified in a cURL command. The `project_id` and `branch_id` are required parameters, and the role `name` is a required attribute. The length of a role name is limited to 63 bytes.

```bash
curl 'https://console.neon.tech/api/v2/projects/hidden-cell-763301/branches/br-blue-tooth-671580/roles' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $NEON_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
  "role": {
    "name": "sally"
  }
}' | jq
```

Response:

```json
{
  "role": {
    "branch_id": "br-blue-tooth-671580",
    "name": "sally",
    "password": "FLfASd8mbKO9",
    "protected": false,
    "created_at": "2023-01-04T20:35:48Z",
    "updated_at": "2023-01-04T20:35:48Z"
  },
  "operations": [
    {
      "id": "b4fc0c92-8a4f-4a1a-9891-fd36155de853",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "apply_config",
      "status": "running",
      "failures_count": 0,
      "created_at": "2023-01-04T20:35:48Z",
      "updated_at": "2023-01-04T20:35:48Z"
    },
    {
      "id": "74fef831-7537-4d78-bb87-222e0918df54",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "suspend_compute",
      "status": "scheduling",
      "failures_count": 0,
      "created_at": "2023-01-04T20:35:48Z",
      "updated_at": "2023-01-04T20:35:48Z"
    }
  ]
}
```

### List roles with the API

The following Neon API method lists roles for the specified branch. To view the API documentation for this method, refer to the [Neon API reference](https://neon.tech/api-reference/v2/#/Branch/listProjectBranchRoles).

```text
GET /projects/{project_id}/branches/{branch_id}/roles
```

The API method appears as follows when specified in a cURL command. The `project_id` and `branch_id` are required parameters.

```bash
curl 'https://console.neon.tech/api/v2/projects/hidden-cell-763301/branches/br-blue-tooth-671580/roles' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $NEON_API_KEY' | jq
```

Response:

```json
{
  "roles": [
    {
      "branch_id": "br-blue-tooth-671580",
      "name": "casey",
      "protected": false,
      "created_at": "2023-01-04T18:38:23Z",
      "updated_at": "2023-01-04T18:38:23Z"
    },
    {
      "branch_id": "br-blue-tooth-671580",
      "name": "web_access",
      "protected": true,
      "created_at": "2023-01-04T18:38:23Z",
      "updated_at": "2023-01-04T18:38:23Z"
    },
    {
      "branch_id": "br-blue-tooth-671580",
      "name": "sally",
      "protected": false,
      "created_at": "2023-01-04T20:35:48Z",
      "updated_at": "2023-01-04T20:35:48Z"
    }
  ]
}
```

### Reset a password with the API

The following Neon API method resets the password for the specified role. To view the API documentation for this method, refer to the [Neon API reference](https://neon.tech/api-reference/v2/#/Branch/resetProjectBranchRolePassword).

```text
POST /projects/{project_id}/branches/{branch_id}/roles/{role_name}/reset_password
```

The API method appears as follows when specified in a cURL command. The `project_id`, `branch_id`, and `role_name` are required parameters.

```bash
curl -X 'POST' \
  'https://console.neon.tech/api/v2/projects/hidden-cell-763301/branches/br-blue-tooth-671580/roles/sally/reset_password' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $NEON_API_KEY' | jq
```

Response:

```json
{
  "role": {
    "branch_id": "br-blue-tooth-671580",
    "name": "sally",
    "password": "sFA4k3pESzVA",
    "protected": false,
    "created_at": "2023-01-04T20:35:48Z",
    "updated_at": "2023-01-04T20:38:49Z"
  },
  "operations": [
    {
      "id": "d319b791-96c7-48b4-8683-f127839dfb99",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "apply_config",
      "status": "running",
      "failures_count": 0,
      "created_at": "2023-01-04T20:38:49Z",
      "updated_at": "2023-01-04T20:38:49Z"
    },
    {
      "id": "7bd5bb24-92e1-49d1-a3f4-c02e5b6d11e4",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "suspend_compute",
      "status": "scheduling",
      "failures_count": 0,
      "created_at": "2023-01-04T20:38:49Z",
      "updated_at": "2023-01-04T20:38:49Z"
    }
  ]
}
```

### Delete a role with the API

The following Neon API method deletes the specified role. To view the API documentation for this method, refer to the [Neon API reference](https://neon.tech/api-reference/v2/#/Branch/deleteProjectBranchRole).

```text
DELETE /projects/{project_id}/branches/{branch_id}/roles/{role_name}
```

The API method appears as follows when specified in a cURL command. The `project_id`, `branch_id`, and `role_name` are required parameters.

```bash
curl -X 'DELETE' \
  'https://console.neon.tech/api/v2/projects/hidden-cell-763301/branches/br-blue-tooth-671580/roles/sally' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer $NEON_API_KEY' | jq
```

Response:

```json
{
  "role": {
    "branch_id": "br-blue-tooth-671580",
    "name": "sally",
    "protected": false,
    "created_at": "2023-01-04T20:35:48Z",
    "updated_at": "2023-01-04T20:38:49Z"
  },
  "operations": [
    {
      "id": "0789c601-9d97-4124-80df-cd7b332f11ef",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "apply_config",
      "status": "running",
      "failures_count": 0,
      "created_at": "2023-01-04T20:40:27Z",
      "updated_at": "2023-01-04T20:40:27Z"
    },
    {
      "id": "d3b79f02-f369-4ad0-8bf5-ff0daf27dd9a",
      "project_id": "hidden-cell-763301",
      "branch_id": "br-blue-tooth-671580",
      "endpoint_id": "ep-aged-math-668285",
      "action": "suspend_compute",
      "status": "scheduling",
      "failures_count": 0,
      "created_at": "2023-01-04T20:40:27Z",
      "updated_at": "2023-01-04T20:40:27Z"
    }
  ]
}
```

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
