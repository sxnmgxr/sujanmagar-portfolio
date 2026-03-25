export const posts = [
  {
    id: 'deploy-time',
    date: 'Mar 2026',
    title: 'How I cut our Kubernetes deploy time by 10x',
    excerpt: 'A walkthrough of moving from a slow Jenkins-based pipeline to ArgoCD with blue-green deployments on EKS — and what surprised me along the way.',
    tags: ['Kubernetes', 'CI/CD', 'ArgoCD'],
    readTime: '8 min read',
    content: `
<p>When I joined the team, a full production deployment took around 45 minutes. By the time it was done, the engineer who triggered it had usually moved on to something else, lost context, and was half-hoping nothing went wrong.</p>
<p>Today the same deployment completes in under 4 minutes, with automatic rollback if anything looks wrong. Here is exactly how we got there.</p>

<h2>The old pipeline</h2>
<p>We were running Jenkins on a VM, triggering shell scripts that SSH'd into servers to pull new Docker images. No Helm, no ArgoCD, no real observability into what was happening.</p>
<blockquote>The problem wasn't Jenkins — it was that the pipeline had no model of desired state. It just ran commands and hoped for the best.</blockquote>

<h2>Moving to GitOps</h2>
<p>The core idea behind GitOps is that your Git repository is the single source of truth for what should be running in production. ArgoCD watches your repo and reconciles the cluster to match.</p>
<p>To make this work, we needed to:</p>
<ul>
  <li>Package every service with Helm charts</li>
  <li>Store Helm values in a separate <code>gitops-config</code> repo</li>
  <li>Set up ArgoCD with auto-sync enabled</li>
  <li>Update the CI pipeline to bump image tags in the values repo (not deploy directly)</li>
</ul>

<h2>Blue-green on EKS</h2>
<p>The 45-minute problem was partly architectural. We were doing rolling updates, which meant waiting for each pod to come up healthy before proceeding. With blue-green, we spin up the entire new environment in parallel and switch traffic only when all health checks pass.</p>
<pre>
# In your Helm values — point service to the inactive color
service:
  selector:
    slot: green   # switch to 'blue' on next deploy
</pre>

<h2>Key numbers</h2>
<ul>
  <li>Deploy time: <span class="highlight">45 min → 4 min</span></li>
  <li>Rollback time: <span class="highlight">~25 min → 30 sec</span></li>
  <li>Failed deploys reaching production: <span class="highlight">down 80%</span></li>
  <li>Deployment frequency: <span class="highlight">3x weekly → daily</span></li>
</ul>
    `,
  },
  {
    id: 'terraform-modules',
    date: 'Feb 2026',
    title: 'Terraform modules that your team will actually reuse',
    excerpt: 'The patterns I use to write Terraform modules that are flexible enough for multiple teams but simple enough that nobody avoids them.',
    tags: ['Terraform', 'IaC'],
    readTime: '6 min read',
    content: `
<p>The graveyard of every infrastructure codebase is full of modules that someone wrote once, used once, and never touched again. The code that actually gets reused shares a few patterns worth naming.</p>

<h2>Make the interface obvious</h2>
<p>Variables are your module's API. If someone has to read your <code>main.tf</code> to understand what the module does, the interface has failed. Every variable should have a description. Required variables should be few.</p>
<pre>
variable "environment" {
  description = "Deployment environment: dev, staging, or prod"
  type        = string
  validation {
    condition     = contains(["dev","staging","prod"], var.environment)
    error_message = "Must be dev, staging, or prod."
  }
}
</pre>

<h2>Outputs as contracts</h2>
<p>Every module should output everything a caller might need. If you're building a VPC module, output the VPC ID, all subnet IDs, the default security group, and the NAT gateway IPs.</p>

<h2>Version your modules</h2>
<p>Pin module versions in callers. Use Git tags. This is the single change that prevented the most incidents on my team.</p>
<pre>
module "vpc" {
  source = "git::https://github.com/sujanmagar/tf-modules//vpc"
  ref    = "v1.4.0"   # pinned — never use main/master
}
</pre>
    `,
  },
  {
    id: 'loki-setup',
    date: 'Jan 2026',
    title: 'Setting up Loki for log aggregation the right way',
    excerpt: 'Loki is powerful but easy to misconfigure. Here is the setup that finally worked for us across 20+ services without blowing the storage budget.',
    tags: ['Loki', 'Observability', 'Kubernetes'],
    readTime: '10 min read',
    content: `
<p>Loki is not Elasticsearch. The biggest mistake I see teams make is treating Loki like a full-text search engine. It's designed for label-based querying, and when you fight that model you end up with high cardinality labels, slow queries, and a storage bill that doesn't make sense.</p>

<h2>Label design matters more than anything</h2>
<p>In Loki, labels are used for indexing. High-cardinality labels — like request IDs, user IDs, or IP addresses — will destroy performance. Keep your label set small and stable:</p>
<pre>
# Good labels
{app="api", env="prod", namespace="production"}

# Bad labels — never do this
{request_id="abc-123", user_id="9981", ip="10.0.1.55"}
</pre>

<h2>Retention and storage</h2>
<p>By default Loki stores everything forever. Set a retention period and configure an S3 or GCS backend for the chunks.</p>
<pre>
limits_config:
  retention_period: 30d

storage_config:
  aws:
    s3: s3://your-bucket/loki
    region: ap-south-1
</pre>

<h2>Promtail on Kubernetes</h2>
<p>When running Promtail as a DaemonSet, make sure you're scraping both the container logs and the Kubernetes metadata. The auto-discovered labels from the Kubernetes API give you everything you need for most queries.</p>
    `,
  },
  {
    id: 'multi-region',
    date: 'Dec 2025',
    title: 'Multi-region AWS: the things nobody tells you',
    excerpt: 'Latency, data residency, Route53 quirks, and RDS cross-region replication gotchas from our migration to a three-region active-active setup.',
    tags: ['AWS', 'Multi-region', 'RDS'],
    readTime: '12 min read',
    content: `
<p>We moved to a three-region active-active setup over six months. The architecture diagrams made it look simple. The implementation was not.</p>

<h2>Route53 latency routing is not magic</h2>
<p>Route53 latency-based routing sends users to the region with the lowest measured latency — but the measurement is based on AWS's IP ranges, not actual user location. For users in Nepal, this sometimes means routing to Singapore instead of Mumbai because the latency measurements don't reflect local ISP conditions.</p>

<h2>RDS cross-region replication lag</h2>
<p>Cross-region read replicas in RDS have non-trivial lag — anywhere from a few seconds to several minutes depending on write volume and distance. If your application reads its own writes, you'll hit consistency issues after a failover.</p>

<h2>Terraform provider aliases</h2>
<pre>
provider "aws" { alias = "ap"; region = "ap-south-1" }
provider "aws" { alias = "us"; region = "us-east-1"  }
provider "aws" { alias = "eu"; region = "eu-west-1"  }
</pre>
    `,
  },
  {
    id: 'bash-scripts',
    date: 'Nov 2025',
    title: 'Writing Bash scripts that don\'t embarrass you',
    excerpt: 'Practical conventions for shell scripting in a DevOps context: error handling, logging, idempotency, and how to avoid the traps that bite you at 2am.',
    tags: ['Bash', 'Scripting'],
    readTime: '7 min read',
    content: `
<p>Every DevOps engineer has a script they're embarrassed about. Usually it's the one that's running in production and only the original author understands.</p>

<h2>Start with strict mode</h2>
<pre>
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\\n\\t'
</pre>
<p><code>-e</code> exits on error. <code>-u</code> treats unset variables as errors. <code>-o pipefail</code> catches failures in pipes.</p>

<h2>Log everything, timestamp everything</h2>
<pre>
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2
}
log "Starting deployment for \${SERVICE:-unknown}"
</pre>

<h2>Make scripts idempotent</h2>
<p>A script that can be run twice and produce the same result is a script you can safely retry. Before creating a resource, check if it exists. This is especially important for scripts that run in CI.</p>

<h2>Use functions for anything over 20 lines</h2>
<p>A flat 300-line script is much harder to read than ten 30-line functions with clear names. The 2am incident call is not the time to figure out what a script does.</p>
    `,
  },
]
