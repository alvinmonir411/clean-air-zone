const nextConfig = {
  productionBrowserSourceMaps: false,
  webpack: (config: any, { webpack }: any) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(pg-native|hiredis|mysql|mysql2|oracledb|mssql|sql.js|sqlite3|better-sqlite3|ioredis|redis|typeorm-aurora-data-api-driver|pg-query-stream|react-native-sqlite-storage|expo-sqlite|@sap\/hana-client|@google-cloud\/spanner|hdb-pool)(\/.*)?$/,
      })
    );
    return config;
  },
  turbopack: {
    resolveAlias: {
      "expo-sqlite": "./app/lib/empty.js",
      "react-native-sqlite-storage": "./app/lib/empty.js",
      "better-sqlite3": "./app/lib/empty.js",
      "sqlite3": "./app/lib/empty.js",
      "mysql": "./app/lib/empty.js",
      "mysql2": "./app/lib/empty.js",
      "oracledb": "./app/lib/empty.js",
      "mssql": "./app/lib/empty.js",
      "sql.js": "./app/lib/empty.js",
      "ioredis": "./app/lib/empty.js",
      "redis": "./app/lib/empty.js",
      "hiredis": "./app/lib/empty.js",
      "pg-native": "./app/lib/empty.js",
      "pg-query-stream": "./app/lib/empty.js",
      "typeorm-aurora-data-api-driver": "./app/lib/empty.js",
      "@sap/hana-client": "./app/lib/empty.js",
      "@google-cloud/spanner": "./app/lib/empty.js",
      "hdb-pool": "./app/lib/empty.js",
    },
  },
};

export default nextConfig;

