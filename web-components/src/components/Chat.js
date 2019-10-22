const template = document.createElement('template');
template.innerHTML = `
  <style>
    .chat {
      box-sizing: border-box;
      padding: 14px;
      background: rgba(0, 0, 0, 8%);
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      overflow: scroll;
      height: 100%;
    }
    :host {
      overflew: hidden;
      max-height: 100%;
      height: 100%;
    }
  </style>
  <div class='chat'></div>
`;

class Chat extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$chat = this.shadowRoot.querySelector('.chat');
  }

  connectedCallback() {
    const messages = localStorage.getItem('messages');
    this.messages = messages ? JSON.parse(messages) : [];
    this.messages.forEach((item) => {
      this.renderMessage(item.text, item.time, item.author);
    });
  }

  updateLocalStorage(text, time, author) {
    this.messages.push({ text, time, author });
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  renderMessage(text, time, author) {
    const $message = document.createElement('message-bubble');
    $message.setAttribute('text', text);
    $message.setAttribute('time', time);
    $message.setAttribute('author', author);
    this.$chat.appendChild($message);
  }

  appendMessage(text, time, author) {
    this.renderMessage(text, time, author);
    this.updateLocalStorage(text, time, author);
    this.$chat.scrollTop = this.$chat.scrollHeight;
  }
}

customElements.define('chat-block', Chat);
