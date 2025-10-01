import { ReactNode, useEffect, useRef, useState } from "react";
import { clearAllCaches } from "./utils";

export const CacheBuster = ({
  children,
  currentAppVersion,
}: {
  readonly children: ReactNode;
  readonly loadingComponent?: ReactNode;
  readonly currentAppVersion: string;
}) => {
  const [loading, setLoading] = useState(true);
  const isCheckingRef = useRef(false);

  useEffect(() => {
    const checkVersion = async () => {
      // Prevent duplicate requests in React StrictMode
      if (isCheckingRef.current) {
        return;
      }
      isCheckingRef.current = true;

      try {
        // Simple cooldown to prevent rapid reloads (safety net)
        const lastReloadAttempt = sessionStorage.getItem(
          "cache-buster-last-reload"
        );
        const now = Date.now();
        const RELOAD_COOLDOWN = 5000; // 5 seconds - shorter since nginx is reliable

        if (
          lastReloadAttempt &&
          now - parseInt(lastReloadAttempt, 10) < RELOAD_COOLDOWN
        ) {
          console.warn(
            "Recent reload detected, continuing with current version"
          );
          setLoading(false);
          return;
        }

        // Nginx ensures meta.json is never cached, so no need for cache-busting
        const response = await fetch("/meta.json");

        // Handle missing meta.json (404 or other errors)
        if (!response.ok) {
          console.warn(
            `meta.json not found (${response.status}) - skipping version check`
          );
          setLoading(false);
          return;
        }

        const meta = await response.json();
        const latestVersion = meta.version;

        console.log("Current app version:", currentAppVersion);
        console.log("Latest app version:", latestVersion);

        if (latestVersion !== currentAppVersion) {
          console.info(
            "Version mismatch detected - clearing caches and reloading"
          );

          // Record reload attempt timestamp to prevent infinite loops
          sessionStorage.setItem("cache-buster-last-reload", now.toString());

          // Clear all caches first
          await clearAllCaches();

          // Force hard reload - nginx ensures fresh HTML
          globalThis.location.reload();
        } else {
          console.log("Version check passed - app is up to date");
          // Clear any previous reload attempt timestamp on successful version match
          sessionStorage.removeItem("cache-buster-last-reload");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking for new version:", error);
        setLoading(false); // Continue even if version check fails
      } finally {
        isCheckingRef.current = false;
      }
    };

    checkVersion();

    // Cleanup function to reset the ref if component unmounts
    return () => {
      isCheckingRef.current = false;
    };
  }, []);

  return loading ? "Loading..." : children;
};

export default CacheBuster;
