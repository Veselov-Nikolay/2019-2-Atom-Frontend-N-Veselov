const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      color: rgba(25, 25, 25, 0.32);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: 11px 16px;
      background: #fff;
      max-height: 60px;
      box-sizing: border-box;
      border-top: 1px solid rgba(25, 25, 25, 0.32);
    }
    .textarea {
      color: rgba(0, 0, 0, 0.87);
      padding: 0;
      resize: none;
      border: none;
      outline: none;
      height: 100%;
      width: 100%;
      font-size: 16px;
      font-family: Arial, sans-serif;
    }
    .textarea::-webkit-scrollbar {
      width: 0;
    }
    .textarea {
      overflow: -moz-scrollbars-none;
    }
    .textarea {
      -ms-overflow-style: none;
    }
    .fake-placeholder {
      position: absolute;
      font-size: 17px;
      line-height: 16px;
      vertical-align: middle;
    }
    .hidden {
      display: none;
    }
    button {
      flex-shrink: 0;
      padding: 0;
      margin: 0;
      outline: 0;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
    }
    .attachments-button {
      max-width: 22px;
      margin-left: 10px;
      margin-right: -4px;
    }
    .send-button::after {
      content: '';
      border: 10px solid transparent;
      border-left: 22px solid #8e24aa;
      display: inline-block;
      width: 0;
      height: 0;
      position: relative;
      right: -14px;
    }
    .send-button::before {
      content: '';
      border: 2px solid transparent;
      border-left: 18px solid #fff;
      display: inline-block;
      width: 0;
      height: 0;
      position: relative;
      right: -32px;
      z-index: 1;
    }
  </style>
  <div class='container'>
    <span class='fake-placeholder'>Сообщение</span>
    <textarea class='textarea' type='text'></textarea>
    <button class='attachments-button'>
      <svg width='22' height='22' style='transform: scale(1, -1) rotate(225deg);' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' width='32px' height='32px' viewBox='0 0 32 32' enable-background='new 0 0 32 32' xml:space='preserve'>
        <path id='clip_2_' fill='#191919' d='M29.363,4.637c-3.514-3.516-9.213-3.516-12.727,0L2.046,19.054c-2.729,2.729-2.729,7.171,0,9.9  c2.729,2.729,7.17,2.729,9.898,0l14.59-14.418c1.953-1.953,1.953-5.118,0-7.071c-1.953-1.952-5.119-1.952-7.07,0L8.496,18.433  c-0.391,0.392-0.391,1.023,0,1.415c0.391,0.391,1.023,0.391,1.414,0L20.879,8.879c1.17-1.169,3.072-1.169,4.242,0  c1.17,1.17,1.17,3.073,0,4.243l-14.59,14.417c-1.953,1.953-5.117,1.953-7.07,0c-1.953-1.952-1.953-5.118,0-7.07L17.908,6.192  c2.734-2.734,7.168-2.734,9.898,0c2.736,2.735,2.736,7.165,0.002,9.899L16.982,26.918c-0.393,0.392-0.393,1.023,0,1.414  c0.391,0.392,1.023,0.392,1.414,0l10.967-10.968C32.879,13.85,32.879,8.151,29.363,4.637z'/>
      </svg>
      <button class='send-button hidden'></button>
    </button>
  </div>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('.textarea');
    this.$container = this.shadowRoot.querySelector('.container');
    this.$placeholder = this.shadowRoot.querySelector('.fake-placeholder');
    this.$sendButton = this.shadowRoot.querySelector('.send-button');

    this.$input.addEventListener('focus', this.onFocus.bind(this));
    this.$input.addEventListener('blur', this.onBlur.bind(this));
    this.$input.addEventListener('input', this.onInput.bind(this));
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$input.setAttribute(name, newValue);
  }

  get value() {
    return this.$input.value;
  }

  set value(val) {
    this.$input.value = val;
    this.$input.dispatchEvent(new Event('input'));
  }

  onFocus() {
    this.$placeholder.classList.add('hidden');
  }

  onBlur() {
    if (this.$input.value === '') {
      this.$sendButton.classList.add('hidden');
      this.$placeholder.classList.remove('hidden');
    }
  }

  onInput() {
    if (this.$input.value === '') {
      this.$sendButton.classList.add('hidden');
    } else {
      this.$sendButton.classList.remove('hidden');
    }
  }
}

customElements.define('form-input', FormInput);
