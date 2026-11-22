import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import express from "express";

let tmpDir;
let registerLanding;

async function listen(app) {
  return await new Promise((resolve) => {
    const server = app.listen(0, "127.0.0.1", () =>
      resolve({ server, url: `http://127.0.0.1:${server.address().port}` }),
    );
  });
}

before(async () => {
  tmpDir = await mkdtemp(path.join(os.tmpdir(), "landing-test-"));
  const out = path.join(tmpDir, "landing.mjs");
  await build({
    entryPoints: [path.resolve("server/landing.ts")],
    outfile: out,
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    logLevel: "silent",
  });
  ({ registerLanding } = await import(pathToFileURL(out).href));
});

after(async () => {
  await rm(tmpDir, { recursive: true, force: true });
});

test("ana sayfa: landing.html varsa '/' onu döndürür, diğer adreslere dokunmaz", async () => {
  const base = path.join(tmpDir, "var");
  await mkdir(path.join(base, "public"), { recursive: true });
  await writeFile(path.join(base, "public", "landing.html"), "<!doctype html><title>yeni</title>");

  const app = express();
  registerLanding(app, base);
  app.use("*", (_req, res) => res.send("react-uygulamasi"));
  const { server, url } = await listen(app);
  try {
    const home = await fetch(`${url}/?utm_source=test`);
    assert.equal(home.status, 200);
    assert.match(home.headers.get("content-type"), /text\/html/);
    assert.equal(home.headers.get("cache-control"), "no-cache");
    assert.match(await home.text(), /<title>yeni<\/title>/);

    for (const p of ["/blog", "/admin", "/klasik"]) {
      assert.equal(await (await fetch(url + p)).text(), "react-uygulamasi");
    }
  } finally {
    server.close();
  }
});

test("ana sayfa: landing.html yoksa '/' eski akışa düşer (site açılmaya devam eder)", async () => {
  const base = path.join(tmpDir, "yok", "icerde");
  await mkdir(base, { recursive: true });

  const app = express();
  registerLanding(app, base);
  app.use("*", (_req, res) => res.send("react-uygulamasi"));
  const { server, url } = await listen(app);
  try {
    assert.equal(await (await fetch(`${url}/`)).text(), "react-uygulamasi");
  } finally {
    server.close();
  }
});

test("landing.html: form ve liste sitenin kendi adreslerine bağlı, gömülü görsel yok", async () => {
  const html = await readFile(path.resolve("client/public/landing.html"), "utf8");
  assert.match(html, /fetch\("\/api\/contact"/);
  assert.match(html, /"\/api\/projects"/);
  assert.match(html, /href="\/admin"/);
  assert.match(html, /href="\/blog"/);
  assert.doesNotMatch(html, /data:image\/webp;base64/);
  // Yönetim panelinde tanımlı proje görseli önceliklidir; ekran görüntüsü yedektir.
  assert.match(html, /esc\(p\.image\|\|shot\)/);
  // EN bağlantıları eski sayfada İngilizceyi seçili hale getirir.
  assert.equal((html.match(/localStorage\.setItem\('thirdhand\.lang','EN'\)/g) || []).length, 2);
  assert.ok(html.length < 300_000, "ana sayfa dosyası hafif kalmalı");
});
