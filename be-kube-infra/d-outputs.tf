#
# Outputs
#

locals {
  config_map_aws_auth = <<CONFIGMAPAWSAUTH


apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-auth
  namespace: kube-system
data:
  mapRoles: |
    - rolearn: ${aws_iam_role.demo-node.arn}
      username: system:node:{{EC2PrivateDNSName}}
      groups:
        - system:bootstrappers
        - system:nodes
CONFIGMAPAWSAUTH

  kubeconfig = <<KUBECONFIG


apiVersion: v1
clusters:
- cluster:
    server: ${aws_eks_cluster.demo.endpoint}
    certificate-authority-data: ${aws_eks_cluster.demo.certificate_authority.0.data}
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: aws
  name: aws
current-context: aws
kind: Config
preferences: {}
users:
- name: aws
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1alpha1
      command: aws-iam-authenticator
      args:
        - "token"
        - "-i"
        - "${var.cluster-name}"
KUBECONFIG
}

output "config_map_aws_auth" {
  value = "${local.config_map_aws_auth}"
}

resource "local_file" "config_map_aws_auth-file" {
    content  = "${local.config_map_aws_auth}"
    filename = "../config-map-aws-auth.yml"
}

output "kubeconfig" {
  value = "${local.kubeconfig}"
}

resource "local_file" "kubeconfig-file" {
    content  = "${local.kubeconfig}"
    filename = "../config"
}

output "kubeversion" {
  value = "${aws_eks_cluster.demo.version}"
}
