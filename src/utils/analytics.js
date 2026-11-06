const GA_MEASUREMENT_ID = "G-14P57CY0XJ";

let analyticsLoaded = false;

// Only called after the visitor accepts the cookie banner (or on a later
// visit, if that choice was already stored) — never on page load by
// default. Injects gtag.js itself, so declining never even fires a
// request to Google.
export const loadAnalytics = () => {
  if (analyticsLoaded || typeof window === "undefined") return;
  analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

export const trackEvent = (name, params) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};
