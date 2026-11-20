import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import express from "express";
import session from "express-session";
import pg from "pg";

let tmpDir;
let server;
let url;
let resolvePgSslConfig;
let buildPgPoolConfig;
let stripPgSslQueryParams;
let resolveSessionSecret;
let hashPassword;
let ensureAdminUser;
let createAdminGuard;
let isApiPath;
let isSensitiveApiPath;
let detectImageMime;
let isSafeUrl;
let parsePositiveInt;

let account;
let lookupError;
let messageReads;
let createdProjects;
let createdBlogs;
let savedWhatsapp;
let apiLogs;

const PASSWORD = "TestAdminPassword!2026#Strong";
const SAMPLE_MESSAGE = {
  id: 1,
  name: "Kurgusal Kişi",
  email: "fixture@example.test",
  subject: "Deneme",
  message: "Yalnızca test mesajı",
  privacyAccepted: true,
};
const PUBLISHED_POST = {
  id: 1,
  titleTr: "Yayında Yazı",
  titleEn: "Published Post",
  contentTr: "<p>Yayında</p>",
  contentEn: "<p>Published</p>",
  slug: "yayinda-yazi",
  published: true,
  orderIndex: 0,
};
const DRAFT_POST = {
  id: 2,
  titleTr: "Gizli Taslak",
  titleEn: "Secret Draft",
  contentTr: "<p>Taslak içerik</p>",
  contentEn: "<p>Draft content</p>",
  slug: "gizli-taslak",
  published: false,
  orderIndex: 1,
};

const fixtureStorage = {
  async getUser(id) {
    if (lookupError) throw new Error("db-lookup-error");
    return account?.id === id ? account : undefined;
  },
  async getUserByUsername(username) {
    if (lookupError) throw new Error("db-lookup-error");
    return account?.username === username ? account : undefined;
  },
  async createUser(u) {
    account = { id: 1, ...u };
    return account;
  },
  async getUsers() {
    return account ? [account] : [];
  },
  async updateUserPassword(id, password) {
    if (account?.id === id) account.password = password;
  },
  async createContactMessage(msg) {
    return { id: 99, ...msg };
  },
  async getContactMessages() {
    messageReads += 1;
    return [SAMPLE_MESSAGE];
  },
  async getProjects() {
    return createdProjects;
  },
  async createProject(data) {
    const project = { id: createdProjects.length + 1, ...data };
    createdProjects.push(project);
    return project;
  },
  async updateProject(id, data) {
    const found = createdProjects.find((p) => p.id === id);
    return found ? Object.assign(found, data) : undefined;
  },
  async deleteProject(id) {
    const idx = createdProjects.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    createdProjects.splice(idx, 1);
    return true;
  },
  async getVideos() {
    return [];
  },
  async createVideo(data) {
    return { id: 1, ...data };
  },
  async updateVideo() {
    return undefined;
  },
  async deleteVideo() {
    return false;
  },
  async getAiModels() {
    return [];
  },
  async createAiModel(data) {
    return { id: 1, ...data };
  },
  async updateAiModel() {
    return undefined;
  },
  async deleteAiModel() {
    return false;
  },
  async getWhatsAppSettings() {
    return savedWhatsapp;
  },
  async updateWhatsAppSettings(data) {
    savedWhatsapp = { id: 1, ...data };
    return savedWhatsapp;
  },
  async getBlogPosts(published) {
    const all = [PUBLISHED_POST, DRAFT_POST, ...createdBlogs];
    if (published === undefined) return all;
    return all.filter((p) => p.published === published);
  },
  async getBlogPostBySlug(slug) {
    return [PUBLISHED_POST, DRAFT_POST, ...createdBlogs].find((p) => p.slug === slug);
  },
  async createBlogPost(data) {
    const post = { id: 10 + createdBlogs.length, ...data };
    createdBlogs.push(post);
    return post;
  },
  async updateBlogPost() {
    return undefined;
  },
  async deleteBlogPost() {
    return false;
  },
};

