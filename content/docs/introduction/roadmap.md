---
title: Roadmap
enableTableOfContents: true
tag: updated
redirectFrom:
  - /docs/cloud/roadmap
  - /docs/conceptual-guides/roadmap
  - /docs/reference/roadmap
updatedOn: '2024-10-12T11:16:13.591Z'
---

Our development teams are focused on helping you ship faster with Postgres. This roadmap describes committed features that we're working on right now, plus a peek at some of the upcoming features we'll be taking on next.

## What we've just launched

- **ISO27110 & ISO27701 compliance**: These new certifications add to our growing list of compliance achievements. For more about Neon's compliance milestones, see [Compliance](/docs/security/compliance).
- **Increased limits for Neon projects**: We increased the number of projects included in all our paid plans: Launch (100 projects), Scale (1000 projects), and Business (5000 projects). More projects supports use cases such as database-per-tenant and AI agents. [Read the announcement](https://neon.tech/blog/thousands-of-neon-projects-now-included-in-your-pricing-plan).
- **A new Postgres toolkit for AI agents and test environments**: We recently announced an experimental release of the [@neondatabase/toolkit](https://github.com/neondatabase/toolkit). This toolkit lets you spin up a Postgres database in seconds and run SQL queries. It includes both the [Neon API Client](https://www.npmjs.com/package/@neondatabase/api-client) and the [Neon Serverless Driver](https://github.com/neondatabase/serverless), making it an excellent choice for AI agents that need to quickly set up an SQL database, or for test environments where manually deploying a new database isn't practical. To learn more, see [Why we built @neondatabase/toolkit](https://neon.tech/blog/why-neondatabase-toolkit).
- **Postgres 17**: You can now run the very latest version of Postgres on Neon. [Read the announcement](https://neon.tech/blog/postgres-17).
- **SQL Editor AI features**: We added AI features to the Neon SQL Editor, including SQL generation, AI-generated query names, and an AI assistant that will fix your queries. Currently available for Neon paid plan and Early Access users. [Learn more](/docs/get-started-with-neon/query-with-neon-sql-editor#ai-features).
- **A new Business plan with more compute and storage**: This new plan provides higher storage and compute allowances (500 GiB of storage and 1,000 compute hours) in addition to all of Neon's advanced features. It also offers potential cost savings for customers requiring more storage than our Scale plan provides. To learn more, please refer to our [Pricing](https://neon.tech/pricing) page and [Plans](/docs/introduction/plans) documentation.
- **Data migration support with inbound logical replication**: We've introduced inbound logical replication as the first step toward enabling seamless, low-downtime migrations from your current database provider to Neon. This feature allows you to use Neon as your development environment, taking advantage of developer-friendly tools like branching and our [GitHub integration](/docs/guides/neon-github-integration), even if you keep production with your existing provider. To get started, explore our guides for replicating data from AlloyDB, Aurora, CloudSQL, and RDS. See [Replicate data to Neon](/docs/guides/logical-replication-guide#replicate-data-to-neon). Inbound logical replication also supports migrating data between Neon projects, useful for version, region, or account migrations. See [Replicate data from one Neon project to another](/docs/guides/logical-replication-neon-to-neon).
- **Organizations**: Organization Accounts are now available in Beta. Create a new organization, transfer over your projects, invite your team and get started collaborating. Refer to our [Organizations docs](/docs/manage/organizations) to learn more.
- **Autoscaling GA**: One of our defining features, [Autoscaling](/docs/introduction/autoscaling), is now GA. Read the announcement: [Neon Autoscaling is Generally Available](https://neon.tech/blog/neon-autoscaling-is-generally-available).
- **Autoscaling on the Free Plan**: Users on the Free Plan are now able to try Neon's Autoscaling feature, within reasonable Free Plan limits. [Learn how](/docs/guides/autoscaling-guide).
- **Neon CLI**: We've recently added a [create-app](/docs/reference/cli-create-app) command that lets you bootstrap your application with common dev stacks. `create-app` is maturing fast, with new frameworks, ORMs, and features coming out regularly.

For more of the latest features and fixes, check our [Changelog](/docs/changelog), published weekly. Or watch for our Changelog email, also sent out weekly. You can also subscribe to updates using our [RSS feed](https://neon.tech/docs/changelog/rss.xml).

## What we're working on now

Here's a snapshot of what we're working on now:

- **Neon on Azure**: If you didn't catch the post, Neon is coming to Azure. [Read more](https://neon.tech/blog/neon-is-coming-to-azure) about this big news.
- **Larger computes**: We are working on adding support for ever-larger compute sizes.
- **New authentication method:** We're working on a new authentication method for Postgres that will enable simplified application -> database connections, as well as allow for Neon to be integrated into various marketplaces.
- **Support for exporting metrics**: We'd like to help users integrate Neon into their monitoring platforms and services with exportable metrics.
- **Private network access**: Private and secure network access to your compute resources without traversing public networks.
- **Better deletes**: We're adding support for deleting obsolete branches, especially after [restore](/docs/guides/branch-restore) operations.
- **Archive branches**: A mechanism to allow offloading branches (snapshots of your data) to cost-efficient object storage for retention periods longer than a Neon project's history retention window.
- **HIPAA compliance**: We are actively working toward achieving HIPAA readiness, with a target completion by the end of Q2 2025. For more about Neon's compliance milestones, see [Compliance](/docs/security/compliance).

If you have other feature ideas, [let us know](#share-your-thoughts).

## What's on the horizon

And here's a quick list of what we'll be taking on in the near future:

- **Staging Environments**: A critical part of making it easy for you to use Neon as the staging environment for your team's app development &#8212; simple, robust anonymization of PII data. We're working on it.
- **Snapshots**: Create regularly scheduled snapshots as a way to archive your database &#8212; a cost-effective alternative to long-lived branches.
- **Support for exporting logs and traces**: We'd like to help users further integrate Neon into their monitoring platforms and services with exportable logs and traces.
- **An email app service**: This service will provide support for email verification and password recovery workflows.
- **Foreign Data Wrapper (FDW) support**: Add functionality to enable cross-database querying capability

## Join the Neon Early Access Program

If you would like to get a little more involved, consider signing up for the **Neon Early Access Program**.

Benefits of joining:

- **Exclusive early access**: Get a first look at upcoming features before they go live.
- **Private community**: Gain access to a dedicated Discord channel to connect with the Neon team and provide feedback to help shape what comes next.
- **Weekly insights**: Receive updates on Neon's latest developments and future plans.

[Sign Up Now](https://neon.tech/early-access-program) and start influencing the future of Neon!

## A note about timing

We are as excited as you are to see new features in Neon, but their development, release, and timing are at our discretion.

## Share your thoughts

As always, we are listening. If you see something you like, something you disagree with, or something you'd love for us to add, let us know in our Discord feedback channel.

<CommunityBanner buttonText="Leave feedback" buttonUrl="https://discord.com/channels/1176467419317940276/1176788564890112042" logo="discord">Share your ideas in&nbsp;Discord</CommunityBanner>

## A brief history of Neon

The Neon **Limited Preview** started in February 2022 and was made available to a small number of select users and friends.

- On June 15th, 2022, the Neon team announced a [Technical Preview](https://neon.tech/blog/hello-world), making Neon available to a wider audience. Thousands of users were able to try Neon's [Free Plan](/docs/introduction/#free-plan).

- On December 6th, 2022, Neon released its branching feature and dropped the invite gate, welcoming everyone to try Neon's Free Plan.

- In the first quarter of 2023, Neon launched [paid plans](https://neon.tech/pricing) with new features like [Project Collaboration](/docs/guides/project-collaboration-guide), [Autoscaling](/docs/introduction/autoscaling), and [Autosuspend](/docs/introduction/auto-suspend). We also added support for AWS US East (N. Virginia)

- In the second quarter of 2023, we released the [Neon CLI](/docs/reference/neon-cli). Enhancements included a configurable [history retention](/docs/introduction/point-in-time-restore) window, support for Postgres 16, and [SOC 2 Type 1](https://neon.tech/blog/soc2-type-1#our-journey-to-soc2) compliance.

- In the third quarter of 2023, we added [IP allowlisting](/docs/introduction/ip-allow), email signup, and [logical replication](/docs/introduction/logical-replication). We also announced [SOC 2 Type 2](https://neon.tech/blog/soc2-type2) compliance.

- In the fourth quarter of 2023, we added support for the AWS Asia Pacific (Sydney) region, [Branch Restore](/docs/guides/branch-restore) with Time Travel Assist, and new [Pricing](https://neon.tech/pricing) plans.

- On April 15th, 2024, Neon announced [General Availability](https://neon.tech/blog/neon-ga).

For everything post-GA, please refer to our [Changelog](https://neon.tech/docs/changelog) and the [Neon Blog](https://neon.tech/blog). You can also stay updated with the latest information and announcements by subscribing to our [RSS feeds](/docs/reference/feeds) or [newsletter](https://neon.tech/blog#subscribe-form).
