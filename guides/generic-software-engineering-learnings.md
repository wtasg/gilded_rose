# Universal Principles of Software Engineering & System Design

This document outlines high-level, language-agnostic software engineering principles applicable across any tech stack, project scale, or domain.

---

## 1. Root Cause Analysis vs. Surface Symptom Patching

> Principle: Fix the underlying system contract break, not just the crash site.

- The Mistake: Wrapping a failing function call in a silent `try / catch` or returning a dummy fallback without investigating why data was missing or why state reset.
- The Best Practice: Trace upstream data flows. If a UI property access crashes, check why that property was `undefined` in storage or state hydration. Fix both the UI defense (`?.`) and the upstream data persistence layer.

---

## 2. Empirical Verification Before Declaring Success

> Principle: Code editing is not completion; empirical runtime execution is completion.

- The Mistake: Assuming a bug is fixed because a line of code was edited.
- The Best Practice: Always execute automated tests (`npm test`, `go test`) and observe the application in a real environment (Headless Chrome / Playwright) to confirm the fix works visually and functionally.

---

## 3. Test Isolation & Environmental Reproducibility

> Principle: Tests must be self-contained, idempotent, and state-clean.

- The Mistake: Writing tests that rely on pre-existing database state or pass only when run in a specific order.
- The Best Practice: Every test spec should clear its storage (`localStorage.clear()`, `indexedDB.deleteDatabase()`) and seed its own data in `beforeEach()`. Tests should yield identical results regardless of execution count or environment.

---

## 4. Designing for Boundary Conditions (0, 1, N)

> Principle: User interfaces must gracefully render empty states, single items, and large datasets.

- 0 Items: Display actionable, human-friendly empty state messages (`No runs recorded yet.`). Never show blank boxes or raw zero metrics.
- 1 Item: Adapt visualizations that require multiple data points (e.g. trend charts needing 2+ points) by rendering helpful fallback messages (`Need at least 2 runs for trend charts.`).
- N Items: Use pagination, scrolling, or domain sampling to render large datasets smoothly without UI lag.

---

## 5. Security Enforced at the Perimeter

> Principle: Never trust client inputs; enforce strict boundary constraints at the API gateway.

- CORS Validation: Restrict Cross-Origin Resource Sharing (CORS) headers to verified origins rather than using wildcard `*` headers.
- Resource Caps: Enforce explicit HTTP request body limits (`MaxBytesReader`) to prevent Denial of Service (DoS) memory exhaustion.
- Domain Restrictions: Disable server network calls when running on public static hosts (e.g. `github.io`) to prevent unexpected CORS failures and data leaks.

---

## 6. Progressive Enhancement & Offline-First UX

> Principle: Core app functionality should remain usable even when network services are unavailable.

- Cache critical metadata locally (`localStorage`) and store rich objects in client-side databases (`IndexedDB`).
- Provide clear visual indicators (`Online` vs `Offline`) so users understand sync status without losing work.

---

## 7. Single Source of Truth for Business Logic

> Principle: Don't repeat calculation or formatting rules across multiple UI components.

- Keep data aggregation logic (such as average calculations, date cutoff filtering, and metric rounding) in shared, testable utility modules.
- UI components should focus on rendering state rather than implementing raw data calculations.
