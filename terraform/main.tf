provider "google" {
  credentials = file("./credentials.json")
  project     = "booking-system-408314"
  region      = "asia-south1"
}

variable "system_ip" {
  type    = string
  default = "223.190.87.250"
}

# Include other variables or configurations as needed

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.77.0"  # Use the latest version
    }
  }
}