before(async () => {
  tmpDir = await mkdtemp(path.resolve("tests/.security-fixture-"));
  globalThis.__thirdHandSecurityFixtureStorage = fixtureStorage;

  const bundleOut = path.join(tmpDir, "bundle.mjs");
  const entryFile = path.join(tmpDir, "entry.ts");
  await writeFile(
    entryFile,
    `
      export { registerRoutes } from ${JSON.stringify(path.resolve("server/routes.ts"))};
      export { securityHeaders } from ${JSON.stringify(path.resolve("server/security-headers.ts"))};
      export { resolvePgSslConfig, buildPgPoolConfig, stripPgSslQueryParams } from ${JSON.stringify(path.resolve("server/db-ssl.ts"))};
      export { resolveSessionSecret } from ${JSON.stringify(path.resolve("server/session-config.ts"))};
      export { hashPassword } from ${JSON.stringify(path.resolve("server/password.ts"))};
      export { ensureAdminUser } from ${JSON.stringify(path.resolve("server/admin-auth.ts"))};
      export { createAdminGuard } from ${JSON.stringify(path.resolve("server/admin-guard.ts"))};
      export { isApiPath, isSensitiveApiPath, createApiRequestLogger } from ${JSON.stringify(path.resolve("server/request-logger.ts"))};
      export { detectImageMime, isSafeUrl, parsePositiveInt } from ${JSON.stringify(path.resolve("server/validation.ts"))};
    `,
    "utf8",
  );

  await build({
    entryPoints: [entryFile],
    outfile: bundleOut,
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    logLevel: "silent",
    plugins: [
      {
        name: "fixture-storage",
        setup(b) {
          b.onResolve({ filter: /^\.\/storage$/ }, () => ({
            path: "storage",
            namespace: "fixture",
          }));
          b.onLoad({ filter: /.*/, namespace: "fixture" }, () => ({
            contents:
              "export const storage = globalThis.__thirdHandSecurityFixtureStorage;",
            loader: "js",
          }));
          b.onResolve({ filter: /^@shared\/schema$/ }, () => ({
            path: path.resolve("shared/schema.ts"),
          }));
        },
      },
    ],
  });

  const mod = await import(pathToFileURL(bundleOut).href);
  resolvePgSslConfig = mod.resolvePgSslConfig;
  buildPgPoolConfig = mod.buildPgPoolConfig;
  stripPgSslQueryParams = mod.stripPgSslQueryParams;
  resolveSessionSecret = mod.resolveSessionSecret;
  hashPassword = mod.hashPassword;
  ensureAdminUser = mod.ensureAdminUser;
  createAdminGuard = mod.createAdminGuard;
  isApiPath = mod.isApiPath;
  isSensitiveApiPath = mod.isSensitiveApiPath;
  detectImageMime = mod.detectImageMime;
  isSafeUrl = mod.isSafeUrl;
  parsePositiveInt = mod.parsePositiveInt;

  const app = express();
  app.disable("x-powered-by");
  app.use(mod.securityHeaders);
  app.use(express.json());
  app.use(
    session({
      secret: "test-only-local-http-session-secret-more-than-32-bytes-long",
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, sameSite: "lax" },
    }),
  );
  apiLogs = [];
  app.use(
    mod.createApiRequestLogger((line) => {
      apiLogs.push(line);
    }),
  );

  server = await mod.registerRoutes(app);

  // Match server/index.ts error handler hygiene (no re-throw, mask 5xx)
  app.use((err, _req, res, _next) => {
    const status =
      typeof err?.status === "number"
        ? err.status
        : typeof err?.statusCode === "number"
          ? err.statusCode
          : 500;
    if (res.headersSent) return;
    res.status(status).json({
      message: status >= 500 ? "Internal Server Error" : err?.message || "Bad Request",
    });
  });

  server.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  url = `http://127.0.0.1:${server.address().port}`;
});

beforeEach(async () => {
  delete process.env.ADMIN_USERNAME;
  delete process.env.ADMIN_PASSWORD;
  account = {
    id: 1,
    username: "yonetici-test",
    password: await hashPassword(PASSWORD),
  };
  lookupError = false;
  messageReads = 0;
  createdProjects = [];
  createdBlogs = [];
  savedWhatsapp = undefined;
  apiLogs = [];
});

