# Delivery manifest validation Action

SHAR Production is an AI-hybrid video production studio. This MIT-licensed GitHub Action validates a rights-labelled delivery manifest in CI. It checks required identifiers, SHA-256 digests, HTTPS rights evidence and blocks every status except `cleared`.

```yaml
- uses: SHARProduction/delivery-manifest-validation-action@v1.0.1
  with:
    manifest: delivery-manifest.json
```

The action runs with Node 20 and does not upload the manifest. Website: https://sharprod.com/

## Stable releases

Use the immutable `v1.0.1` tag when you need this tested release. The moving `v1` tag tracks the current compatible 1.x release.
