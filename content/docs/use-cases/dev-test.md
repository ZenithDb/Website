---
title: Dev/Test Environments on Neon
subtitle: Speed up time-to-launch by running your non-prod workflows on Neon
enableTableOfContents: true
updatedOn: '2024-12-12T19:49:26.798Z'
---

What sets Neon apart from other Postgres providers, beyond its true serverless nature, is its exceptional developer experience. Teams often experience a boost in developer velocity when switching to Neon. In Neon, it takes less time to create and synchronize environments, run tests, and tedious database tasks are suddenly automated—all of which accelerate software lifecycles.

However, not every team is ready for a full database migration. Moving a production database to a new vendor is a significant project that requires careful planning—but even if teams aren't ready to migrate their production databases, they can still get more efficiency by moving their non-production environments to Neon. As a cherry on top, this also significantly saves non-production costs (up to 80%).

In this guide, we’ll walk you through the steps needed to set up Neon for development and testing, including how to move data from your current Postgres provider to Neon, keep it in sync, and set up ephemeral environments as Neon branches for optimal cost-efficiency and productivity.

## Benefits of running Dev/Test on Neon

- **New ephemeral environments are provisioned instantly, with an updated copy of the testing dataset.**
  In Neon, each ephemeral dev/test environment is a database branch. Database branches in Neon include a full copy of the dataset, and they’re created instantly. Ephemeral environments are available for immediate use, and they can be programmatically created and deleted via CI/CD without delays. When there’s an update in the testing dataset, ephemeral environments can be reset in one click.

- **You only pay for storage once, across all your environments—and when environments are not being used, you aren’t billed for compute.**
  Ephemeral environments in Neon are also extremely affordable. Neon branches autosuspend when they’re not being used, saving compute costs in idle hours. And since all branches within a Neon project share the same storage, storage is only billed once across all dev/test environments, avoiding the costs and work of duplicating storage for each setup.

## Methodology

Most teams running dev/test workloads on Neon while keeping production on another Postgres platform implement a workflow similar to this:

1. **Set up a single Neon Project for dev/test ephemeral environments**

   Teams start by creating a single Neon project to host multiple dev/test environments. In Neon, a project is the logical equivalent of an “instance.” Thanks to Neon branching, many non-production instances in RDS or Aurora can be replaced with a single Neon project, as we'll see next.

