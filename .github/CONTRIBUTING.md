# Contributing to Horalix P2P

Thanks for wanting to make Horalix P2P better. Here's everything you need to know.

## Before You Start

- Search existing issues before opening a new one
- For big changes, open an issue first to discuss approach
- One feature / fix per pull request — keep PRs focused

## Development Setup

```bash
git clone https://github.com/Kerim-Sabic/horalixp2pvibe.git
cd horalixp2pvibe
go run build.go build
./horalix
```

UI lives in `gui/default/`. Core engine is in `lib/`. Protocol in `lib/protocol/`.

## Making Changes

```bash
git checkout -b feat/your-feature   # or fix/your-fix
# make changes
go test ./...                       # all tests must pass
go vet ./...                        # no vet warnings
```

## Pull Request Checklist

- [ ] Tests pass: `go test ./...`
- [ ] No new vet warnings: `go vet ./...`
- [ ] UI changes look good in dark mode
- [ ] Updated relevant docs / README sections
- [ ] Clear PR title and description

## Code Style

- Go: follow standard `gofmt` formatting
- JS: vanilla ES5, no build step, no dependencies
- CSS: add to `horalix.css`, use existing CSS variables

## Reporting Security Issues

**Do not open a public issue.** Use GitHub's private [Security Advisory](../../security/advisories/new) tool.

---

*We appreciate every contribution, no matter how small.*
