# visibility-lock
Lock DOM element visibility using `MutationObserver`, ensuring that external DOM mutations cannot hide or alter a target element.

---

## Installation
```bash
npm install visibility-lock
```

---

## Usage
```js
import { createVisibilityLock } from 'visibility-lock';

const lock = createVisibilityLock('my-element', 'locked');

lock.enable();

// later
lock.disable();
```

---
## API

### `createVisibilityLock(targetId, lockClass)`
Creates a controller that enforces visibility on a DOM element.

#### Parameters
- `targetId` (`string`) — ID of the target element
- `lockClass` (`string`) — CSS class applied while lock is active

#### Returns
```ts
{
  enable: () => void;
  disable: () => void;
}
```

---

## How It Works
- Uses `MutationObserver` to monitor:
  - `class`
  - `style`
  - `hidden` attributes
- Automatically restores:
  - `display: block`
  - `visibility: visible`
  - `opacity: 1`
- Re-applies the provided CSS class if removed

---

## TypeScript Support
This library is written in JavaScript but provides full TypeScript support via generated declaration files (`.d.ts`).

### Generate Type Definitions
Type definitions are generated from JSDoc using TypeScript.

#### 1. Install dependencies
```bash
npm install
```

#### 2. Run TypeScript compiler
```bash
npx tsc
```

This will generate:

```
dist/index.d.ts
```

---

### Required `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "strict": true,
    "allowJs": true,
    "checkJs": true
  },
  "include": ["src/**/*"]
}
```

---

## Build
```bash
npm run build
```

Outputs:
- `dist/index.js` (ESM)
- `dist/index.cjs` (CommonJS)
- `dist/index.d.ts` (TypeScript types)

---

## Local Development

### Build the library
```bash
npm run build
```

### Link locally
```bash
npm link
```

In another project:

```bash
npm link visibility-lock
```

---

## Notes
- Browser-only (safe-guarded for SSR environments)
- No framework dependencies
- Lightweight and tree-shakeable

---

## License
MIT
