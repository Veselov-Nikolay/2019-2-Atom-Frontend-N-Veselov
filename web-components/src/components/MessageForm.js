const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  </style>
 
  <div class='container'>

    <chat-block></chat-block>

    <form>
      <form-input class='input' name='message-text'></form-input>
    </form>
  </div>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this.shadowRoot.querySelector('form');
    this.$input = this.shadowRoot.querySelector('form-input');
    this.$chat = this.shadowRoot.querySelector('chat-block');
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.$input.value !== '') {
      this.$chat.appendMessage(this.$input.value, Date.now(), 'user');
      this.$input.value = '';
    }
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.$form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