after(async () => {
  delete process.env.ADMIN_USERNAME;
  delete process.env.ADMIN_PASSWORD;
  if (server) {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
  delete globalThis.__thirdHandSecurityFixtureStorage;
  if (tmpDir) {
    await rm(tmpDir, { recursive: true, force: true });
  }
});

async function login(username = account.username, password = PASSWORD, extraHeaders = {}) {
  const res = await fetch(`${url}/api/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json", ...extraHeaders },
    body: JSON.stringify({ username, password }),
  });
  assert.equal(res.status, 200);
  await res.text();
  const setCookie = res.headers.get("set-cookie");
  assert.ok(setCookie, "login must issue set-cookie");
  return setCookie.split(";")[0];
}

// --- 1. SESSION_SECRET fail-closed tests ---

test("resolveSessionSecret: fails fast in production when missing, short, or placeholder", () => {
  assert.throws(
    () => resolveSessionSecret({ NODE_ENV: "production" }),
    /SESSION_SECRET/,
  );
  assert.throws(
    () => resolveSessionSecret({ NODE_ENV: "production", SESSION_SECRET: "   " }),
    /SESSION_SECRET/,
  );
  assert.throws(
    () =>
      resolveSessionSecret({
        NODE_ENV: "production",
        SESSION_SECRET: "too-short-secret-31-bytes-12345",
      }),
    /SESSION_SECRET/,
  );
  assert.throws(
    () =>
      resolveSessionSecret({
        NODE_ENV: "production",
        SESSION_SECRET: "your-super-secret-production-key-here",
      }),
    /SESSION_SECRET/,
  );
  assert.throws(
    () =>
      resolveSessionSecret({
        NODE_ENV: "production",
        SESSION_SECRET: "your-secret-key-here",
      }),
    /SESSION_SECRET/,
  );
  assert.throws(
    () =>
      resolveSessionSecret({
        NODE_ENV: "production",
        SESSION_SECRET: "replace-with-openssl-rand-hex-32",
      }),
    /SESSION_SECRET/,
  );
});

test("resolveSessionSecret: accepts strong >=32-byte secret in production", () => {
  const strong = "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4";
  assert.equal(
    resolveSessionSecret({ NODE_ENV: "production", SESSION_SECRET: strong }),
    strong,
  );
});

test("resolveSessionSecret: uses ephemeral 64-hex secret in non-production", () => {
  let warned = false;
  const ephemeral = resolveSessionSecret(
    { NODE_ENV: "development" },
    () => {
      warned = true;
    },
  );
  assert.equal(warned, true);
  assert.match(ephemeral, /^[0-9a-f]{64}$/);
});

// --- 2. PostgreSQL TLS verification tests ---

test("resolvePgSslConfig: disables SSL for plain Coolify internal Postgres", () => {
  assert.equal(
    resolvePgSslConfig("postgres://user:pass@thirdhandai-db:5432/app", {}),
    undefined,
  );
});

test("resolvePgSslConfig: enforces rejectUnauthorized=true for Neon, sslmode, PGSSL, PGSSLROOTCERT", async () => {
  for (const [label, connUrl, env] of [
    ["PGSSL=true", "postgres://u:p@db:5432/app", { PGSSL: "true" }],
    ["sslmode=require", "postgres://u:p@db:5432/app?sslmode=require", {}],
    ["sslmode=verify-ca", "postgres://u:p@db:5432/app?sslmode=verify-ca", {}],
    ["sslmode=verify-full", "postgres://u:p@db:5432/app?sslmode=verify-full", {}],
    ["sslmode=prefer", "postgres://u:p@db:5432/app?sslmode=prefer", {}],
    ["sslmode=no-verify", "postgres://u:p@db:5432/app?sslmode=no-verify", {}],
    ["ssl=no-verify", "postgres://u:p@db:5432/app?ssl=no-verify", {}],
    ["ssl=true", "postgres://u:p@db:5432/app?ssl=true", {}],
    ["PGSSLMODE=no-verify", "postgres://u:p@db:5432/app", { PGSSLMODE: "no-verify" }],
    ["neon.tech", "postgres://u:p@ep-example.us-east-2.aws.neon.tech/neondb", {}],
  ]) {
    const ssl = resolvePgSslConfig(connUrl, env);
    assert.deepEqual(ssl, { rejectUnauthorized: true }, `Failed for ${label}`);
  }

  const inlinePem = "-----BEGIN CERTIFICATE-----\nTEST\n-----END CERTIFICATE-----";
  assert.deepEqual(
    resolvePgSslConfig("postgres://u:p@db:5432/app", { PGSSLROOTCERT: inlinePem }),
    { rejectUnauthorized: true, ca: inlinePem },
  );

  const caPath = path.join(tmpDir, "ca.pem");
  await writeFile(caPath, inlinePem, "utf8");
  assert.deepEqual(
    resolvePgSslConfig("postgres://u:p@db:5432/app", { PGSSLROOTCERT: caPath }),
    { rejectUnauthorized: true, ca: inlinePem },
  );
});

test("buildPgPoolConfig + pg ConnectionParameters: preserves rejectUnauthorized=true and ca across sslmode/uselibpqcompat", async () => {
  const inlinePem = "-----BEGIN CERTIFICATE-----\nTEST-CA\n-----END CERTIFICATE-----";
  const caPath = path.join(tmpDir, "pool-ca.pem");
  await writeFile(caPath, inlinePem, "utf8");

  // (1) COOLIFY.md setup: ?sslmode=require|verify-ca|verify-full + PGSSLROOTCERT must keep ca and rejectUnauthorized: true
  for (const mode of ["require", "verify-ca", "verify-full"]) {
    const cfgInline = buildPgPoolConfig(
      `postgres://u:p@db.example:5432/app?sslmode=${mode}&application_name=thirdhand`,
      { PGSSLROOTCERT: inlinePem },
    );
    const cpInline = new pg.Client(cfgInline).connectionParameters;
    assert.deepEqual(
      cpInline.ssl,
      { rejectUnauthorized: true, ca: inlinePem },
      `ConnectionParameters dropped ca/rejectUnauthorized for sslmode=${mode}`,
    );
    assert.equal(cpInline.application_name, "thirdhand");

    const cfgFile = buildPgPoolConfig(
      `postgres://u:p@db.example:5432/app?sslmode=${mode}`,
      { PGSSLROOTCERT: caPath },
    );
    const cpFile = new pg.Client(cfgFile).connectionParameters;
    assert.deepEqual(cpFile.ssl, { rejectUnauthorized: true, ca: inlinePem });
  }

  // (2) ?sslmode=no-verify, ?ssl=no-verify, ?sslmode=prefer, and ?uselibpqcompat=true&sslmode=require
  // must NEVER downgrade to rejectUnauthorized: false or bypass checkServerIdentity
  for (const [label, connUrl, env] of [
    ["sslmode=no-verify", "postgres://u:p@db:5432/app?sslmode=no-verify", {}],
    ["sslmode=no-verify + PGSSL=true", "postgres://u:p@db:5432/app?sslmode=no-verify", { PGSSL: "true" }],
    ["ssl=no-verify + PGSSL=true", "postgres://u:p@db:5432/app?ssl=no-verify", { PGSSL: "true" }],
    ["sslmode=prefer", "postgres://u:p@db:5432/app?sslmode=prefer", {}],
    ["uselibpqcompat+require", "postgres://u:p@db:5432/app?uselibpqcompat=true&sslmode=require", {}],
    ["uselibpqcompat+require+PGSSL", "postgres://u:p@db:5432/app?uselibpqcompat=true&sslmode=require", { PGSSL: "true" }],
  ]) {
    const cp = new pg.Client(buildPgPoolConfig(connUrl, env)).connectionParameters;
    assert.deepEqual(cp.ssl, { rejectUnauthorized: true }, `Failed for ${label}`);
    assert.equal(cp.ssl.checkServerIdentity, undefined);
  }

  // (3) ?sslnegotiation=direct + PGSSLROOTCERT keeps both sslnegotiation and ca
  const cpDirect = new pg.Client(
    buildPgPoolConfig("postgres://u:p@db:5432/app?sslnegotiation=direct&sslmode=require", {
      PGSSLROOTCERT: inlinePem,
    }),
  ).connectionParameters;
  assert.deepEqual(cpDirect.ssl, { rejectUnauthorized: true, ca: inlinePem });
  assert.equal(cpDirect.sslnegotiation, "direct");

  // (4) Plain Coolify internal Postgres stays non-TLS, even if process.env.PGSSLMODE=no-verify
  const prevPgSslMode = process.env.PGSSLMODE;
  process.env.PGSSLMODE = "no-verify";
  try {
    const cpPlain = new pg.Client(
      buildPgPoolConfig("postgres://u:p@thirdhandai-db:5432/app", {}),
    ).connectionParameters;
    assert.equal(cpPlain.ssl, false);

    const cpFromEnv = new pg.Client(
      buildPgPoolConfig("postgres://u:p@thirdhandai-db:5432/app", process.env),
    ).connectionParameters;
    assert.deepEqual(cpFromEnv.ssl, { rejectUnauthorized: true });
  } finally {
    if (prevPgSslMode === undefined) delete process.env.PGSSLMODE;
    else process.env.PGSSLMODE = prevPgSslMode;
  }

  // (5) stripPgSslQueryParams removes all SSL params while preserving non-SSL params
  assert.equal(
    stripPgSslQueryParams(
      "postgres://u:p@db:5432/app?sslmode=require&ssl=no-verify&uselibpqcompat=true&sslrootcert=/a&sslcert=/b&sslkey=/c&application_name=web",
    ),
    "postgres://u:p@db:5432/app?application_name=web",
  );
});

