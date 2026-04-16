/**
 * @typedef {Object} VisibilityLockController
 * @property {() => void} enable
 * @property {() => void} disable
 */

/**
 * @param {string} targetId
 * @param {string} lockClass
 * @returns {VisibilityLockController}
 */
export function createVisibilityLock(targetId, lockClass) {
  /** @type {HTMLElement | null} */
  let el = null;

  /** @type {MutationObserver | null} */
  let observer = null;

  const enforce = () => {
    if (!el) return;

    if (!el.classList.contains(lockClass)) {
      el.classList.add(lockClass);
    }

    el.removeAttribute('hidden');

    if (el.style.display !== 'block') el.style.display = 'block';
    if (el.style.visibility !== 'visible') el.style.visibility = 'visible';
    if (el.style.opacity !== '1') el.style.opacity = '1';
  };

  const enable = () => {
    if (typeof document === 'undefined') return;

    el = document.getElementById(targetId);
    if (!el) return;

    enforce();

    observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (
          m.type === 'attributes' &&
          (m.attributeName === 'class' ||
            m.attributeName === 'style' ||
            m.attributeName === 'hidden')
        ) {
          enforce();
          break;
        }
      }
    });

    observer.observe(el, {
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden'],
    });
  };

  const disable = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (el) {
      el.classList.remove(lockClass);
    }
  };

  return { enable, disable };
}
