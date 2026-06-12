import { MongoClient } from "mongodb";
import dns from "dns";

// Configure Node's DNS resolver to use Google and Cloudflare public DNS to bypass local SRV resolution issues in dev
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e: any) {
  console.warn("MongoDB Client: Failed to set DNS servers:", e.message);
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  // During build time (prerendering), environment variables might be missing.
  // We return a promise that will only throw if it's actually awaited at runtime.
  clientPromise = new Promise((_, reject) => {
    // We don't throw immediately to avoid crashing the build during module import.
    // If a dynamic route is correctly marked, this promise won't be awaited during build.
    if (typeof window === "undefined") {
      // Server-side: defer error until runtime access
      console.warn("MONGODB_URI is missing. Database access will fail at runtime.");
    }
  });
} else {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().catch((err) => {
        global._mongoClientPromise = undefined;
        throw err;
      });
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;
