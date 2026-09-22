const base = process.argv[2] || "http://127.0.0.1:4197";
const paths = process.argv.slice(3).length ? process.argv.slice(3) : [
  "/", "/robots.txt", "/sitemap.xml", "/brands", "/perfumes",
  "/perfumes?sort=newest", "/perfume/does-not-exist", "/brands/does-not-exist"
];

let failed = false;
for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  const body = await response.text();
  const title = body.match(/<title>(.*?)<\/title>/is)?.[1] || "";
  const canonical = body.match(/rel="canonical" href="([^"]+)/i)?.[1] || "";
  const robots = body.match(/name="robots" content="([^"]+)/i)?.[1] || "";
  const h1 = (body.match(/<h1[^>]*>(.*?)<\/h1>/is)?.[1] || "").replace(/<[^>]+>/g, "");
  const expectedStatus = path.includes("does-not-exist") ? 404 : 200;
  if (response.status !== expectedStatus) failed = true;
  console.log(JSON.stringify({
    path, status:response.status, contentType:response.headers.get("content-type"),
    title, canonical, robots, h1, bytes:body.length,
    productSchema:body.includes('"@type":"Product"'),
    productLinks:(body.match(/href="\/perfume\//g) || []).length
  }));
}
if (failed) process.exitCode = 1;
