chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    // Desativa a ação da extensão por padrão
    chrome.action.disable()

    // Define as regras do declarativeContent
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostContains: "pje.tjmg.jus.br" },
            }),
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()],
        },
      ])
    })

    chrome.storage.sync.set({ apiKey: "" }, () => {
      void console.log("Chave de API inicializada.")
    })

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.runtime.openOptionsPage()
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
      const manifestVersion = chrome.runtime.getManifest().version
      if (manifestVersion) {
        console.log(`Extensão atualizada para a versão ${manifestVersion}`)
      }
    }
  },
)
