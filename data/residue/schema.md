# Residue

**Residue** is evidence that wording, a verse, a book, or a meaning used to be in a Bible and later moved: dropped, added, substituted, renamed, or exiled to a footnote.

English is the net. Greek and Hebrew are the court.

## Discovery

1. Align public-domain English Bibles on a verse.
2. If they disagree, do not “fix” the English. Classify the collision.
3. Open Greek and/or Hebrew only after the English collision is named.
4. Write a residue record. Optionally promote it to a full atlas passage.

## Collision classes

| Class | English symptom | Typical cause |
|---|---|---|
| `omission` | Older English has words later English lost | TR vs critical NT; LXX vs MT; scribal skip |
| `addition` | Later or other-tradition English has extra words | Same forks, other direction |
| `substitution` | Same verse, different key word | בני ישראל / בני אלהים; pierced / like a lion |
| `canon` | A book present in 1611, Douay, or Ethiopia, absent now | Apocrypha / deuterocanon / Enoch |
| `versification` | Same text, different verse numbers | Psalm 22/23; Jeremiah chapter order |
| `translation` | Source agrees; English smoothing disagrees | Tense, divine names, “angels” for “gods” |
| `reception` | Midrash, liturgy, or NT citation remembers a reading the printed OT dropped | Hebrews 1:6; PRE on Deut 32:8 |

## Record shape

See `index.json`. Required: `id`, `ref`, `class`, `english_collision`, `status`.

Greek/Hebrew fields stay empty until that desk is open. Do not backfill from memory if the incoming project already has the letters.
