---
title: Managing schema changes in a logical replication setup
subtitle: Learn about managing schema changes in a logical replication setup
enableTableOfContents: true
isDraft: false
updatedOn: '2024-09-04T14:11:03.960Z'
---

When working with Postgres logical replication, managing schema changes is a task that requires careful planning. As stated in the [PostgreSQL documentation](https://www.postgresql.org/docs/current/logical-replication-restrictions.html):

"_The database schema and DDL commands are not replicated. The initial schema can be copied by hand using `pg_dump --schema-only`. Subsequent schema changes would need to be kept in sync manually. (Note, however, that there is no need for the schemas to be absolutely the same on both sides.) Logical replication is robust when schema definitions change in a live database: When the schema is changed on the publisher and replicated data starts arriving at the subscriber but does not fit into the table schema, replication will error until the schema is updated. In many cases, intermittent errors can be avoided by applying additive schema changes to the subscriber first._"

This guidance highlights key considerations and best practices for handling schema changes in a logical replication setup.

## Schema management in a logical replication context

Logical replication in Postgres is designed to replicate data changes (inserts, updates, and deletes) but not schema changes (DDL commands). This means that any modifications to the database schema, such as adding or dropping columns, need to be manually applied to both the publisher and the subscriber databases.

Since the schemas do not need to be exactly the same on both sides, you have some flexibility. However, inconsistencies in the schema can lead to replication errors if the subscriber cannot accommodate incoming data due to schema mismatches.

To ensure smooth schema changes in a logical replication setup, follow these best practices:

### 1. Apply additive schema changes to the subscriber first

Additive changes, such as adding a new column or creating an index, should be applied to the subscriber before they are applied to the publisher. This approach ensures that when the new data is replicated from the publisher, the subscriber is already prepared to handle it. For example:

- **Add a new column on the subscriber:**

  ```sql
  ALTER TABLE your_table_name ADD COLUMN new_column_name data_type;
  ```

- **Add the same column on the publisher:**

  ```sql
  ALTER TABLE your_table_name ADD COLUMN new_column_name data_type;
  ```

By doing this, you prevent replication errors caused by the subscriber not recognizing the new column in incoming data.

### 2. Handle non-additive schema changes with caution

Non-additive changes, such as dropping a column or altering a column's data type, require more careful handling. In some cases, you might need to temporarily pause write activity on the publisher to safely apply schema changes. This step can help avoid issues during the schema change process:

- **Pause writes:** Pausing writes on the publisher can be achieved in a number of ways such as stopping or pausing the application that handles writes (inserts, updates, and deletes) or revoking write permissions on the database roles that are writing to the database. Other methods may be available to you depending on your environment.
- **Apply your schema changes:** Make the necessary changes to both the subscriber and the publisher.
- **Resume writes:** Once the changes are complete and verified, resume normal write operations.

### 3. Monitor and verify replication

After applying schema changes and resuming writes if they were paused, it's important to verify that data is being replicated between the publisher and subscriber.

To do this, you can run the following query on the subscriber to make sure the `last_msg_receipt_time` is very recent and as expected based on the write activity on the publisher.

```sql shouldWrap
SELECT subname, received_lsn, latest_end_lsn, last_msg_receipt_time FROM pg_catalog.pg_stat_subscription;
```

You can also perform a row count on the publisher and subscriber databases to make sure results are the same or close if replication is actively adding rows.

```sql
SELECT COUNT(*) FROM your_table_name;
```

## References

- [PostgreSQL logical replication restrictions](https://www.postgresql.org/docs/current/logical-replication-restrictions.html)
- [Import a database schema](/docs/import/import-schema-only)
