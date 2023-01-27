---
title: Passwordless connect
enableTableOfContents: true
---

Neon's `psql` passwordless connect feature helps you quickly authenticate a connection to Neon without having to provide a password.

The following instructions require a working installation of [psql](https://www.postgresql.org/download/), an interactive terminal for working with PostgreSQL. For information about `psql`, refer to the [psql reference](https://www.postgresql.org/docs/15/app-psql.html), in the _PostgreSQL Documentation_.

To connect using Neon's `psql` passwordless connect feature:

1. In your terminal, run the following command:

   ```bash
   psql -h pg.neon.tech
   ```

   A response similar to the following is displayed:

   ```bash
   NOTICE:  Welcome to Neon!
   Authenticate by visiting:
       https://console.neon.tech/psql_session/6d32af5ef8215b62
   ```

2. In your browser, navigate to the provided link where you are asked to select a Neon project to connect to. If your project has more than one endpoint, you are also asked to select the endpoint. An endpoint is the compute instance associated with a branch. Select the endpoint that is associated with the branch you want to connect to.

   After making your selection, you are directed to check the terminal where information similar to the following is displayed:

   ```bash
   NOTICE:  Connecting to database.
   psql (15.0 (Ubuntu 15.0-1.pgdg22.04+1))
   Type "help" for help.

   casey=>
   ```

   When using passwordless connect, the `psql` prompt shows your local terminal user name. However, you are logged in as the Neon `web_access` user, which you can verify by running this query:

   ```sql
   SELECT current_user;
    current_user
   --------------
    web_access
   ```

   The passwordless connect feature connects to the first database created in the branch. To check the database you are connected to, issue this query:

   ```sql
   SELECT current_database();
    current_database
   ------------------
    neondb
    ```

    Switching databases from the `psql` prompt (using `\c <database_name>`, for example) after you have authenticated restarts the passwordless connect authentication process to authenticate a connection to the new database.

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
