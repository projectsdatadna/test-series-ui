#!/bin/bash

# Configuration
BUCKET_NAME="test-series-ui"
REGION="ap-south-1"

echo "🏗️  Building application..."
yarn build

echo "📦 Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "🚀 Setting cache headers..."
# Cache static assets for 1 year
aws s3 sync dist/ s3://$BUCKET_NAME --delete \
  --cache-control "max-age=31536000" \
  --exclude "*.html"

# Don't cache HTML files
aws s3 sync dist/ s3://$BUCKET_NAME --delete \
  --cache-control "max-age=0, no-cache, no-store, must-revalidate" \
  --include "*.html"

echo "✅ Deployment complete!"
echo "🌐 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"