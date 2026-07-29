import { readFileSync, writeFileSync } from "node:fs";

const sa = JSON.parse(readFileSync("serviceAccountKey.json", "utf-8"));

const privateKeyEscaped = sa.private_key.replace(/\r?\n/g, "\\n");

const content =
  `FIREBASE_PROJECT_ID=${sa.project_id}\n` +
  `FIREBASE_CLIENT_EMAIL=${sa.client_email}\n` +
  `FIREBASE_PRIVATE_KEY=${privateKeyEscaped}\n`;

writeFileSync(".dev.vars", content);
console.log("Wrote .dev.vars, private key line length:", privateKeyEscaped.length);
