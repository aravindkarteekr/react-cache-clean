# React Cache Refresh 🚀

A modern, lightweight React utility that automatically detects new app versions and clears browser caches to ensure users always get the latest version of your application.

## ✨ Features

- **Automatic Version Detection**: Compares current app version with latest deployed version
- **Smart Cache Clearing**: Clears all browser caches (Service Worker caches, HTTP caches)
- **React 19 Compatible**: Built with modern React patterns and hooks
- **TypeScript Support**: Full TypeScript support with type definitions
- **Reload Protection**: Prevents infinite reload loops with built-in cooldown mechanism
- **Error Resilient**: Gracefully handles missing meta.json or network errors
- **Zero Dependencies**: Only requires React as a peer dependency

## 📦 Installation

```bash
npm install react-cache-refresh
# or
yarn add react-cache-refresh
# or
pnpm add react-cache-refresh
```

## 🚀 Quick Start

### 1. Create a meta.json file

First, create a `meta.json` file in your `public` directory with your app version:

```json
{
  "version": "1.0.0"
}
```

### 2. Wrap your app with CacheBuster

```tsx
import React from "react";
import { CacheBuster } from "react-cache-refresh";
import App from "./App";

const VERSION = "1.0.0"; // This should match your package.json version

function Root() {
  return (
    <CacheBuster currentAppVersion={VERSION}>
      <App />
    </CacheBuster>
  );
}

export default Root;
```

### 3. Update your build process

Make sure to update the `meta.json` file with the new version number whenever you deploy:

```json
{
  "version": "1.0.1"
}
```

## 📖 API Reference

### CacheBuster Component

The main component that wraps your application and handles version checking.

#### Props

| Prop                | Type        | Required | Description                                         |
| ------------------- | ----------- | -------- | --------------------------------------------------- |
| `children`          | `ReactNode` | ✅       | Your app components                                 |
| `currentAppVersion` | `string`    | ✅       | Current version of your app                         |
| `loadingComponent`  | `ReactNode` | ❌       | Custom loading component (defaults to "Loading...") |

#### Example with Custom Loading

```tsx
import React from "react";
import { CacheBuster } from "react-cache-refresh";
import App from "./App";
import LoadingSpinner from "./components/LoadingSpinner";

const VERSION = "1.0.0";

function Root() {
  return (
    <CacheBuster
      currentAppVersion={VERSION}
      loadingComponent={<LoadingSpinner />}
    >
      <App />
    </CacheBuster>
  );
}
```

### Utility Functions

#### `clearAllCaches()`

Manually clear all browser caches.

```tsx
import { clearAllCaches } from "react-cache-refresh/utils";

const handleClearCache = async () => {
  try {
    await clearAllCaches();
    console.log("All caches cleared successfully");
  } catch (error) {
    console.error("Error clearing caches:", error);
  }
};
```

## 🔧 Advanced Usage

### Using with Environment Variables

```tsx
import React from "react";
import { CacheBuster } from "react-cache-refresh";
import App from "./App";

// Get version from environment variable or package.json
const VERSION = process.env.REACT_APP_VERSION || "1.0.0";

function Root() {
  return (
    <CacheBuster currentAppVersion={VERSION}>
      <App />
    </CacheBuster>
  );
}
```

### Custom Loading Component

```tsx
import React from "react";
import { CacheBuster } from "react-cache-refresh";
import App from "./App";

const LoadingComponent = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div>Checking for updates...</div>
  </div>
);

function Root() {
  return (
    <CacheBuster
      currentAppVersion="1.0.0"
      loadingComponent={<LoadingComponent />}
    >
      <App />
    </CacheBuster>
  );
}
```

### Integration with CI/CD

#### Basic Example (Package.json Versioning)

```yaml
# GitHub Actions
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: echo '{"version":"'$(node -p "require('./package.json').version")'"}' > public/meta.json
      - run: npm ci && npm run build
```

#### Dynamic Versioning (Recommended)

Generate unique versions using Git SHA + Pipeline ID:

```yaml
# GitHub Actions
name: Deploy with Dynamic Versioning
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate version
        run: |
          VERSION="${GITHUB_REF#refs/heads/}.$(date -u +%Y%m%d%H%M%S).$(git rev-parse --short HEAD).${{ github.run_id }}"
          echo '{"version":"'$VERSION'"}' > public/meta.json
          echo "REACT_APP_VERSION=$VERSION" > .env.production
      - run: npm ci && npm run build
```

```tsx
// In your React app
const VERSION = process.env.REACT_APP_VERSION || "dev-local";

<CacheBuster currentAppVersion={VERSION}>
  <App />
</CacheBuster>;
```

<details>
<summary><strong>More CI/CD Examples (GitLab, Azure, etc.)</strong></summary>

#### GitLab CI

```yaml
# .gitlab-ci.yml
build:
  script:
    - VERSION="${CI_COMMIT_REF_NAME}.$(date -u +%Y%m%d%H%M%S).${CI_COMMIT_SHORT_SHA}.${CI_PIPELINE_ID}"
    - echo "{\"version\": \"${VERSION}\"}" > public/meta.json
    - echo "REACT_APP_VERSION=${VERSION}" > .env.production
    - npm ci && npm run build
```

#### Azure DevOps

```yaml
# azure-pipelines.yml
variables:
  version: $(Build.SourceBranchName).$(Build.BuildId)
steps:
  - script: |
      echo "{\"version\": \"$(version)\"}" > public/meta.json
      echo "REACT_APP_VERSION=$(version)" > .env.production
      npm ci && npm run build
```

</details>

#### Version Formats

```bash
# Examples of generated versions:
"main.20241001143022.a1b2c3d.12345"  # branch.date.sha.buildid
"20241001143022.a1b2c3d.12345"       # date.sha.buildid (shorter)
"a1b2c3d.12345"                      # sha.buildid (minimal)
```

#### Using with Webpack

```javascript
// webpack.config.js
const fs = require("fs");
const packageJson = require("./package.json");

// Update meta.json during build
fs.writeFileSync(
  "public/meta.json",
  JSON.stringify({
    version: packageJson.version,
  })
);
```

## 🌐 Server Configuration

Ensure `meta.json` is never cached by adding these headers:

**Nginx:**

```nginx
location /meta.json {
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

**Apache:**

```apache
<Files "meta.json">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</Files>
```

## 🔍 How It Works

1. **Version Check** → Fetches `/meta.json` on app load
2. **Comparison** → Compares with current app version
3. **Cache Clear** → Clears all browser caches if versions differ
4. **Reload** → Hard reload to get latest version
5. **Cooldown** → 5-second safety to prevent reload loops

## 🛠️ Troubleshooting

| Issue                   | Solution                                                           |
| ----------------------- | ------------------------------------------------------------------ |
| **Infinite reloads**    | Ensure `meta.json` and app versions match during deployment        |
| **Version check fails** | Check `meta.json` exists and isn't cached by your server           |
| **404 for meta.json**   | Component handles this gracefully - just add the file to `/public` |

**Debug:** Check browser console for version logs and error details.

## 🐛 Issues & Support

Found a bug or have a feature request? Please [open an issue](https://github.com/aravindkarteekr/react-cache-refresh/issues) on GitHub.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🔗 Links

- [GitHub Repository](https://github.com/aravindkarteekr/react-cache-refresh)
- [NPM Package](https://www.npmjs.com/package/react-cache-refresh)
- [Report Issues](https://github.com/aravindkarteekr/react-cache-refresh/issues)

---

**Made with ❤️ for the React community**
