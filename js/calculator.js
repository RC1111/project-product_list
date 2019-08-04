class Calculator {
  constructor(wrapper, options) {
    this.wrapper = document.querySelector(wrapper);
    if (this.wrapper) {
      this.input = this.wrapper.querySelector(options.input);
      this.result = this.wrapper.querySelector(options.result);
      this.controls = this.wrapper.querySelectorAll("[data-control]");
      this.init();
    }
  }

  init() {
    //Listen input change and Enter button
    ["input", "keyup"].forEach(type => {
      this.input.addEventListener(
        type,
        event => {
          if (type == "input" || event.keyCode == 13) {
            this.calc(false, result => {
              if (event.keyCode === 13) {
                this.input.value = result;
              }
            });
          }
        },
        false
      );
    });

    //Listen keyboard click
    this.controls.forEach(control => {
      control.addEventListener("click", item => {
        let key = item.target.dataset.control;
        switch (key) {
          case "backspace":
            this.backspace(() => {
              this.calc();
            });
            break;
          case "=":
            this.calc(false, result => {
              this.input.value = result;
            });
            break;
          default:
            this.input.value = this.input.value + key;
            this.calc();
            break;
        }
      });
    });
  }

  //Calculate
  calc(expression, callback) {
    if (!expression) {
      expression = this.input.value;
    }
    try {
      let result = new Function("return " + expression)();
      this.updateResult(result);
      if (typeof callback == "function") {
        callback(result);
      }
    } catch (error) {
      if (error.constructor.name == "SyntaxError") {
        this.updateResult("...");
      }
    }
  }

  //Draw result
  updateResult(result) {
    this.result.innerHTML =
      typeof result == "number" || result == "..." ? result : "";
  }

  //Backspace button
  backspace(callback) {
    this.input.value = this.input.value.slice(0, -1);
    if (typeof callback == "function") {
      callback();
    }
  }
}

/* Usage example */
document.addEventListener("DOMContentLoaded", () => {
  let calculator = new Calculator(".calculator", {
    input: ".calculator__input",
    result: ".calculator__result"
  });
});
