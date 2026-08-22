const app = document.getElementById("app");

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cruxHtml(text, originalLang) {
  const safe = escapeHtml(text).replaceAll("[[crux]]", "<mark class=\"crux\">").replaceAll("[[/crux]]", "</mark>");
  const isHebrew = originalLang === "Hebrew";
  const isGreek = originalLang === "Greek";
  const cls = ["verse"];
  if (originalLang) {
    cls.push("original");
    if (isGreek) cls.push("el");
    if (isHebrew) cls.push("he");
  }
  return `<p class="${cls.join(" ")}">${safe}</p>`;
}

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load ${path}`);
  return res.json();
}

function parseRoute() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const parts = hash.split("/").filter(Boolean);
  if (parts[0] === "method") return { name: "method" };
  if (parts[0] === "sources") return { name: "sources" };
  if (parts[0] === "residue") return { name: "residue" };
  if (parts[0] === "passage" && parts[1]) return { name: "passage", id: parts[1] };
  return { name: "home" };
}

function setNav(name) {
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === name);
  });
}

function renderHome(catalog) {
  setNav("home");
  const cards = catalog.passages
    .map((p) => {
      const queued = p.status !== "ready";
      const href = queued ? "#/" : `#/passage/${p.id}`;
      return `
        <a class="card ${queued ? "queued" : ""}" href="${href}">
          <div class="kicker">${escapeHtml(p.ref)}</div>
          <h2>${escapeHtml(p.title)}</h2>
          <p>${escapeHtml(p.hook)}</p>
          <div class="status ${queued ? "queued" : ""}">${queued ? "Queued" : "Ready"}</div>
        </a>`;
    })
    .join("");

  app.innerHTML = `
    <section class="hero">
      <h1>${escapeHtml(catalog.title)}</h1>
      <p class="lead">${escapeHtml(catalog.tagline)} Outer witnesses first. Inner traditions second. No invented verses.</p>
      <div class="layers">
        <span class="chip">English first</span>
        <span class="chip">Greek / Hebrew as court</span>
        <span class="chip">Residue</span>
      </div>
    </section>
    <div class="grid">${cards}</div>`;
}

function renderMethod() {
  setNav("method");
  app.innerHTML = `
    <article class="method">
      <div class="kicker">Working rules</div>
      <h1>Two technologies, one desk</h1>
      <p>There is no single autograph of “the Bible.” What we can still do is reconstruct the earliest recoverable layer of a given passage, show how the printed Bible got there, and keep the inner reading traditions in view without letting them forge letters.</p>
      <h2>English first</h2>
      <p>Public-domain English Bibles are the working language. When KJV, Geneva, Douay, Young, ASV, JPS 1917, and Brenton collide, that collision is a pointer. We do not “correct” the English from memory. We name the collision, then open Greek and Hebrew as the court.</p>
      <p>Aramaic, Syriac, and what older English called Chaldee (usually Biblical Aramaic in Daniel and Ezra, sometimes Targum) matter. They are parked until the English, Greek, and Hebrew desks are loaded.</p>
      <table>
        <thead><tr><th>Layer</th><th>Question</th></tr></thead>
        <tbody>
          <tr><td>Now</td><td>What do common printed Bibles actually say?</td></tr>
          <tr><td>Has been</td><td>What do older English and the MT, DSS, LXX, SP, TR, and quotations attest?</td></tr>
          <tr><td>Residue</td><td>Where did wording, a verse, a book, or a meaning used to be — and later move?</td></tr>
          <tr><td>Earliest recoverable</td><td>What older form is best supported, and how confident are we?</td></tr>
          <tr><td>Inner tradition</td><td>How did later readers inhabit, rename, or remember the crux?</td></tr>
          <tr><td>Gap</td><td>What this method cannot recover.</td></tr>
        </tbody>
      </table>
      <h2>Exoteric</h2>
      <p>Public, checkable, manuscript-first: stemmatics, languages, archaeology, the Dead Sea Scrolls, the Septuagint, the Samaritan Pentateuch, New Testament papyri. The goal is the earliest recoverable form, not a theoretical first draft.</p>
      <h2>Esoteric</h2>
      <p>How communities said the letters were for: divine-council cosmology, midrash that remembers a reading the consonants dropped, allegory, the renaming of gods as angels. Evidence of habitation — not a license to invent missing verses.</p>
      <h2>We will not</h2>
      <ul>
        <li>Invent verses and call them ancient.</li>
        <li>Treat conspiracy as method.</li>
        <li>Collapse Jewish, Samaritan, Ethiopian, Catholic, Orthodox, and Protestant canons into one original table of contents.</li>
        <li>Pretend J, E, D, and P have been found on parchment.</li>
      </ul>
      <p><a href="#/">Atlas</a> · <a href="#/residue">Residue</a> · <a href="#/sources">Sources</a></p>
    </article>`;
}

