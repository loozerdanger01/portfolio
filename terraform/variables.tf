variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Unique name for the S3 bucket"
}

variable "cloudfront_enabled" {
  description = "Enable CloudFront for the static website"
  type        = bool
  default     = true
}

variable "static_files_path" {
  description = "Path to the static files to upload to S3"
  default     = "./path-to-static-files"
}
