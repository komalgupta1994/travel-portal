resource "google_sql_database_instance" "mysql_instance" {
  name             = "mysql-instance"
  database_version = "MYSQL_5_7"
  region           = "asia-south1"
  project          = "booking-system-408314"

  settings {
    tier = "db-f1-micro"  # Update with your preferred instance size

    ip_configuration {
      ipv4_enabled    = true
      authorized_networks {
        name  = "allow-your-ip"
        value = "223.190.87.250"  # Replace with your system's public IP
      }
    }
  }
}
