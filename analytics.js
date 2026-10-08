(() => {
  const measurementId = "G-3JFWLQBEKS";
  const preferenceKey = "skilllaunchpad-analytics-choice";
  const state = { loaded: false };

  function readChoice() {
    try { return localStorage.getItem(preferenceKey); } catch { return null; }
  }

  function clearAnalyticsCookies() {
    const cookies = document.cookie.split(";");
    for (const item of cookies) {
      const name = item.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_")) {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}; SameSite=Lax`;
      }
    }
  }

  function loadAnalytics() {
    if (state.loaded) return;
    state.loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(tag);
  }

  const panel = document.createElement("section");
  panel.className = "sl-consent";
  panel.setAttribute("aria-label", "Analytics privacy choices");
  panel.setAttribute("aria-live", "polite");
  panel.innerHTML = '<div class="sl-consent-copy"><strong>Help us improve SkillLaunchpad</strong><p>Optional Google Analytics measures visits and page interactions. It starts only when you choose Accept. These controls apply to analytics only; ads are not currently displayed. If ads are added, a separate advertising consent message will be configured before ads are served where required. <a href="/privacy.html">Privacy details</a></p></div><div class="sl-consent-actions"><button type="button" data-sl-reject>Reject analytics</button><button type="button" data-sl-accept>Accept analytics</button></div>';
  const trigger = document.createElement("button");
  trigger.className = "sl-consent-trigger";
  trigger.type = "button";
  trigger.textContent = "Analytics choices";
  trigger.setAttribute("aria-label", "Change analytics choices");
  document.body.append(panel, trigger);

  function storeChoice(value) {
    try { localStorage.setItem(preferenceKey, value); } catch { /* Keep the panel available if storage is blocked. */ }
    if (value === "accepted") loadAnalytics();
    else {
      if (state.loaded && typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied"
        });
      }
      clearAnalyticsCookies();
    }
    panel.hidden = true;
  }

  panel.querySelector("[data-sl-accept]").addEventListener("click", () => storeChoice("accepted"));
  panel.querySelector("[data-sl-reject]").addEventListener("click", () => storeChoice("rejected"));
  trigger.addEventListener("click", () => { panel.hidden = !panel.hidden; });

  const choice = readChoice();
  panel.hidden = Boolean(choice);
  if (choice === "accepted") loadAnalytics();
})();