# Handoff

In-progress Reconstruction Atlas. Not a finished design. Requirements still incoming.

## What this is

A local workbench to reconstruct earlier recoverable layers of the Bible using:

- **English** as the working language (public-domain Bibles collided verse by verse)
- **Greek and Hebrew** as control languages
- **Residue**: evidence that wording, a verse, a book, or a meaning used to be in a Bible and later moved
- Aramaic / Syriac / “Chaldee” parked for later

## Ready in-repo

- Atlas UI: `index.html`, `css/atlas.css`, `js/atlas.js`
- Passage units: `data/deut-32-8-9.json`, `data/deut-32-43.json`
- Residue seed: `data/residue/index.json`
- Source wishlist: `data/sources/registry.json` (nothing downloaded yet)
- Intake drop folder: `incoming/`

## Run

```powershell
python -m http.server 8765 --directory .
```

Open http://localhost:8765/

## Next expected input

The owner will feed existing projects (residue notes + public-domain-ish Bibles). Classify each into `incoming/`, do not invent verses, do not treat conspiracy as method.

## Do not

Polish the UI or expand the passage catalog until those source projects are ingested.
