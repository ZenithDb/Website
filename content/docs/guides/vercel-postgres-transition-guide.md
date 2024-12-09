---
title: Vercel Postgres Transition Guide
subtitle: Everything you need to know about transitioning from Vercel Postgres to Neon
enableTableOfContents: true
isDraft: false
updatedOn: '2024-12-01T21:48:07.693Z'
---

<Admonition type="warning">
The Vercel Postgres to Neon transition has not started yet. Please be advised that until the transition starts, the content in this guide  is subject to change.
</Admonition>

In Q4, 2024, Vercel is transitioning its Vercel Postgres stores to a [Vercel Native Integration for Neon Postgres](/docs/guides/vercel-native-integration).

In case you missed the announcements, you can read them here:

- [Vercel announcement](https://vercel.com/blog/introducing-the-vercel-marketplace)
- [Neon announcement](https://neon.tech/blog/leveling-up-our-partnership-with-vercel)

**No action is needed on your part**. The transition will be performed automatically without disruption to your applications.

We know moving to a new platform may bring up questions, so we’ve prepared this guide to answer as many as possible.

## About the transition

### Why is this transition happening?

Last year, Vercel introduced Vercel Postgres (powered by Neon) as part of their platform. Now, in order to provide a wider variety of solutions and integrations for its customers, Vercel is shifting to a different model. Instead of a Vercel-managed solution, Vercel is launching the [Vercel Marketplace](https://vercel.com/marketplace), where you can easily integrate first-party storage services, such as Neon Postgres, into your Vercel projects.

By transitioning to the Vercel Native Integration for Neon Postgres, you will gain access to Neon's full feature set and usage plans, providing you with a more comprehensive database service. Vercel's new marketplace model makes this possible.

### When will the transition happen?

The transition will begin in Q4, 2024. It will be a phased migration, with Vercel Postgres stores automatically migrated over to the [Vercel Native Integration for Neon Postgres](/docs/guides/vercel-native-integration) without any downtime. Stay tuned for updates from Vercel about when this will happen for your account.

Until then, you can continue using Vercel Postgres as usual.

### Do you need to do anything before the transition?

No, the transition to Neon will be fully managed by Vercel. There is nothing you need to do in preparation for it.

### What changes will I see after the transition?

After the migration, you will be able to access and manage your existing Databases from the **Storage** tab in the Vercel Dashboard and the Neon Console without requiring new login credentials. The **Storage** tab will include an Open in Neon button, which will open the corresponding **Project** in Neon.

<Admonition type="note" title="A Database in Vercel is a Project in Neon">
Please note that when coming to Neon from Vercel, there will be a small difference in terminology to get used to: **A "Database" in Vercel is a "Project" in Neon**.
</Admonition>

### Can I still create new Databases during the transition?

Yes, you can continue creating new Databases using Vercel Postgres until the transition starts in Q4, 2024. After that, new Databases will be created via the native Neon Postgres integration, from the **Storage** tab on the Vercel Dashboard.

### What happens to Databases created before the transition?

Any Databases created using Vercel Postgres before the transition will be automatically migrated to Neon Postgres as part of the transition.

## Billing questions

### How will billing be affected?

Billing for the [Vercel Native Integration for Neon Postgres](/docs/guides/vercel-native-integration) will be managed in Vercel. You won’t need to manage separate billing for Neon — everything will stay unified under your Vercel account.

### Will you be automatically transitioned to a particular Neon plan?

- **Vercel Hobby Plan** Databases will be migrated to the Neon Free Plan, which gives you more compute hours, data transfer, Databases (a.k.a. "Projects" in Neon), and storage than you had on the Vercel Hobby Plan. See [Vercel Hobby Plan vs Neon Free Plan](#vercel-hobby-plan-vs-neon-free-plan) for a comparison.

- **Vercel Pro Plan** prices and limits will not change. This ensures no pricing surprises when transitioning to Neon. You can stay on your Vercel Pro Plan or you can switch to a Neon plan. For a Vercel-Neon plan comparison, see [Vercel Pro Plan vs Neon Launch Plan](#vercel-pro-plan-vs-neon-launch-plan).

### How do Vercel Postgres plans compare to Neon plans?

Vercel Postgres was available with Vercel's Hobby and Pro plans. Let's take a look at these plans and compare to Neon:

#### Vercel Hobby Plan vs Neon Free Plan

The Vercel Hobby plan is free and aimed at developers with personal projects, and small-scale applications. In Neon, the equivalent plan is our [Free Plan](/docs/introduction/plans#free-plan). Here are some of the differences to be aware of:

| Resource      | Vercel Hobby (Included) | Neon Free Plan (Included) |
| :------------ | :---------------------- | :------------------------ |
| Compute Time  | 60 Hours                | 191.9 Hours               |
| Data Transfer | N/A                     | Up to 5 GBs per month     |
| Database      | First Database          | 10                        |
| Storage       | First 256 MB Included   | Up to 512 MB              |

Additional use (called "Extra usage" in Neon) for a fee is not available on the Vercel Hobby Plan or the Neon Free Plan.

#### Vercel Pro Plan vs Neon Launch Plan

The Vercel Pro plan is is tailored for professional developers, freelancers, and small businesses. In Neon, the equivalent plan is our [Launch Plan](/docs/introduction/plans#launch-plan) at $19 per month. The following table provides a comparison of what's included:

| Resource      | Vercel Pro (Included) | Neon Launch Plan (Included)      |
| :------------ | :-------------------- | :------------------------------- |
| Compute Time  | 100 Hours             | 300 Hours                        |
| Data Transfer | 256 MB                | Reasonable usage (no hard limit) |
| Database      | First Database        | 1000                             |
| Storage       | First 256 MB          | Up to 10 GB                      |

Both the Vercel Pro and Neon Launch plans offer additional use (called "Extra usage" in Neon) for a fee, as outlined below. In Neon, additional units of compute and storage cost more, but you get more compute and storage with your plan's monthly fee, and Neon does not charge for data transfer, additional databases, or written data.

| Resource      | Vercel Pro (Additional) | Neon Launch Plan (Extra usage)                |
| :------------ | :---------------------- | :-------------------------------------------- |
| Compute Time  | $0.10 per compute hour  | $0.16 per compute hour                        |
| Data Transfer | $0.10 - 1 GB            | No additional cost                            |
| Database      | $1.00 - Per 1 Database  | No additional cost for the first 100          |
| Storage       | $0.12 - 1 GB            | First 10 GB included; afterwards $1.75 per-GB |

Neon also offers [Scale](/docs/introduction/plans#scale-plan) and [Business](/docs/introduction/plans#business-plan) plans, which include more storage, compute hours, projects, and features. Be sure to look at these plans if the Launch plan does not meet your requirements.

### What about Enterprise customers?

Neon is working with the Vercel team to provide joint frontend cloud services for Enterprise customers. This will simplify the adoption and procurement process through the Vercel Marketplace. Stay tuned for more information. If you want to speak to us about an Enterprise-level Neon plan, you can [get in touch with our sales team](/contact-sales).

## Platform questions

### What Neon features will I have access to after the migration?

Once the transition to Neon Postgres is complete, you will gain access to a variety of advanced Neon features that were not available in Vercel Postgres, including:

- [The Neon Console](https://console.neon.tech/app/projects) &#8212; manage all your projects and databases from a dedicated console
- [Database branching](/docs/guides/branching-intro) &#8212; branch your database like code for development, testing, and database workflows
- [Autoscaling](/docs/introduction/autoscaling) &#8212; scale your database automatically for performance and cost savings
- [Autosuspend](/docs/introduction/auto-suspend) &#8212; configure scale-to-zero behavior
- [Branch Restore](/docs/guides/branch-restore) &#8212; instant point-in-time recovery
- [Neon API](https://api-docs.neon.tech/reference/getting-started-with-neon-api) &#8212; Neon projects, roles, databases and more via API calls
- [Neon CLI](/docs/reference/neon-cli) &#8212; manage your Neon projects, roles, databases and more from the command-line
- [IP Allow](/docs/introduction/ip-allow) &#8212; limit access to the IP addresses you trust
- [Organization accounts](/docs/manage/organizations) &#8212; manage projects and teams with a Neon org account
- [Monitoring](/docs/introduction/monitoring-page) &#8212; monitor your database from the Neon Console
- [Protected branches](/docs/guides/protected-branches) &#8212; protect your production data
- [Schema Diff](/docs/guides/schema-diff) &#8212; compare schema changes between database branches
- [Time Travel](/docs/guides/time-travel-assist) &#8212; query your data in the past
- [Read Replicas](/docs/introduction/read-replicas) &#8212; offload read work for scale or ad hoc queries
- [Logical Replication](/docs/guides/logical-replication-guide) &#8212; replicate data to and from Neon
- [The Neon GitHub Integration](/docs/guides/neon-github-integration) &#8212; connect your Neon project to your repo and build GitHub Actions workflows

### What Vercel Postgres limitations are lifted by the transitions to Neon?

The transition to Neon also unblocks several limitations:

- **CLI support**. The [Vercel CLI](https://vercel.com/docs/cli) did not support Vercel Postgres. With Neon Postgres, you have access to a fully featured [Neon CLI](/docs/reference/neon-cli).
- **Terraform support**. The [Vercel Terraform Provider](https://vercel.com/guides/integrating-terraform-with-vercel) did not support Vercel Postgres. With Neon Postgres, you have access to [community-maintained and Neon-sponsored Terraform providers](/docs/reference/terraform).
- **Larger computes**. On Vercel, databases on Hobby plans are limited to 0.25 logical CPUs. The Neon Free plan supports computes up to 2 vCPUs and [Autoscaling](/docs/introduction/autoscaling).
- **Postgres roles**. On Vercel, you were limited to a single Postgres database access role. There is no such database access role limit on Neon. You can create additional Postgres roles as required.

### What Postgres versions are supported?

Vercel Postgres supported Postgres 15. With Neon, you'll be able to create databases with Postgres 14, 15, 16, or 17. You can find Neon's Postgres version support policy [here](/docs/postgresql/postgres-version-policy).

### Are the supported regions the same for both services?

Yes, all regions supported by Vercel Postgres are also supported by Neon Postgres.

### Will the Vercel Postgres SDK continue to work?

Yes, the [Vercel Postgres SDK](https://vercel.com/docs/storage/vercel-postgres/sdk) will continue to work. However, you can expect Vercel to deprecated their SDK at some point after the transition. The good news is that **the Vercel SDK is a wrapper around the the Neon serverless driver**, so it's very compatible. There's no need to switch to the Neon serverless driver right away, but if you would like to get a start on that, please refer to our [Vercel SDK to Neon serverless driver migration guide](https://neon.tech/guides/vercel-sdk-migration) for instructions.

### Is Neon compatible with the same ORMs as Vercel Postgres?

Yes, Neon supports any ORM that is compatible with Vercel Postgres, including:

- Drizzle
- Keysley
- Prisma

### What will happen to Vercel Postgres templates?

[Vercel Postgres templates](https://vercel.com/templates/vercel-postgres) will remain available. The [environment variables](/docs/guides/vercel-native-integration#environment-variables-set-by-the-integration) used by these templates will continue to be supported by Neon. You will still be able to use all the templates after the transition.

## More questions?

There are likely many more questions we haven't thought of. To get you those answers as quickly as possible, we've set up discord channel [#vercel-postgres-transition](https://discord.com/channels/1176467419317940276/1306544611157868544), which we will be monitoring leading up to and through the transition period.
