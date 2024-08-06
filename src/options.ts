import './shared/styles/globals.css'
import './shared/styles/options.css'

document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKey") as HTMLInputElement
  const saveBtn = document.getElementById("saveBtn") as HTMLElement

  chrome.storage.sync.get(["apiKey"], (result) => {
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey
    }
  })

  saveBtn.addEventListener("click", () => {
    const apiKey = apiKeyInput.value
    chrome.storage.sync.set({ apiKey }, () => {
      alert("Chave da API salva com sucesso!")
    })
  })
})
