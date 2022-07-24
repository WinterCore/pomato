import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";


// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8080,
    },
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: ["@emotion/babel-plugin"],
            },
        }),
        eslint(),
    ],
    esbuild: {
        logOverride: {
            "this-is-undefined-in-esm": "silent",
        },
    },
});
