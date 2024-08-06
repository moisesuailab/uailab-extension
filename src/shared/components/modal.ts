const modalDocumento = (): void => {
  const el = document.querySelector<HTMLElement>(
    ".nav.nav-pills.btn-documento.pull-right",
  )
  const modalFrame = document.getElementById("document-modal-frame")
  const modalButton = document.getElementById("download-documento-simplificado")

  if (el && !modalButton) {
    if (!modalFrame) {
      createModal()
    } else {
      createDownloadButton()
    }
  }
}

const createModal = (): void => {
  const modalStyle = `
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0,0,0,0.4);
        padding: 20px;
      }
      .modal-content {
        background-color: #fefefe;
        margin: 5% auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        max-width: 1024px;
        border-radius: 8px;
        overflow: hidden;
        height: 80vh;
        display: flex;
        flex-direction: column;
      }
      .modal-header {
        padding: 10px;
        background-color: #fff;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 84px;
      }
  
      .modal-header h2 {
        font-weight: 600;
      }
  
      .modal-header .close {
        color: #516280;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        width: 48px;
        text-align: end;
      }
      .modal-header .close:hover,
      .modal-header .close:focus {
        color: black;
        text-decoration: none;
      }
      .modal-body {
        padding: 0;
        flex: 1;
        position: relative;
      }
      .modal-footer {
        padding: 10px;
        background-color: #fff;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #e5e5e5;      
        position: relative;
        max-height: 84px;
      }
      .modal-footer button {
        background-color: #0078aa;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;      
      }
      .modal-footer button:hover {
        background-color: #005f7a;
      }
      #modal-iframe {
        width: 100%;
        height: 100%;
        margin: 0 auto;      
        outline: none;
        display: none;
      }
      .loading {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `

  const modalHtml = `
      <div id="document-modal-frame" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <img src="${chrome.runtime.getURL("assets/icons/logo48.png")}" alt="UAILab - logo">
            <h2>Documento em linguagem simples</h2>
            <span class="close">&times;</span>
          </div>
          <div class="modal-body">
            <div class="loading">Carregando...</div>
            <iframe src="" id="modal-iframe"></iframe>
          </div>
          <div class="modal-footer">
            <button id="footer-button">Download</button>
          </div>
        </div>
      </div>
    `

  const style = document.createElement("style")
  style.innerHTML = modalStyle
  document.head.appendChild(style)

  document.body.insertAdjacentHTML("beforeend", modalHtml)

  createDownloadButton()
}

const createDownloadButton = (): void => {
  const el = document.querySelector<HTMLElement>(
    ".nav.nav-pills.btn-documento.pull-right",
  )
  const modalButton = document.createElement("li")
  modalButton.id = "download-documento-simplificado"
  modalButton.innerHTML = `
      <a href="#" title="Linguagem simples">
        <i class="fas fa-external-link-square-alt" style="font-size: 18px;"></i>
      </a>
    `
  if (el) {
    el.appendChild(modalButton)
    modalButton.addEventListener("click", openModal)
  }
}

const openModal = (): void => {
  const modal = document.getElementById("document-modal-frame") as HTMLElement
  const loading = modal.querySelector(".loading") as HTMLElement
  const iframe = modal.querySelector("#modal-iframe") as HTMLIFrameElement

  modal.style.display = "block"
  iframe.style.display = "none"
  loading.style.display = "flex"

  setTimeout(() => {
    loading.style.display = "none"
    iframe.src = chrome.runtime.getURL("modelos/sentenca/index.html")
    iframe.style.display = "block"
  }, 1000)

  const closeModal = (): void => {
    modal.style.display = "none"
  }

  const span = modal.querySelector(".close") as HTMLElement
  span.addEventListener("click", closeModal)

  window.addEventListener("click", (event: MouseEvent) => {
    if (event.target === modal) {
      closeModal()
    }
  })
}

modalDocumento()

const targetElement = document.querySelector(
  "form#detalheDocumento",
) as HTMLElement
const observer = new MutationObserver(() => {
  modalDocumento()
})
observer.observe(targetElement, { childList: true, subtree: true })