// --- 3. Admin session & contact-message authorization tests ---

for (const route of ["/api/contact-messages", "/api/admin/messages", "/api/admin/blog-posts", "/api/user"]) {
  test(`${route}: rejects anonymous and forged requests`, async () => {
    const r1 = await fetch(`${url}${route}`, {
      headers: { "x-user-id": "1", "x-admin": "true" },
    });
    assert.equal(r1.status, 401);
    assert.ok(!(await r1.text()).includes(SAMPLE_MESSAGE.email));

    const r2 = await fetch(`${url}${route}`, {
      headers: { cookie: "connect.sid=s%3Aforged.invalid" },
    });
    assert.equal(r2.status, 401);
    assert.equal(messageReads, 0);
  });
}

test("admin login regenerates session, reads messages, and revokes on delete/rename/env-change/db-error", async () => {
  const cookie = await login();

  // Valid access
  const ok1 = await fetch(`${url}/api/contact-messages`, { headers: { cookie } });
  assert.equal(ok1.status, 200);
  assert.deepEqual(await ok1.json(), [SAMPLE_MESSAGE]);

  const ok2 = await fetch(`${url}/api/admin/messages`, { headers: { cookie } });
  assert.equal(ok2.status, 200);
  assert.equal(messageReads, 2);

  // Coolify ADMIN_USERNAME changed -> old session invalidated immediately
  process.env.ADMIN_USERNAME = "rotated-admin";
  process.env.ADMIN_PASSWORD = "RotatedStrongPassword!2026";
  const rotatedRes = await fetch(`${url}/api/admin/messages`, { headers: { cookie } });
  assert.equal(rotatedRes.status, 401);
  delete process.env.ADMIN_USERNAME;
  delete process.env.ADMIN_PASSWORD;

  // DB account renamed -> invalidated
  const originalUsername = account.username;
  account.username = "renamed-admin";
  const renamedRes = await fetch(`${url}/api/contact-messages`, { headers: { cookie } });
  assert.equal(renamedRes.status, 401);
  account.username = originalUsername;

  // DB lookup error -> fail closed with 503
  lookupError = true;
  const dbErrRes = await fetch(`${url}/api/admin/messages`, { headers: { cookie } });
  assert.equal(dbErrRes.status, 503);
  lookupError = false;

  // DB account deleted -> invalidated
  account = undefined;
  const deletedRes = await fetch(`${url}/api/contact-messages`, { headers: { cookie } });
  assert.equal(deletedRes.status, 401);
  assert.equal(messageReads, 2);
});

