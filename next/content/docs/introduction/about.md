---
title: What is Neon?
enableTableOfContents: true
redirectFrom:
  - /docs/cloud/about
---

Neon is a fully managed serverless PostgreSQL with a generous free tier.
Neon separates storage and compute and offers modern developer features such as serverless, branching, bottomless storage, and more. Neon is open source and written in Rust.

## Serverless

Neon automatically and transparently scales up compute on demand, in response to application workload. Neon also scales down to zero on inactivity. Since Neon is serverless, it only charges for what you use and can deliver up to a 10x reduction in cost.

## Built for developer productivity

Neon allows you to create a branch of your PostgreSQL database. It's easy to create branches for development, test, and staging environments.

Branching is instant and has close to zero overhead, as it is implemented using the "copy-on-write" technique in Neon storage.
In fact, branches are so cheap that you can create a branch for every code deployment in your CI/CD pipeline. To learn more about our branching feature, see [Branching](/docs/conceptual-guides/branches).

## Fully managed

Neon provides high availability without any administrative, maintenance, or scaling burden.

## Bottomless storage

Our engineering team has developed a purpose-built, multi-tenant storage system for the cloud.
Neon storage allows virtually unlimited storage while providing high availability and durability guarantees.

Neon storage integrates storage, backups, and archiving into one system. This reduces operational headaches associated with checkpoints, data backups, and restore.

Neon storage is designed with cloud costs in mind and uses a multi-tier architecture to deliver on latency, throughput, and cost. It integrates a cloud object store, such as S3, to push cold data to the cheapest storage medium, and uses locally attached SSDs for low latency, high-performance data. Neon storage is written in Rust for maximum performance and usability.

## Open source

You can find [neondatabase](https://github.com/neondatabase/neon) on GitHub. We develop in public under the Apache 2.0 license. For an overview of Neon's architecture, refer to Neon's [architecture documentation](/docs/conceptual-guides/architecture-overview).

## Compatibility

Neon compute is the latest version of PostgreSQL. It is 100% compatible with any application that uses the official release of PostgreSQL. Currently, we support [PostgreSQL 14](https://www.postgresql.org/docs/14/release-14.html) and [PostgreSQL 15](https://www.postgresql.org/docs/15/release-15.html), with PostgreSQL 15 being the default. For details refer to [compatibility](/docs/conceptual-guides/compatibility) page.
