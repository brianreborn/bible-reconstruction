# Incoming projects

Drop folders, zips, git clones, or paste a path/URL in chat.

The atlas does not ingest a dump blindly. Each intake is classified as:

| Kind | What it is | What we keep |
|---|---|---|
| `english-bible` | A public-domain or clearly licensed English Bible | Verse-aligned text + license note |
| `residue` | Notes, apparatuses, lists of dropped/changed readings | Structured residue records |
| `greek` | LXX, NT editions, apparatuses | Control text |
| `hebrew` | MT / WLC / diplomatic Hebrew | Control text |
| `aramaic` | Biblical Aramaic, Targums, Qumran Aramaic | Control text (in-Bible and versions) |
| `chaldean` | KJV Chaldee labels, Kasdim/Babylon context | Keep language-name and people distinct |
| `syriac` | Peshitta and related | Christian Aramaic version |
| `phoenician` | Phoenician inscriptions, Paleo-Hebrew | Alphabet and sister language |
| `cuneiform` | Ugaritic; Akkadian (Babylon/Assyria) | Comparative and imperial literature |
| `mixed` | A repo that contains more than one of the above | Split on intake |

Name the folder after the project (`incoming/geneva-1599/`, `incoming/kjv-1769/`, `incoming/your-residue-notes/`). A one-line `SOURCE.txt` in the folder helps: origin, license, and what you think it is good for.
