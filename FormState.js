class FormState {
  constructor() {
    this.state = {};
    this.listeners = [];
  }

  init(domRoot) {
    Array.from(domRoot.querySelectorAll('form')).map(form => {
      let formKey = form.getAttribute('data-state-key');
      this.state[formKey] = {};
      let inputElements = Array.from(form.querySelectorAll('input'));

      // Initialize state
      inputElements.map(inputElement => {
        // Set initial values on synced elements
        this.__setOtherValues(form, inputElement);
        this.__maybeSetStateFromInputElement(this.state[formKey], inputElement);
      });

      // Register listeners for update
      inputElements.map(inputElement => {
        inputElement.addEventListener('input', e => {
          this.__maybeSetStateFromInputElement(
            this.state[formKey],
            inputElement,
          );
          this.__setOtherValues(form, inputElement);
          this.__triggerAllListeners();
        });
      });
    });

    this.__triggerAllListeners();
    return this;
  }

  updateDom(domRoot) {
    Array.from(domRoot.querySelectorAll('form')).map(form => {
      let formKey = form.getAttribute('data-state-key');
      Array.from(form.querySelectorAll('input')).map(inputElement => {
        let inputKey = inputElement.getAttribute('name');
        if (formKey === null || inputKey === null) return;
        inputElement.value = this.state[formKey][inputKey];
      });
    });
  }

  __setOtherValues(form, inputElement) {
    let inputElements = form.querySelectorAll(
      `input[name="${inputElement.getAttribute('name')}"]`,
    );
    Array.from(inputElements).map(element => {
      if (element !== inputElement) {
        element.value = inputElement.value;
      }
    });
  }

  __maybeSetStateFromInputElement(state, inputElement) {
    let name = inputElement.getAttribute('name');
    if (
      name === null ||
      (inputElement.type !== 'text' && inputElement.value === '')
    )
      return;
    state[name] = inputElement.value;
  }

  __triggerAllListeners() {
    for (let listener of this.listeners) {
      listener(this.state);
    }
  }

  onChange(listener) {
    this.listeners.push(listener);
    return this;
  }
}