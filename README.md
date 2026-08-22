# Reconstruction Atlas

A workbench for reading the Bible as it is now, as it has been, and as far back as the witnesses still let us go.

This is not a claim to print the one true autograph. No autograph survives. The atlas reconstructs the **earliest recoverable form** of a passage, shows how common printed Bibles got there, and keeps inner-reading traditions in the same view without letting them forge letters.

## Two technologies, one desk

**Exoteric** — manuscripts, versions, stemmatics: Masoretic Text, Dead Sea Scrolls, Septuagint, Samaritan Pentateuch, quotations.

**Esoteric** — how communities inhabited the crux: divine-council cosmology, midrash that remembers a dropped reading, the renaming of gods as angels.

## Ready units

- [Deuteronomy 32:8–9](data/deut-32-8-9.json) — nations allotted by Israel’s census, or by the sons of God
- [Deuteronomy 32:43](data/deut-32-43.json) — the ending Hebrews still quotes and many Old Testaments no longer print

Queued next: Jeremiah’s two editions, Genesis 1–2, Psalm 22:16, Mark 16, 1 Enoch / Jude.

## Run it

From this folder:

```powershell
python -m http.server 8765
```

Then open http://localhost:8765/

Opening `index.html` as a file will fail: the atlas loads JSON with `fetch`.

## Languages

- **English** — working language. Public-domain Bibles are collided verse by verse. Apparent error is a pointer.
- **Greek and Hebrew** — control languages. They classify an English collision (style vs source-text vs canon).
- **Aramaic / Syriac / Chaldee** — parked. In older English, “Chaldee” usually means Biblical Aramaic, not a third original.

## Residue

Residue is evidence that wording, a verse, a book, or a meaning used to be in a Bible and later moved. Seed index: `data/residue/index.json`. Schema: `data/residue/schema.md`.

## Feed a project

Put a folder, zip, or clone in `incoming/` (see `incoming/README.md`), or send a path/URL in chat. Wanted sources are listed in `data/sources/registry.json`. Nothing is downloaded until you feed it.

## Add a passage

1. Copy `data/deut-32-8-9.json` and follow `data/schema.md`.
2. Register it in `data/catalog.json` with `"status": "ready"` and a `"file"`.
3. Wrap disputed words in `[[crux]]…[[/crux]]`.
