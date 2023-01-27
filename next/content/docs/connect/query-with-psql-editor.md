---
title: Connect with psql
enableTableOfContents: true
redirectFrom:
  - /docs/quickstart/postgres
  - /docs/integrations/postgres
  - /docs/get-started-with-neon/query-with-psql-editor
---

The following instructions require a working installation of [psql](https://www.postgresql.org/download/). The `psql` client is the native command-line client for PostgreSQL. It provides an interactive session for sending commands to PostgreSQL and running ad-hoc queries. For more information about `psql`, refer to the [psql reference](https://www.postgresql.org/docs/15/app-psql.html), in the _PostgreSQL Documentation_.

<Admonition type="note">
A Neon compute instance runs PostgreSQL, which means that any PostgreSQL application or standard utility such as `psql` is compatible with Neon. You can also use PostgreSQL client libraries and drivers to connect. However, please be aware that some older client libraries and drivers, including older `psql` executables, are built without SNI support and require a workaround. For more information, see [Connecting from older clients](../connectivity-issues).

Neon also provide a passwordless connect feature that uses `psql`. For more information, see [Passwordless connect](../passwordless-connect).
</Admonition>

The easiest way to connect to Neon using `psql` is with a connection string.

You can obtain a connection string from the **Connection Details** widget on the **Neon Dashboard**. Select a branch, a user, and the database you want to connect to. A connection string is constructed for you.

![Connection details widget](/docs/connect/connection_details.png)

From your terminal or command prompt, run the `psql` client with the connection string copied from the Neon **Dashboard**, but be sure to add your password, as shown:

```bash
psql postgres://casey:<password>@ep-square-sea-260584.us-east-2.aws.neon.tech/neondb
```

## Where do I obtain a password?

A password was provided to you when you created your Neon project. If you have misplaced your password, refer to [Reset a password](../../manage/users/#reset-a-password) for password reset instructions.

## What port does Neon use?

Neon uses the default PostgreSQL port, `5432`. If you need to specify the port in your connection string, you can do so as follows:

```bash
psql postgres://casey:<password>@ep-square-sea-260584.us-east-2.aws.neon.tech:5432/neondb
```
  
## Running queries

After establishing a connection, try running the following queries:

```sql
CREATE TABLE my_table AS SELECT now();
SELECT * FROM my_table;
```

The following result set is returned:

```sql
SELECT 1
              now
-------------------------------
 2022-09-11 23:12:15.083565+00
(1 row)
```

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
