# Passage schema

Each reconstruction unit is one JSON file in `data/`. The catalog is `data/catalog.json`.

A unit is not “the original Bible.” It is a controlled comparison of:

1. **now** — how common printed Bibles read today
2. **has been** — what surviving witnesses actually attest
3. **earliest recoverable** — the best-supported older form, with a confidence grade
4. **esoteric** — how inner-reading traditions inhabited the same crux
5. **gap** — what this method cannot recover

## Confidence

- `high` — multiple independent witnesses; the direction of change is well explained
- `medium` — a strong case, but the wording or motive is debated
- `low` — model, not manuscript (source criticism, conjectural emendation)

## Crux markup

In `text` fields, wrap the disputed words:

```
according to the number of the [[crux]]sons of Israel[[/crux]]
```
