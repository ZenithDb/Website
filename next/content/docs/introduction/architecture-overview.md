---
title: Neon architecture
redirectFrom:
  - /docs/storage-engine/architecture-overview
  - /docs/conceptual-guides/architecture-overview
---

Neon architecture is based on the separation of storage and compute and is orchestrated by the Neon Control Plane, which manages cloud resources across both storage and compute.

A Neon Compute runs PostgreSQL, and storage is a multi-tenant key-value store for PostgreSQL pages that is custom-built for the cloud.

![Neon architecture diagram](/docs/introduction/neon_architecture_2.png)

Neon storage consists of three main components: Safekeepers, Pageservers, and cloud object storage.

Safekeepers are responsible for durability of recent updates.
PostgreSQL streams [Write-Ahead Log (WAL)](../../reference/glossary#postgres) to the Safekeepers, and the Safekeepers store the WAL durably, until it has been processed by the Pageservers and uploaded to cloud storage.

Pageservers are responsible for serving read requests. To do that, Pageservers process the incoming WAL stream into a custom storage format that makes all [page](../../reference/glossary#postgres) versions easily accessible. Pageservers also upload data to cloud object storage, and download the data on demand.

Neon uses cloud object storage, such as S3, Azure Blob Storage, or Google Cloud Storage, for long-term data storage.

Safekeepers can be thought of as an ultra reliable write buffer that holds the latest data until it is processed and uploaded to cloud storage. Safekeepers implement the Paxos protocol for reliability. Pageservers also function as a read cache for cloud storage, providing fast random access to data pages.
