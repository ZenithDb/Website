---
title: Connect a Java application to Neon
enableTableOfContents: true
redirectFrom:
  - /docs/quickstart/java
  - /docs/integrations/java
---

This guide describes how to create a Neon project and connect to it with Java Database Connectivity (JDBC) or from a Spring Data project that uses JDBC.

The JDBC API is a Java API for relational databases. PostgreSQL has a well-supported open-source JDBC driver which can be used to access Neon. All popular Java frameworks use JDBC internally. To connect to Neon, you are only required to provide a connection URL.

For additional information about JDBC, refer to the standard JDBC API documentation and [PostgreSQL JDBC Driver documentation](https://jdbc.postgresql.org/documentation).

To connect to Neon with JDBC or from a Spring Data project:

1. [Create a Neon project](#create-a-neon-project)
2. [Connect with JDBC](#connect-with-jdbc) or [Connect from Spring Data](#connect-from-spring-data)

## Create a Neon project

If you do not have one already, create a Neon project. Save your connection details including your password. They are required when defining connection settings.

To create a Neon project:

1. Navigate to the [Projects](https://console.neon.tech/app/projects) page in the Neon Console.
2. Click **New Project**.
3. Specify a name, a PostgreSQL version, a region, and click **Create Project**.

For additional information about creating projects, see [Set up a project](/docs/get-started-with-neon/setting-up-a-project).

## Connect with JDBC

For a JDBC connection URL, replace the variables in the following URL string with your Neon project ID, database name, user, and password:

```java
jdbc:postgresql://<endpoint_hostname>/<dbname>?user=<user>&password=<password>
```

where:

- `<endpoint_hostname>` the hostname of the branch endpoint. The endpoint hostname has an `ep-` prefix and appears similar to this: `ep-tight-salad-272396.us-east-2.aws.neon.tech`.
- `<dbname>` is the name of the database. The default Neon database is `neondb`.
- `<user>` is the database user.
- `<password>` is the database user's password, which is provided to you when you create a project.

You can find all of the connection details listed above, except for your password,  in the **Connection Details** widget on the Neon **Dashboard**. For more information, see [Connect from any application](../../connect/connect-from-any-app). If you have misplaced your password, see [Reset a password](../../manage/users/#reset-a-password).

## Connect from Spring Data

Spring Data relies on JDBC and PostgreSQL drivers to connect to PostgreSQL databases, such as Neon. If you are starting your project with Spring Initializr or connecting from an existing Spring Data project, ensure that the `PostgreSQL database driver` dependency is installed.

Connecting from a Spring Data project requires specifying the datasource URL in your `application.properties` file, as shown in the following example:

```java
spring.datasource.url=jdbc:postgresql://<endpoint_hostname>/<dbname>?user=<user>&password=<password>
```

Refer to the [Connect with JDBC](#connect-with-jdbc) section above for information about obtaining connection details for your Neon database.

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