function panel(title, siglum, meta, original, english, note, extraClass = "", originalLang = "") {
  return `
    <article class="panel ${extraClass}">
      <header>
        <h3>${escapeHtml(title)}</h3>
        ${siglum ? `<span class="siglum">${escapeHtml(siglum)}</span>` : ""}
      </header>
      ${meta ? `<p class="meta">${escapeHtml(meta)}</p>` : ""}
      ${original ? cruxHtml(original, originalLang) : ""}
      ${english ? cruxHtml(english) : ""}
      ${note ? `<p class="note">${escapeHtml(note)}</p>` : ""}
    </article>`;
}

function renderStemma(stemma) {
  if (!stemma) return "";
  const byKind = {
    reconstructed: [],
    witness: [],
    change: [],
    now: [],
  };
  for (const n of stemma.nodes) {
    (byKind[n.kind] || byKind.witness).push(n);
  }
  const row = (nodes) =>
    nodes.length
      ? `<div class="stemma-row">${nodes
          .map((n) => `<div class="stemma-node ${n.kind}">${escapeHtml(n.label)}</div>`)
          .join("")}</div>`
      : "";
  return `
    <div class="stemma">
      ${row(byKind.reconstructed)}
      <div class="stemma-join"></div>
      ${row(byKind.witness.concat(byKind.change))}
      <div class="stemma-join"></div>
      ${row(byKind.now)}
    </div>`;
}

function renderSources(registry) {
  setNav("sources");
  const groups = [
    ["english", "Working language — English"],
    ["greek", "Control — Greek"],
    ["hebrew", "Control — Hebrew"],
  ];
  const blocks = groups
    .map(([lang, title]) => {
      const rows = registry.sources
        .filter((s) => s.lang === lang)
        .map(
          (s) => `<tr>
            <td>${escapeHtml(s.label)}</td>
            <td>${escapeHtml(s.status)}</td>
            <td>${escapeHtml(s.license)}</td>
            <td>${escapeHtml(s.role)}</td>
          </tr>`
        )
        .join("");
      return `<h2>${escapeHtml(title)}</h2>
        <table>
          <thead><tr><th>Source</th><th>Intake</th><th>License</th><th>Role</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>`;
    })
    .join("");
  app.innerHTML = `
    <article class="method">
      <div class="kicker">Corpus</div>
      <h1>Sources we will feed</h1>
      <p>${escapeHtml(registry.notes.english)}</p>
      <p>${escapeHtml(registry.notes.greek_hebrew)}</p>
      <p>${escapeHtml(registry.notes.chaldean)}</p>
      ${blocks}
      <p>Drop projects in <code>incoming/</code> or send a path. Nothing in this table is downloaded until you feed it.</p>
    </article>`;
}

function renderResidue(index) {
  setNav("residue");
  const cards = index.items
    .map((item) => {
      const href = item.passage ? `#/passage/${item.passage}` : "#/residue";
      const ready = item.status === "atlas";
      return `
        <a class="card ${ready ? "" : "queued"}" href="${href}">
          <div class="kicker">${escapeHtml(item.class)} · ${escapeHtml(item.ref)}</div>
          <h2>${escapeHtml(item.ref)}</h2>
          <p>${escapeHtml(item.english_collision)}</p>
          <div class="status ${ready ? "" : "queued"}">${escapeHtml(item.status)} · ${escapeHtml(item.confidence)}</div>
        </a>`;
    })
    .join("");
  app.innerHTML = `
    <section class="hero">
      <h1>${escapeHtml(index.title)}</h1>
      <p class="lead">${escapeHtml(index.definition)} English is the net. Greek and Hebrew are the court.</p>
    </section>
    <div class="grid">${cards}</div>`;
}

