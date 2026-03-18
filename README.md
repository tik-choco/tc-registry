# tc-registry

Simple JSON-based registry.

## Add an app
1. Open [Issues](https://github.com/tik-choco/tc-registry/issues)
2. Choose the **App Add Request** template
3. Fill in `App name` and `URL`, then create the issue

> GitHub Actions creates a pull request automatically.
> The automation runs for issues that start with `Add app:`.

## Data structure
- `id` (UUID v4)
- `url`
- `title`
- `hostname` (derived from the URL)
- `addedAt` (Unix epoch milliseconds)

## Raw data
- `https://raw.githubusercontent.com/tik-choco/tc-registry/main/apps.json`
