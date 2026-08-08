# Repository workflow

- This is a single-developer repository. Use `master` as the only development and release branch.
- Do not create feature branches, agent branches, pull-request branches, or `gh-pages` branches unless the user explicitly reverses this policy.
- Make reviewable, reversible commits directly on `master` and push `master` to publish.
- Use the repository commit hook for automatic semantic versions. Every normal commit increments `VERSION` and prefixes its subject with `vMAJOR.MINOR.PATCH:`; never type or increment the version manually.
- Before publishing, preserve unrelated work, run relevant tests, and confirm the GitHub Pages deployment succeeds.
