# Incoming projects

Drop folders, zips, git clones, or paste a path/URL in chat.

The atlas does not ingest a dump blindly. Each intake is classified as:

| Kind | What it is | What we keep |
|---|---|---|
| `english-bible` | A public-domain or clearly licensed English Bible | Verse-aligned text + license note |
| `residue` | Notes, apparatuses, lists of dropped/changed readings | Structured residue records |
| `greek` | LXX, NT editions, apparatuses | Control text, not the working language |
| `hebrew` | MT / WLC / diplomatic Hebrew | Control text |
| `aramaic` | Biblical Aramaic, Targum, Syriac/Peshitta, older “Chaldee” | Parked until English + Greek + Hebrew are loaded |
| `mixed` | A repo that contains more than one of the above | Split on intake |

Name the folder after the project (`incoming/geneva-1599/`, `incoming/kjv-1769/`, `incoming/your-residue-notes/`). A one-line `SOURCE.txt` in the folder helps: origin, license, and what you think it is good for.
