---
title: Connect a Django application to Neon
enableTableOfContents: true
redirectFrom:
  - /docs/integrations/
  - /docs/quickstart/django/
  - /docs/cloud/integrations/django/
---

This guide describes how to create a Neon project and connect to it from a Django application.

To connect to Neon from a Django application:

1. [Create a Neon project](#create-a-neon-project)
2. [Configure Django connection settings](#configure-django-connection-settings)

## Create a Neon project

If you do not have one already, create a Neon project. Save your connection details including your password. They are required when defining connection settings.

To create a Neon project:

1. Navigate to the [Projects](https://console.neon.tech/app/projects) page in the Neon Console.
2. Click **New Project**.
3. Specify a name, a PostgreSQL version, a region, and click **Create Project**.

For additional information about creating projects, see [Set up a project](/docs/get-started-with-neon/setting-up-a-project).

## Configure Django connection settings

Connecting to Neon requires configuring database connection settings in your Django project's `settings.py` file.

In your Django project, navigate to the `DATABASES` section of your `settings.py` file and modify the connection details as shown:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '<dbname>',
        'USER': '<user>',
        'PASSWORD': '<password>',
        'HOST': '<endpoint_hostname>',
        'PORT': '<port>',
    }
}
```

where:

- `<dbname>` is the name of the database. The default Neon database is `neondb`.
- `<user>` is the database user.
- `<password>` is the database user's password, which is provided to you when you create a project.
- `<endpoint_hostname>` is the hostname of the branch endpoint. The endpoint hostname has an `ep-` prefix and appears similar to this: `ep-tight-salad-272396.us-east-2.aws.neon.tech`.
- `<port>` is the PostgreSQL port number. Neon uses the default port, `5432`.

<Admonition type="note">
Neon places computes into an idle state and closes connections after 5 minutes of inactivity (see [Compute lifecycle](https://neon.tech/docs/introduction/compute-lifecycle/)). To avoid connection errors, you can set the Django [CONN_MAX_AGE](https://docs.djangoproject.com/en/4.1/ref/settings/#std-setting-CONN_MAX_AGE) setting to 0 to close database connections at the end of each request so that your application does not attempt to reuse connections that were closed by Neon. From Django 4.1, you can use a higher `CONN_MAX_AGE` setting in combination with the [CONN_HEALTH_CHECKS](https://docs.djangoproject.com/en/4.1/ref/settings/#conn-health-checks) setting to enable connection reuse while preventing errors that might occur due to closed connections. For more information about these configuration options, see [Connection management](https://docs.djangoproject.com/en/4.1/ref/databases/#connection-management), in the _Django documentation_.
</Admonition>

You can find all of the connection details listed above, except for your password,  in the **Connection Details** widget on the Neon **Dashboard**. For more information, see [Connect from any application](../../connect/connect-from-any-app). If you have misplaced your password, see [Reset a password](../../manage/users/#reset-a-password).

For additional information about Django project settings, see [Django Settings: Databases](https://docs.djangoproject.com/en/4.0/ref/settings/#databases), in the Django documentation.

<Admonition type="note">
Running Django tests is currently not supported. The Django test runner must be able to create a database for tests, which is not yet supported by Neon.
</Admonition>

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