test("logout destroys session and clears session cookie", async () => {
  const cookie = await login();
  const out = await fetch(`${url}/api/logout`, {
    method: "POST",
    headers: { cookie },
  });
  assert.equal(out.status, 200);
  assert.match(out.headers.get("set-cookie") || "", /connect\.sid=;/);

  const afterLogout = await fetch(`${url}/api/user`, { headers: { cookie } });
  assert.equal(afterLogout.status, 401);
});

test("ADMIN_PASSWORD rotation immediately invalidates existing persistent sessions", async () => {
  process.env.ADMIN_USERNAME = account.username;
  process.env.ADMIN_PASSWORD = PASSWORD;
  await ensureAdminUser();

  const oldCookie = await login(account.username, PASSWORD);

  // /api/user returns only { id, username } without exposing passwordVersion
  const userRes = await fetch(`${url}/api/user`, { headers: { cookie: oldCookie } });
  assert.equal(userRes.status, 200);
  const userBody = await userRes.json();
  assert.deepEqual(userBody, { id: account.id, username: account.username });

  const beforeRotate = await fetch(`${url}/api/admin/messages`, {
    headers: { cookie: oldCookie },
  });
  assert.equal(beforeRotate.status, 200);

  // Simulate Coolify ADMIN_PASSWORD rotation + redeploy (session store persists!)
  const newPassword = "RotatedAdminPassword!2026#EvenStronger";
  process.env.ADMIN_PASSWORD = newPassword;
  await ensureAdminUser();

  // Existing session cookie must immediately fail with 401
  for (const route of ["/api/admin/messages", "/api/contact-messages", "/api/user"]) {
    const res = await fetch(`${url}${route}`, { headers: { cookie: oldCookie } });
    assert.equal(res.status, 401, `Old session unexpectedly worked on ${route}`);
  }

  // Fresh login with rotated password succeeds while old cookie remains invalid
  const newCookie = await login(account.username, newPassword);
  const afterNewLogin = await fetch(`${url}/api/admin/messages`, {
    headers: { cookie: newCookie },
  });
  assert.equal(afterNewLogin.status, 200);

  const oldCookieStillRejected = await fetch(`${url}/api/admin/messages`, {
    headers: { cookie: oldCookie },
  });
  assert.equal(oldCookieStillRejected.status, 401);

  // Even if startup ensureAdminUser() failed during a transient DB outage after rotation,
  // the first admin request once DB recovers syncs and rejects the old session with 401
  const thirdPassword = "ThirdAdminPassword!2026#PostOutage";
  process.env.ADMIN_PASSWORD = thirdPassword;
  lookupError = true;
  await ensureAdminUser(); // fails transiently during boot without crashing
  lookupError = false;
  const afterTransientBootFailure = await fetch(`${url}/api/admin/messages`, {
    headers: { cookie: newCookie },
  });
  assert.equal(afterTransientBootFailure.status, 401);

  // Direct DB password rotation (non-env mode) also immediately invalidates sessions
  delete process.env.ADMIN_USERNAME;
  delete process.env.ADMIN_PASSWORD;
  const postRecoveryCookie = await login(account.username, thirdPassword);
  const okPostRecovery = await fetch(`${url}/api/admin/messages`, {
    headers: { cookie: postRecoveryCookie },
  });
  assert.equal(okPostRecovery.status, 200);

  account.password = await hashPassword("AnotherDbPassword!2026");
  const afterDbRotate = await fetch(`${url}/api/admin/messages`, {
    headers: { cookie: postRecoveryCookie },
  });
  assert.equal(afterDbRotate.status, 401);

  // Legacy session missing passwordVersion fails closed with 401
  const guard = createAdminGuard(async () => account, () => null);
  let legacyStatus = 0;
  let nextCalled = false;
  await guard(
    { session: { user: { id: account.id, username: account.username } } },
    {
      status(code) {
        legacyStatus = code;
        return { json() {} };
      },
    },
    () => {
      nextCalled = true;
    },
  );
  assert.equal(legacyStatus, 401);
  assert.equal(nextCalled, false);
});

