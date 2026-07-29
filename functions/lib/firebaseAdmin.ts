export interface FirebaseAdminEnv {
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
}

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string };

function base64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const b of arr) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToBinaryKey(pem: string): ArrayBuffer {
  const contents = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(contents);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function getAccessToken(env: FirebaseAdminEnv): Promise<string> {
  const privateKeyPem = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToBinaryKey(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const claims = base64url(
    new TextEncoder().encode(
      JSON.stringify({
        iss: env.FIREBASE_CLIENT_EMAIL,
        scope: "https://www.googleapis.com/auth/datastore",
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
      })
    )
  );
  const unsigned = `${header}.${claims}`;
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned)
  );
  const jwt = `${unsigned}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    throw new Error(`Falha ao obter access token do Google (${res.status})`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function toFirestoreFields(obj: Record<string, string | number>): Record<string, FirestoreValue> {
  const fields: Record<string, FirestoreValue> = {};
  for (const [key, value] of Object.entries(obj)) {
    fields[key] =
      typeof value === "number"
        ? { integerValue: String(Math.trunc(value)) }
        : { stringValue: value };
  }
  return fields;
}

function fromFirestoreFields(fields: Record<string, FirestoreValue>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    result[key] = "stringValue" in value ? value.stringValue : value.integerValue;
  }
  return result;
}

export async function queryByField(
  env: FirebaseAdminEnv,
  collectionId: string,
  field: string,
  value: string
): Promise<Record<string, string>[]> {
  const token = await getAccessToken(env);
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId }],
        where: {
          fieldFilter: {
            field: { fieldPath: field },
            op: "EQUAL",
            value: { stringValue: value },
          },
        },
      },
    }),
  });
  if (!res.ok) throw new Error(`Firestore runQuery falhou (${res.status})`);
  const rows = (await res.json()) as { document?: { fields: Record<string, FirestoreValue> } }[];
  return rows.filter((r) => r.document).map((r) => fromFirestoreFields(r.document!.fields));
}

export async function createFirestoreDoc(
  env: FirebaseAdminEnv,
  collectionPath: string,
  data: Record<string, string | number>
): Promise<string> {
  const token = await getAccessToken(env);
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${collectionPath}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: toFirestoreFields(data) }),
  });
  if (!res.ok) throw new Error(`Firestore POST falhou (${res.status})`);
  const created = (await res.json()) as { name: string };
  return created.name.split("/").pop()!;
}
