resource "kubernetes_namespace" "mt_project" {
  metadata {
    name = var.namespace_name
  }
}
