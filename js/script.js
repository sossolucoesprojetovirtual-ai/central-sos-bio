/* =========================================================================
   CENTRAL SOS SOLUÇÕES — interação
   Abre o painel de cada produto sem recarregar a página, usando o hash da
   URL (#nextgaragem, #rappaiz, #flyvarejo, #plugdfe) para que o botão
   "voltar" do celular/navegador também feche o painel corretamente.
   ========================================================================= */

(function () {
  "use strict";

  var appEl = document.querySelector(".app");
  var homeView = document.querySelector(".home-view");
  var panels = document.querySelectorAll(".product-panel");
  var openTriggers = document.querySelectorAll("[data-open-product]");
  var closeTriggers = document.querySelectorAll("[data-close-panel]");

  /** Retorna o elemento do painel pelo id do produto, ou null. */
  function getPanel(productId) {
    return document.getElementById("panel-" + productId);
  }

  /** Fecha qualquer painel aberto no momento. */
  function closeAllPanels() {
    panels.forEach(function (panel) {
      panel.setAttribute("data-open", "false");
      panel.setAttribute("aria-hidden", "true");
    });
    if (appEl) appEl.setAttribute("data-panel-open", "false");
    if (homeView) homeView.setAttribute("aria-hidden", "false");
  }

  /** Abre o painel de um produto e move o foco para o título, por acessibilidade. */
  function openPanel(productId) {
    var panel = getPanel(productId);
    if (!panel) return;

    panels.forEach(function (p) {
      if (p !== panel) {
        p.setAttribute("data-open", "false");
        p.setAttribute("aria-hidden", "true");
      }
    });

    panel.setAttribute("data-open", "true");
    panel.setAttribute("aria-hidden", "false");
    if (appEl) appEl.setAttribute("data-panel-open", "true");
    if (homeView) homeView.setAttribute("aria-hidden", "true");

    var heading = panel.querySelector("[data-panel-focus]");
    if (heading) {
      // Pequeno atraso para não brigar com a transição de entrada.
      window.setTimeout(function () {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }, 320);
    }
    panel.scrollTop = 0;
  }

  /** Sincroniza a interface com o hash atual da URL. */
  function syncWithHash() {
    var id = window.location.hash.replace("#", "");
    if (id && getPanel(id)) {
      openPanel(id);
    } else {
      closeAllPanels();
    }
  }

  // Clique num card de produto -> atualiza o hash (dispara syncWithHash via hashchange)
  openTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var id = trigger.getAttribute("data-open-product");
      window.location.hash = id;
    });
  });

  // Clique em "Voltar" -> volta no histórico se possível, senão limpa o hash
  closeTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      if (window.history.length > 1 && window.location.hash) {
        window.history.back();
      } else {
        closeAllPanels();
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  });

  window.addEventListener("hashchange", syncWithHash);

  // Estado inicial (permite compartilhar um link direto para um produto)
  syncWithHash();

  /* -----------------------------------------------------------------------
     Espaço reservado para integrações futuras (Google Analytics / Meta Pixel).
     Quando os scripts de rastreamento forem adicionados no <head> do
     index.html, descomente e ajuste os nomes de evento abaixo para registrar
     cliques nos produtos e no botão de WhatsApp.
  ----------------------------------------------------------------------- */
  // openTriggers.forEach(function (trigger) {
  //   trigger.addEventListener("click", function () {
  //     var produto = trigger.getAttribute("data-open-product");
  //     if (typeof gtag === "function") {
  //       gtag("event", "select_content", { content_type: "produto", item_id: produto });
  //     }
  //     if (typeof fbq === "function") {
  //       fbq("trackCustom", "AbriuProduto", { produto: produto });
  //     }
  //   });
  // });
})();