function renderPassage(p) {
  setNav("home");
  const now = p.now
    .map((n) => panel(n.label, n.family, null, null, n.text, n.note))
    .join("");
  const witnesses = p.witnesses
    .map((w) => panel(w.label, w.siglum, w.date, w.original, w.english, w.note, "", w.language))
    .join("");
  const rec = p.earliest_recoverable;
  const eso = p.esoteric
    .map(
      (e) => `
      <div class="eso">
        <h3>${escapeHtml(e.tradition)}</h3>
        <p>${escapeHtml(e.text)}</p>
        <p class="whisper">${escapeHtml(e.note)}</p>
      </div>`
    )
    .join("");
  const related = (p.related || [])
    .map((id) => `<a href="#/passage/${id}">${escapeHtml(id)}</a>`)
    .join("");

  app.innerHTML = `
    <header class="passage-head">
      <div>
        <div class="kicker">${escapeHtml(p.corpus)}</div>
        <h1>${escapeHtml(p.ref)}</h1>
        <p class="summary">${escapeHtml(p.summary)}</p>
      </div>
      <div class="badge" title="${escapeHtml(p.confidence.rationale)}">${escapeHtml(p.confidence.label)}</div>
    </header>

    <div class="section-kicker">Exoteric · how it is now</div>
    <h2 class="section-title">${escapeHtml(p.title)}</h2>
    <div class="columns">${now}</div>

    <div class="section-kicker">Exoteric · how it has been</div>
    <h2 class="section-title">Witnesses</h2>
    <div class="columns">${witnesses}</div>

    <div class="section-kicker">Earliest recoverable</div>
    <h2 class="section-title">Not the autograph. The oldest wording we can still defend.</h2>
    <div class="columns" style="grid-template-columns: 1fr;">
      ${panel("Reconstructed English", p.confidence.grade, rec.hebrew_model, null, rec.english, rec.claim + " " + rec.not_claimed, "recovered")}
    </div>

    <div class="section-kicker">Why the letters moved</div>
    <ul class="list">${p.why_it_changed.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

    <div class="section-kicker">Esoteric · how the crux was inhabited</div>
    <h2 class="section-title">Inner traditions</h2>
    ${eso}

    <div class="section-kicker">Stemma</div>
    <h2 class="section-title">Family of readings</h2>
    ${renderStemma(p.stemma)}

    <div class="section-kicker">Honest gaps</div>
    <ul class="list">${p.gaps.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

    ${related ? `<div class="section-kicker">Related units</div><p class="related">${related}</p>` : ""}

    <div class="section-kicker">Sources</div>
    <ul class="sources">${p.sources.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
    <p style="margin-top:2rem"><a href="#/">← Atlas</a></p>
  `;
}

async function route() {
  const r = parseRoute();
  try {
    if (r.name === "method") {
      renderMethod();
      return;
    }
    if (r.name === "sources") {
      renderSources(await loadJson("data/sources/registry.json"));
      return;
    }
    if (r.name === "residue") {
      renderResidue(await loadJson("data/residue/index.json"));
      return;
    }
    if (r.name === "passage") {
      const catalog = await loadJson("data/catalog.json");
      const entry = catalog.passages.find((p) => p.id === r.id && p.file);
      if (!entry) {
        app.innerHTML = `<p class="error">No ready unit named ${escapeHtml(r.id)}.</p>`;
        return;
      }
      const passage = await loadJson(`data/${entry.file}`);
      renderPassage(passage);
      return;
    }
    const catalog = await loadJson("data/catalog.json");
    renderHome(catalog);
  } catch (err) {
    app.innerHTML = `<p class="error">${escapeHtml(err.message)}. Serve this folder over HTTP (see README) rather than opening the file directly.</p>`;
  }
}

window.addEventListener("hashchange", route);
route();
