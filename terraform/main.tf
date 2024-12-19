provider "aws" {
  region = var.aws_region
}

# S3 Bucket
resource "aws_s3_bucket" "static_website" {
  bucket        = var.bucket_name
  acl           = "public-read"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

# Upload website files to the S3 bucket
resource "aws_s3_bucket_object" "website_files" {
  for_each = fileset(var.static_files_path, "**")
  bucket   = aws_s3_bucket.static_website.bucket
  key      = each.value
  source   = "${var.static_files_path}/${each.value}"
  acl      = "public-read"
}

# CloudFront (optional)
resource "aws_cloudfront_distribution" "static_website_cdn" {
  count = var.cloudfront_enabled ? 1 : 0

  origin {
    domain_name = aws_s3_bucket.static_website.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.static_website.id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oa_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled      = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.static_website.id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "oa_identity" {
  comment = "Origin Access Identity for S3 bucket"
}