test("sensitive API response-body log redaction holds for mixed-case Express routes", async () => {
  assert.equal(isApiPath("/api/projects"), true);
  assert.equal(isApiPath("/API/Admin/messages"), true);
  assert.equal(isApiPath("/assets/app.js"), false);

  for (const sensitivePath of [
    "/api/admin/messages",
    "/api/Admin/messages",
    "/API/ADMIN/MESSAGES",
    "/api/Contact-Messages",
    "/api/User",
    "/API/USER/",
  ]) {
    assert.equal(
      isSensitiveApiPath(sensitivePath),
      true,
      `Expected sensitive path to be redacted: ${sensitivePath}`,
    );
  }
  assert.equal(isSensitiveApiPath("/api/Projects"), false);

  const cookie = await login();
  await new Promise((resolve) => setImmediate(resolve));
  apiLogs = [];

  for (const mixedCaseRoute of [
    "/api/Admin/messages",
    "/api/Contact-Messages",
    "/api/User",
    "/API/ADMIN/blog-posts",
  ]) {
    const res = await fetch(`${url}${mixedCaseRoute}`, { headers: { cookie } });
    assert.equal(res.status, 200, `Expected Express to route ${mixedCaseRoute}`);
    await res.json();
  }
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(apiLogs.length, 4);
  for (const line of apiLogs) {
    assert.ok(!line.includes("::"), `Response body leaked in log line: ${line}`);
    assert.ok(!line.includes(SAMPLE_MESSAGE.email), `Email leaked in log line: ${line}`);
    assert.ok(!line.includes(DRAFT_POST.titleTr), `Draft leaked in log line: ${line}`);
  }

  // Non-sensitive public API route still logs normally
  apiLogs = [];
  const pubRes = await fetch(`${url}/api/Projects`);
  assert.equal(pubRes.status, 200);
  assert.deepEqual(await pubRes.json(), []);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(apiLogs.length, 1);
  assert.match(apiLogs[0], /GET \/api\/Projects 200 .* :: \[\]/);
});

