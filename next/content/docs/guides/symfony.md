---
title: Connect from Symfony with Doctrine to Neon
enableTableOfContents: true
redirectFrom:
  - /docs/quickstart/symfony
  - /docs/integrations/symfony
---

Symfony is a free and open-source PHP web application framework. Symfony uses the Doctrine library for database access. Connecting to Neon from Symfony with Doctrine is the same as connecting to a standalone PostgreSQL installation from Symfony with Doctrine. Only the connection details differ.

To connect to Neon from Symfony with Doctrine:

1. [Create a Neon Project](#create-a-neon-project)
2. [Configure the connection](#configure-the-connection)

## Create a Neon project

If you do not have one already, create a Neon project. Save your connection details including your password. They are required when defining connection settings.

1. Navigate to the [Projects](https://console.neon.tech/app/projects) page in the Neon Console.
2. Click **New Project**.
3. Specify a name, a PostgreSQL version, a region, and click **Create Project**.

## Configure the connection

In your `.env` file, set the `DATABASE_URL` to the Neon project connection string that you copied in the previous step.

```shell
DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>:5432/<dbname>?charset=utf8"
```

where:

- `<user>` is the database user.
- `<password>` is the database user's password, which is provided to you when you create a Neon project.
- `<endpoint_hostname>` the hostname of the branch endpoint. The endpoint hostname has an `ep-` prefix and appears similar to this: `ep-tight-salad-272396.us-east-2.aws.neon.tech`.
- `<dbname>` is the name of the database. The default Neon database is `neondb`

You can find all of the connection details listed above, except for your password,  in the **Connection Details** widget on the Neon **Dashboard**. For more information, see [Connect from any application](../../connect/connect-from-any-app). If you have misplaced your password, see [Reset a password](../../manage/users/#reset-a-password).

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
