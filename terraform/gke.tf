resource "google_container_cluster" "gke_cluster" {
  name     = "gke-cluster"
  location = "asia-south1"
  project  = "booking-system-408314"

  node_pool {
    name       = "default-pool"
    initial_node_count = 1
    autoscaling {
      min_node_count = 1
      max_node_count = 1  # Update based on your scaling requirements
    }
    node_config {
      machine_type = "e2-small"  # Update with your preferred machine type
    }
  }
}