2. **Create a Neon Twin**

   Next, teams create a [Neon Twin](https://neon.tech/blog/optimizing-dev-environments-in-aws-rds-with-neon-postgres-part-ii-using-github-actions-to-mirror-rds-in-neon) —a copy of their production or staging dataset from the other platform (or a subset of this dataset) that remains automatically synchronized. There are various methods to keep the dataset in sync, which we’ll cover in this guide, but the process generally looks like this: 1. The testing dataset is loaded into the main branch within the Neon project. 2. Automation is set up so that data in the main branch is refreshed periodically, such as nightly.

   This main branch serves as the primary source for all dev/test environments, and it's the only location that needs to be updated with new data or schema changes, as we’ll see later.

3. **Set up ephemeral environments as child branches**

   Once the Neon Twin is set up within the main branch, teams can instantly create ephemeral environments by deriving child branches from this main branch. These branches are fully isolated and provide teams with a complete copy of the testing dataset immediately.

   After the main branch is refreshed (e.g., nightly), all environments can be synced in one click. Neon includes a reset from parent feature, which instantly resets all child branches with data from the main branch. This allows teams to get the latest testing data (including schema changes) without needing to reload testing datasets in every single environment.

   Teams configure their workflows so that after development or testing is complete (e.g., a PR is closed), child branches are deleted automatically via the API. But since Neon's autosuspend automatically pauses these environments when unused, teams don’t have to worry too much about inactive branches.

## Step 1: Set up a Neon project for Dev/Test

1. [Sign up to Neon](https://console.neon.tech/signup) if you haven’t already.
2. Provide a descriptive name for your project, such as `Dev/Test Environments`
3. Select your desired Postgres version, cloud service provider, and region.
4. Click Create Project
5. Once inside the Neon console:
   1. By default, Neon creates a branch named `main`
   2. To distinguish it as your primary development branch, rename it to `main_dev` or similar by navigating to the Branches screen, clicking on the options menu (three dots), and selecting Rename

## Step 2: Create a Neon Twin

### Using dump/restore with GitHub Actions

A Neon Twin is a synchronized copy of your production or staging database within your main_dev branch, which will serve as the source for your development and testing environments. One of the methods to build a Neon Twin is automating nightly data synchronization using `pg_dump`, `pg_restore`, and GitHub Actions. [Detailed instructions can be found in this blog post series](https://neon.tech/blog/optimizing-dev-environments-in-aws-rds-with-neon-postgres-part-ii-using-github-actions-to-mirror-rds-in-neon).

- **Create the GitHub Actions Workflow.**

Create a new directory at the root of your project named `.github`. Within this directory create another directory named `workflows`. Within this directory create a new file named `create-neon-twin.yml`. E.g

```
.github
  |-- workflows
      |-- create-neon-twin.yml
```

Add the following code to `create-neon-twin.yml`.

```yml
name: Create Neon Twin

on:
  schedule:
    - cron: '0 0 * * *' # Runs at midnight ET (us-east-1)
  workflow_dispatch:

env:
  PROD_DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }} # Production or primary database
  DEV_DATABASE_URL: ${{ secrets.DEV_DATABASE_URL }} # Development database
  PG_VERSION: '17'

jobs:
  dump-and-restore:
    runs-on: ubuntu-latest

    steps:
      - name: Install PostgreSQL
        run: |
          sudo apt update
          yes '' | sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
          sudo apt install -y postgresql-${{ env.PG_VERSION }}

      - name: Dump from Prod and Restore to Neon
        run: |
          /usr/lib/postgresql/${{ env.PG_VERSION }}/bin/pg_dump "${{ env.PROD_DATABASE_URL }}" -Fc -f "${{ github.workspace }}/prod-dump-file.dump"
          /usr/lib/postgresql/${{ env.PG_VERSION }}/bin/pg_restore -d "${{ env.DEV_DATABASE_URL }}" --clean --no-owner --no-acl --if-exists "${{ github.workspace }}/prod-dump-file.dump"
```

- **Add Environment variables to GitHub**

The GitHub Action references two environment variables which need to be stored as secrets in your GitHub repository. Navigate to **Settings** > **Secrets and variables** > **Actions** and add the following as repository variables.

- `PROD_DATABASE_URL`. This is the PostgreSQL connection string for your production database.
- `DEV_DATABASE_URL`. This is the PostgreSQL connection string for your Neon development database, or Twin.

- **Workflow configuration**

There are a number of configuration options you might want to change.

- `cron:` The [POSIX cron syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07) determines when the Action will run. You can modify the time and how regular the dump/restore occur by changing the numbers.

- `workflow_dispatch:` This will allow you to trigger the workflow manually from within the GitHub UI. It can be removed if not required.

- `PG_VERSION:` This is the version of PostgreSQL to install in the Action environment. You should install a version that is compatible with both your Production and Development database.

Once ths workflow has been committed to your repository, it will continue to run on the schedule defined by the cron syntax.

### Using AWS DMS

If your source database lives in Amazon RDS or Aurora, you can also use AWS Database Migration Service (DMS) to build a Neon Twin. AWS DMS is a service that allows you to migrate data between platforms.

For instructions on setting up AWS DMS with Neon, [refer to this guide](https://neon.tech/docs/import/migrate-aws-dms).

### Using logical replication

If you’d like to ensure a more continuous and real-time synchronization between your source dataset and Neon, you could implement logical replication in your Neon Twin. This method will replicate all data changes as they occur; however, you must remember that logical replication won’t reflect changes in schema between your source database and the Neon Twin. You’ll still have to implement a method that makes sure schema stays in sync.

For more instructions on logical replication, [refer to this guide](https://neon.tech/docs/guides/logical-replication-concepts).

## Step 3: Set up ephemeral environments as child branches

With your Neon Twin setup, you’re ready to set up isolated development and testing environments within your Neon project by creating database branches off the primary branch, main_dev. This process is often automated via the Neon API.

In the Neon Console, navigate to the Branches tab within your project to manage and view existing branches.

- **Creating child branches manually**
  - To create a new environment manually, select "New Branch"
  - You can name each branch to reflect its purpose, such as `feature_xyz` for branches related to specific feature development or `test_xyz` for testing environments
  - Select "main_dev" as the parent branch so that the new branch inherits the latest data from the primary dataset.
- **Automating branch creation via Neon API and GitHub Actions**
  - Most likely, you’ll want to use the Neon API to automate branch creation as part of your CI/CD pipeline.
  - For example: Create a new branch in Neon when a new PR is opened in GitHub. This can be done using GitHub Actions to trigger the API call when a pull request is opened. [Naviagate to our documentation on the GitHub Integration](https://neon.tech/docs/guides/neon-github-integration).
  - Similarly, you automate the deletion of branches when a pull request is closed or merged, which removes unused environments and keeps your project clean.
- **Synchronize branches with parent updates**
  - Neon's [Reset from Parent](https://neon.tech/docs/guides/reset-from-parent) feature allows for easy syncing of each child branch with the latest data from `main`.
  - To do this manually, select the child branch in the Branches section and choose "Reset from Parent" to bring it up-to-date with the latest state of main_dev.
  - Most likely, you might want to schedule this as a nightly task in your CI/CD pipeline to reset all child branches, ensuring all environments are consistently aligned with the main dataset after updates, such as schema changes.

<CTA title="Let's Connect" description="We’re happy to give you a hand with any technical questions about how to set this up. We can also discuss pricing options, annual contracts, and migration assistance." buttonText="Contact us" buttonUrl="/contact-sales" />