// --- 4. Draft blog post protection tests ---

test("public blog endpoints never expose unpublished drafts", async () => {
  const listRes = await fetch(`${url}/api/blog-posts`);
  assert.equal(listRes.status, 200);
  const posts = await listRes.json();
  assert.equal(posts.length, 1);
  assert.equal(posts[0].slug, PUBLISHED_POST.slug);

  const listFalseRes = await fetch(`${url}/api/blog-posts?published=false`);
  assert.equal(listFalseRes.status, 200);
  const postsFalse = await listFalseRes.json();
  assert.equal(postsFalse.length, 1);
  assert.equal(postsFalse[0].slug, PUBLISHED_POST.slug);

  const draftRes = await fetch(`${url}/api/blog-posts/${DRAFT_POST.slug}`);
  assert.equal(draftRes.status, 404);

  const pubRes = await fetch(`${url}/api/blog-posts/${PUBLISHED_POST.slug}`);
  assert.equal(pubRes.status, 200);
  assert.equal((await pubRes.json()).slug, PUBLISHED_POST.slug);
});

// --- 5. Upload magic-byte & MIME validation tests ---

test("POST /api/admin/upload rejects spoofed MIME and non-image payloads, accepts valid PNG", async () => {
  const cookie = await login();

  // SVG/HTML spoofed with text/html;png MIME
  const badMimeForm = new FormData();
  badMimeForm.append(
    "image",
    new Blob(["<svg onload=alert(1)></svg>"], { type: "text/html;png" }),
    "evil.png",
  );
  const badMimeRes = await fetch(`${url}/api/admin/upload`, {
    method: "POST",
    headers: { cookie },
    body: badMimeForm,
  });
  assert.equal(badMimeRes.status, 400);

  // SVG payload claiming image/png MIME and .png extension -> magic bytes reject
  const badMagicForm = new FormData();
  badMagicForm.append(
    "image",
    new Blob(["<svg xmlns='http://www.w3.org/2000/svg'></svg>"], { type: "image/png" }),
    "disguised.png",
  );
  const badMagicRes = await fetch(`${url}/api/admin/upload`, {
    method: "POST",
    headers: { cookie },
    body: badMagicForm,
  });
  assert.equal(badMagicRes.status, 400);

  // Valid PNG magic header
  const pngBytes = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  ]);
  const validForm = new FormData();
  validForm.append("image", new Blob([pngBytes], { type: "image/png" }), "ok.png");
  const validRes = await fetch(`${url}/api/admin/upload`, {
    method: "POST",
    headers: { cookie },
    body: validForm,
  });
  assert.equal(validRes.status, 200);
  const body = await validRes.json();
  assert.ok(body.url.startsWith("data:image/png;base64,"));
});

// --- 6. Input & URL validation + security headers + error hygiene ---

