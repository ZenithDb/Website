---
title: Local Development with Neon
subtitle: Learn how to develop applications locally with Neon
author: dhanush-reddy
enableTableOfContents: true
createdAt: '2024-11-05T00:00:00.000Z'
updatedOn: '2024-11-05T00:00:00.000Z'
---

Setting up your development environment should be simple and fast. With Neon's modern approach to PostgreSQL, you get exactly that. Here's how to create the perfect setup for your applications.

<Admonition type="note">
The setups described in this guide use the **Neon serverless driver** for connecting to a Postgres database hosted locally or on Neon over HTTP or WebSockets. To learn more, see [The Neon Serverless driver](https://neon.tech/docs/serverless/serverless-driver).
</Admonition>

## Two ways to develop

When setting up a development environment with Neon, there are a couple of different approaches you can take:

1. **Database branching**
2. **Local PostgreSQL**

Let's explore both options to help you pick the right one.

## Database branching

Imagine creating a complete copy of your database as easily as creating a Git branch. That's [database branching](https://neon.tech/docs/introduction/branching) with Neon – perfect for testing new features or updates without touching production data.

### Why use it?

- **Fast setup**: Create new environments in ~1 second
- **Zero configuration**: No local PostgreSQL installation required
- **True isolation**: Test changes without fear of breaking production
- **Cost-efficient**: Pay only for unique data and actual compute usage
- **Team-friendly**: Share database branches as easily as sharing Git branches
- **Autoscaling**: Resources scale to zero when you're not coding
- **Data reset**: Need a fresh start or a do-over? Reset your branch to match production in seconds

### Quickstart

1. Install the [**Neon CLI**](/docs/reference/neon-cli) by following the guide [here](/docs/reference/neon-cli#install).

2. **Connect your account**

   ```bash
   neonctl auth
   ```

3. **Create your branch**

   ```bash
   neonctl branches create --name dev/your-name

   # Get your connection details
   neonctl connection-string dev/your-name
   ```

   <Admonition type="note">
   You can also create branches through the Neon Console by navigating to your project and clicking the "Branches" tab. This provides a visual interface for branch management and configuration
   </Admonition>

4. **Set up your environment**

   ```bash
   # .env.development
   DATABASE_URL='postgresql://[user]:[password]@[endpoint]/[dbname]'
   ```

5. **Install dependencies**

   Dependencies include [Neon's serverless driver](https://neon.tech/docs/serverless/serverless-driver) and a WebSockets library.

   <Admonition type="note">
   The Neon serverless driver supports connections over HTTP and WebSockets, depending on your requirements. This setup assumes that you could be using either. For the differences, refer to the [Neon's serverless driver docs](https://neon.tech/docs/serverless/serverless-driver).
   </Admonition>

   <CodeTabs labels={["npm", "yarn", "pnpm"]}>

   ```bash
   npm install @neondatabase/serverless ws
   ```

   ```bash
   yarn add @neondatabase/serverless ws
   ```

   ```bash
   pnpm add @neondatabase/serverless ws
   ```

   </CodeTabs>

6. **Connect your app**

   ```javascript
   import { Pool, neon, neonConfig } from '@neondatabase/serverless';

   // Uncomment the following lines if you are on environments that do not support WebSocket, e.g, Node.js
   // import ws from 'ws';
   // neonConfig.webSocketConstructor = ws;

   export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
   export const sql = neon(process.env.DATABASE_URL);
   ```

### Tips and tricks

- **Stay organized**: Use prefixes like `dev/feature-auth` or `dev/alice`
- **Reset data**: Start fresh when needed:
  ```bash
  neon branches reset dev/your-name
  ```
- **Feature work**: Create dedicated branches:
  ```bash
  neon branches create --name dev/auth-system --parent main
  ```

## Local PostgreSQL

Sometimes you need to work offline or want full control over your database. Here's how to set up a local PostgreSQL instance that works perfectly with the Neon. This method uses:

- The [Neon Serverless driver](https://neon.tech/docs/serverless/serverless-driver) to connect to your local database (same as the database branching setup described above)
- A Docker compose file that installs a local instance of PostgreSQL 17 and the Neon Proxy. The Neon Proxy lets you to connect to your local PostgreSQL database using the Neon serverless driver.

<Admonition type="note" title="kudos">
The Neon Proxy setup uses the [local-neon-http-proxy](https://github.com/TimoWilhelm/local-neon-http-proxy) Dockerfile, developed by [TimoWilhelm](https://github.com/TimoWilhelm).
</Admonition>

### Why use this method?

- **Full control**: Your own PostgreSQL instance
- **Offline work**: Code without internet dependency
- **Fast queries**: Zero network latency
- **Free development**: Use your local resources

### Setup steps

1. Install Dependencies

   <CodeTabs labels={["npm", "yarn", "pnpm"]}>

   ```bash
   npm install @neondatabase/serverless ws
   ```

   ```bash
   yarn add @neondatabase/serverless ws
   ```

   ```bash
   pnpm add @neondatabase/serverless ws
   ```

   </CodeTabs>

2. **Set up via Docker Compose**

   ```yaml
   services:
     postgres:
       image: postgres:17
       command: '-d 1'
       volumes:
         - db_data:/var/lib/postgresql/data
       ports:
         - '5432:5432'
       environment:
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=postgres
         - POSTGRES_DB=main
       healthcheck:
         test: ['CMD-SHELL', 'pg_isready -U postgres']
         interval: 10s
         timeout: 5s
         retries: 5

     neon-proxy:
       image: ghcr.io/timowilhelm/local-neon-http-proxy:main
       environment:
         - PG_CONNECTION_STRING=postgres://postgres:postgres@postgres:5432/main
       ports:
         - '4444:4444'
       depends_on:
         postgres:
           condition: service_healthy

   volumes:
     db_data:
   ```

3. **Configure the connection**

   ```typescript
   import { neon, neonConfig, Pool } from '@neondatabase/serverless';
   import ws from 'ws';

   let connectionString = process.env.DATABASE_URL;

   // Configuring Neon for local development
   if (process.env.NODE_ENV === 'development') {
     connectionString = 'postgres://postgres:postgres@db.localtest.me:5432/main';
     neonConfig.fetchEndpoint = (host) => {
       const [protocol, port] = host === 'db.localtest.me' ? ['http', 4444] : ['https', 443];
       return `${protocol}://${host}:${port}/sql`;
     };
     const connectionStringUrl = new URL(connectionString);
     neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== 'db.localtest.me';
     neonConfig.wsProxy = (host) => (host === 'db.localtest.me' ? `${host}:4444/v1` : undefined);
     neonConfig.webSocketConstructor = ws;
   }

   export const pool = new Pool({ connectionString });
   export const sql = neon(connectionString);
   ```

## Which development approach should you use?

Before choosing between cloud-hosted or local development, it's important to understand the benefits of each approach.

Cloud-hosted branches offer several compelling advantages:

### Cost-efficient development

- **Minimal storage costs**: Branches are extremely cost-effective as you only pay for unique data changes
- **Smart compute usage**: Development happens on small computes (0.25 vCPU) that scale to zero by default
- **Free Plan benefits**: Even the Free Plan includes 5 compute hours on dev branches
  - This translates to 20 hours of development time on a 0.25 vCPU compute
  - One compute hour at 1 vCPU equals four hours at 0.25 vCPU

### Developer-friendly features

- **Instant deployment**: Branches are created in seconds, just like Git branches
- **Branch reset**: Easily refresh your development data from the parent branch
- **Zero maintenance**: No need to manage local PostgreSQL installations

| Feature             | Database Branching                           | Local PostgreSQL                     |
| ------------------- | -------------------------------------------- | ------------------------------------ |
| Setup Time          | ✅ Instant (~1 second)                       | ⏱️ Requires initial configuration    |
| Configuration       | ✅ Zero configuration needed                 | 🔧 Requires local setup              |
| Team Collaboration  | ✅ Easy branch sharing and management        | 🤝 Requires additional setup         |
| Cost Management     | ✅ Pay only for unique data and compute time | 💻 Local resources only              |
| Resource Scaling    | ✅ Scale to zero when not in use             | ❌ Always consuming resources        |
| Offline Development | ❌ Requires internet connection              | ✅ Works offline                     |
| Network Latency     | 🌐 Depends on connection                     | ✅ Zero latency                      |
| Production Parity   | ✅ Identical to production                   | 🔄 Requires additional configuration |

## When to use each approach

### Choose database branching when:

- You want instant development environments
- You need efficient resource utilization
- You're working with a team

**Perfect for:**

- Most development workflows
- Team environments
- Rapid prototyping
- Feature development
- Testing database changes

### Consider local PostgreSQL when:

- Offline development is crucial
- You need zero network latency
- You require complete database control
- You have specific local testing requirements

## Best practices for cloud-hosted development with Neon branching

### Environment tips

- Keep development and production database branches separate
- Always Use clear branch naming
- Never commit credentials to a version control system

### Resource tips

- Use scale to zero for development branches
- Clean up unused branches
- Reset branches to match production when needed

### Security tips

- Use separate development credentials
- Rotate credentials regularly
- Keep production credentials isolated

## Start building

You're now ready to create a powerful development environment with Neon. Choose the approach that fits your team best and start building.

<NeedHelp/>
