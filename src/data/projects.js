export const projects = [
  {
    id: 'pipeline',
    name: 'Zero-downtime deployment pipeline',
    shortDesc: 'Blue-green deployments on EKS using ArgoCD and GitHub Actions. Average deploy in under 4 minutes with instant rollback.',
    year: '2024',
    status: 'live',
    tags: ['GitHub Actions', 'EKS', 'ArgoCD', 'Helm', 'AWS ECR'],
    github: 'https://github.com/sujanmagar/eks-blue-green',
    demo: null,
    steps: [
      {
        title: 'Prerequisites',
        desc: 'AWS CLI v2, kubectl, Helm 3, and ArgoCD CLI installed. EKS cluster running with at least 2 node groups (blue and green).',
        code: null,
      },
      {
        title: 'Clone the repo and configure secrets',
        desc: null,
        code: `git clone https://github.com/sujanmagar/eks-blue-green
cd eks-blue-green
# Add to GitHub repo secrets:
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
ECR_REGISTRY
KUBECONFIG_BASE64`,
      },
      {
        title: 'Install ArgoCD on your cluster',
        desc: null,
        code: `kubectl create namespace argocd
kubectl apply -n argocd -f \\
  https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
# Get initial admin password
argocd admin initial-password -n argocd`,
      },
      {
        title: 'Apply Helm chart and ArgoCD app manifest',
        desc: null,
        code: `helm upgrade --install myapp ./chart \\
  --namespace production \\
  --set image.tag=latest

kubectl apply -f argocd/application.yaml`,
      },
      {
        title: 'Push to main to trigger pipeline',
        desc: 'The GitHub Actions workflow builds the Docker image, pushes to ECR, updates the Helm values file, and ArgoCD auto-syncs the deployment to the cluster. Rollback is one click in the ArgoCD UI.',
        code: null,
      },
    ],
  },
  {
    id: 'iac',
    name: 'Multi-region IaC module library',
    shortDesc: 'Reusable Terraform modules for AWS provisioning across three regions. DR failover under 60 seconds.',
    year: '2023',
    status: 'live',
    tags: ['Terraform', 'AWS', 'Route53', 'RDS', 'VPC'],
    github: 'https://github.com/sujanmagar/tf-multiregion',
    demo: null,
    steps: [
      {
        title: 'Install Terraform and configure AWS provider',
        desc: null,
        code: `# terraform >= 1.5.0 required
brew install terraform
aws configure  # set default region to ap-south-1`,
      },
      {
        title: 'Clone and initialise',
        desc: null,
        code: `git clone https://github.com/sujanmagar/tf-multiregion
cd tf-multiregion
terraform init`,
      },
      {
        title: 'Edit variables for your environment',
        desc: null,
        code: `cp terraform.tfvars.example terraform.tfvars
# Set your domain, account ID, and region list
regions      = ["ap-south-1", "us-east-1", "eu-west-1"]
domain_name  = "sujanmagar.info.np"`,
      },
      {
        title: 'Plan and apply',
        desc: null,
        code: `terraform plan -out=tfplan
terraform apply tfplan`,
      },
    ],
  },
  {
    id: 'observability',
    name: 'Centralised observability stack',
    shortDesc: 'Prometheus, Grafana, and Loki on Kubernetes. Covers metrics, logs, and alerting for all production services.',
    year: '2023',
    status: 'wip',
    tags: ['Prometheus', 'Grafana', 'Loki', 'PagerDuty', 'Kubernetes'],
    github: 'https://github.com/sujanmagar/k8s-observability',
    demo: null,
    steps: [
      {
        title: 'Add Helm repos',
        desc: null,
        code: `helm repo add prometheus-community \\
  https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update`,
      },
      {
        title: 'Install kube-prometheus-stack',
        desc: null,
        code: `kubectl create namespace monitoring
helm install prom-stack \\
  prometheus-community/kube-prometheus-stack \\
  -n monitoring \\
  -f values/prometheus-values.yaml`,
      },
      {
        title: 'Install Loki + Promtail',
        desc: null,
        code: `helm install loki grafana/loki-stack \\
  -n monitoring \\
  --set promtail.enabled=true \\
  --set grafana.enabled=false`,
      },
      {
        title: 'Configure PagerDuty alerting',
        desc: 'Edit values/alertmanager-values.yaml with your PagerDuty integration key. Alerts are pre-configured for pod crashes, high CPU, and failed deployments.',
        code: null,
      },
      {
        title: 'Access Grafana',
        desc: null,
        code: `kubectl port-forward svc/prom-stack-grafana 3000:80 -n monitoring
# Open http://localhost:3000 — default user: admin`,
      },
    ],
  },
]
