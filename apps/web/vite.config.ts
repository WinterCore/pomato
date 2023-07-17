import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8080,
    },
    plugins: [
        // @ts-ignore
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: ["@emotion/babel-plugin"],
            },
        }),
        eslint({
            failOnError: process.env.NODE_ENV === "production",
        }),
    ],
    esbuild: {
        logOverride: {
            "this-is-undefined-in-esm": "silent",
        },
    },
});