test("admin mutations reject javascript: URLs and non-numeric IDs", async () => {
  const cookie = await login();

  const xssProj = await fetch(`${url}/api/admin/projects`, {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({
      title: "Bad",
      description: "Desc",
      category: "AI",
      link: "javascript:alert(1)",
    }),
  });
  assert.equal(xssProj.status, 400);

  const backslashProj = await fetch(`${url}/api/admin/projects`, {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({
      title: "Bad Backslash",
      description: "Desc",
      category: "AI",
      link: "/\\evil.example",
    }),
  });
  assert.equal(backslashProj.status, 400);

  const ctrlCharProj = await fetch(`${url}/api/admin/projects`, {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({
      title: "Bad Control Char",
      description: "Desc",
      category: "AI",
      image: "/\t/evil.example",
    }),
  });
  assert.equal(ctrlCharProj.status, 400);

  const okProj = await fetch(`${url}/api/admin/projects`, {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({
      title: "Good",
      description: "Desc",
      category: "AI",
      link: "https://example.com",
    }),
  });
  assert.equal(okProj.status, 200);

  const badId = await fetch(`${url}/api/admin/projects/not-a-number`, {
    method: "PUT",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({ orderIndex: 1 }),
  });
  assert.equal(badId.status, 400);

  const badWa = await fetch(`${url}/api/admin/whatsapp-settings`, {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({ phoneNumber: 12345, enabled: "yes" }),
  });
  assert.equal(badWa.status, 400);
});

test("security headers are present, x-powered-by disabled, malformed JSON returns 400 safely", async () => {
  const res = await fetch(`${url}/api/projects`);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-powered-by"), null);
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  assert.equal(res.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(res.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(res.headers.get("permissions-policy") || "", /microphone=\(self "https:\/\/www\.sesyaz\.com"\)/);

  const badJson = await fetch(`${url}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{not-valid-json",
  });
  assert.equal(badJson.status, 400);

  // Server still healthy after malformed JSON
  const afterBad = await fetch(`${url}/api/projects`);
  assert.equal(afterBad.status, 200);
});

test("validation helpers unit checks", () => {
  assert.equal(parsePositiveInt("42"), 42);
  assert.equal(parsePositiveInt("0"), null);
  assert.equal(parsePositiveInt("-5"), null);
  assert.equal(parsePositiveInt("12abc"), null);

  assert.equal(isSafeUrl("https://thirdhand.com.tr"), true);
  assert.equal(isSafeUrl("/images/blog/a.webp"), true);
  assert.equal(isSafeUrl("//evil.example/x"), false);
  assert.equal(isSafeUrl("/\\evil.example"), false);
  assert.equal(isSafeUrl("/\\\\evil.example/x"), false);
  assert.equal(isSafeUrl("\\\\evil.example/x"), false);
  assert.equal(isSafeUrl("/\t/evil.example"), false);
  assert.equal(isSafeUrl("/\n/evil.example"), false);
  assert.equal(isSafeUrl("/\r/evil.example"), false);
  assert.equal(isSafeUrl("/images/a\u0000.png"), false);
  assert.equal(isSafeUrl("/images/a\u001f.png"), false);
  assert.equal(isSafeUrl("/images/a\u007f.png"), false);
  assert.equal(isSafeUrl("\r\n/images/a.png"), false);
  assert.equal(isSafeUrl("https://thirdhand.com.tr/path\r\nHeader: 1"), false);
  assert.equal(isSafeUrl("javascript:alert(1)"), false);
  assert.equal(isSafeUrl("data:text/html,<script>alert(1)</script>", { allowDataImage: true }), false);
  assert.equal(isSafeUrl("data:image/svg+xml;base64,PHN2Zz4=", { allowDataImage: true }), false);
  assert.equal(isSafeUrl("data:image/png;base64,iVBORw0KGgo=", { allowDataImage: true }), true);

  assert.equal(detectImageMime(Buffer.from([0xff, 0xd8, 0xff, 0xe0])), "image/jpeg");
  assert.equal(detectImageMime(Buffer.from("GIF89a...")), "image/gif");
  assert.equal(detectImageMime(Buffer.from("RIFF1234WEBP")), "image/webp");
  assert.equal(detectImageMime(Buffer.from("<svg></svg>")), null);
});
