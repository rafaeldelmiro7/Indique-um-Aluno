import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

const sa = JSON.parse(readFileSync("serviceAccountKey.json", "utf-8"));
const rules = readFileSync("firestore.rules", "utf-8");

function base64url(buf) {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsigned =
    base64url(Buffer.from(JSON.stringify(header))) + "." + base64url(Buffer.from(JSON.stringify(claims)));
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = base64url(signer.sign(sa.private_key));
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("token: " + JSON.stringify(data));
  return data.access_token;
}

const token = await getAccessToken();

const createRes = await fetch(`https://firebaserules.googleapis.com/v1/projects/${sa.project_id}/rulesets`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ source: { files: [{ name: "firestore.rules", content: rules }] } }),
});
const createData = await createRes.json();
if (!createRes.ok) {
  console.error("Falha ao criar ruleset:", JSON.stringify(createData, null, 2));
  process.exit(1);
}
console.log("Ruleset criado:", createData.name);

const releaseName = `projects/${sa.project_id}/releases/cloud.firestore`;
let releaseRes = await fetch(
  `https://firebaserules.googleapis.com/v1/${releaseName}?updateMask=rulesetName`,
  {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ release: { name: releaseName, rulesetName: createData.name } }),
  }
);
let releaseData = await releaseRes.json();

if (!releaseRes.ok && releaseRes.status === 404) {
  releaseRes = await fetch(`https://firebaserules.googleapis.com/v1/projects/${sa.project_id}/releases`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name: releaseName, rulesetName: createData.name }),
  });
  releaseData = await releaseRes.json();
}

if (!releaseRes.ok) {
  console.error("Falha ao publicar release:", JSON.stringify(releaseData, null, 2));
  process.exit(1);
}
console.log("Regras publicadas com sucesso:", releaseData.name);
