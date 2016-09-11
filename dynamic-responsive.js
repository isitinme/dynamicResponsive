/* Dynamic Responsive */

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

// es2015+ upd of https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshhold = 250, scope) {
  let last;
  let deferTimer;
  return (...args) => {
    const context = scope;
    const now = +new Date();
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export default class DynamicResponsive {
  constructor(element) {
    this.element = element;
    this.styles = getComputedStyle(element);
    this.rules = [];
    this.inited = false;
    this.handler = null;
  }

  setResize(key, newWidth, def, val) {
    const perc = (newWidth * 100) / def;
    this.element.style[key] = `${(val * perc) / 100}px`;
  }

  applyCSS(styles) {
    Object.keys(styles).forEach((key) => {
      const keyNormalized = toCamelCase(key);
      this.element.style[keyNormalized] = styles[key];
    });
  }

  main() {
    const nww = document.documentElement.clientWidth;
    for (let i = 0, rulesLength = this.rules.length; i < rulesLength; i++) {
      if (this.rules[i].breakpoint && (nww <= this.rules[i].breakpoint.point)) {
        this.setResize(this.rules[i].prop, nww, this.rules[i].breakpoint.point,
          this.rules[i].breakpoint.value);
        this.applyCSS(this.rules[i].breakpoint.styles);
      } else {
        this.setResize(this.rules[i].prop, nww, this.rules[i].dww,
          this.rules[i].dev);
        this.applyCSS(this.rules[i].old);
      }
    }
  }

  exec(prop, normal, breakpoint) {
    const rule = {};
    rule.dev = parseInt(this.styles[prop], 10);
    rule.prop = toCamelCase(prop);
    rule.dww = normal || document.documentElement.clientWidth;
    rule.old = {};
    if (breakpoint) {
      rule.breakpoint = breakpoint;
      if (breakpoint.styles) {
        Object.keys(breakpoint.styles).forEach((key) => {
          rule.old[key] = this.styles[key];
        });
      }
    }

    this.rules.push(rule);

    this.main();

    if (!this.inited) {
      // perf fix with throttling
      this.handler = throttle(this.main, 100, this);
      window.addEventListener('resize', this.handler);
      this.inited = true;
    }

    return this;
  }

  detouch() {
    window.removeEventListener('resize', this.handler);
    this.inited = false;
  }
}
