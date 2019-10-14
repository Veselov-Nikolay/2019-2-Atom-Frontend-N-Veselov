const template = document.createElement('template');
template.innerHTML = `
  <style>
    .message {
      word-wrap: break-word;
      max-width: 240px;
      margin-bottom: 2px;
      padding: 12px 6px 6px 10px;
      background-color: #f3e6f5;
      border-radius: 5px;
      border-bottom-right-radius: 0;
      border: 1px solid #e4d7e4;
      text-align: center;
      color: rgba(0, 0, 0, 0.87);
      position: relative;
    }
    
    .message:before {
      content: '';
      transform: rotate(270deg);
      width: 0px;
      height: 0px;
      position: absolute;
      border-left: 5px solid #e4d7e4;
      border-right: 5px solid transparent;
      border-top: 5px solid #e4d7e4;
      border-bottom: 5px solid transparent;
      right: -11px;
      bottom: -1px;
    }

    .message:after {
      content: '';
      transform: rotate(270deg);
      width: 0px;
      height: 0px;
      position: absolute;
      border-left: 4px solid #f3e6f5;
      border-right: 4px solid transparent;
      border-top: 4px solid #f3e6f5;
      border-bottom: 4px solid transparent;
      right: -8px;
      bottom: 0px;
    }

    .time {
      display: block;
      text-align: right;
      font-size: 13px;
      color: rgba(25, 25, 25, 0.32);
    }

    .text {
      display: block;
      text-align: left;
    }
  </style>

  <div class='message'>
    <span class='text'></span>
    <span class='time'></span>
  </div>
`;

class Message extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$message = this.shadowRoot.querySelector('.message');
    this.$text = this.shadowRoot.querySelector('.text');
    this.$time = this.shadowRoot.querySelector('.time');

    this.dataTime = new Date(parseInt(this.getAttribute('time'), 10));
    this.dataText = this.getAttribute('text');
    this.dataAuthor = this.getAttribute('author');
  }

  connectedCallback() {
    this.$time.innerText = this.formatTime();
    this.$text.innerText = this.dataText;
  }

  static get observedAttributes() {
    return ['text', 'time', 'author'];
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
  }

  set time(time) {
    this.dataTime = new Date(parseInt(time, 10));
  }

  set text(text) {
    this.dataText = text;
  }

  set author(author) {
    this.dataAuthor = author;
  }

  formatTime() {
    const hours = this.dataTime.getHours();
    const minutes = this.dataTime.getMinutes();

    return `${hours > 9 ? '' : 0}${hours}:${minutes > 9 ? '' : 0}${minutes}`;
  }
}

customElements.define('message-bubble', Message);
