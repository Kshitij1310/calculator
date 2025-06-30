document.addEventListener('DOMContentLoaded', () => {
  const exprEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  let expression = '';

  function updateDisplay() {
    exprEl.textContent = expression || '0';
    try {
      const evalExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
      const lastChar = expression[expression.length - 1];
      if (/[0-9)]/.test(lastChar)) {
        const result = Function('return ' + evalExpr)();
        resultEl.textContent = result;
      } else {
        resultEl.textContent = '';
      }
    } catch {
      resultEl.textContent = '';
    }
  }

  function append(value) {
    expression += value;
    updateDisplay();
  }

  function clear() {
    expression = '';
    resultEl.textContent = '0';
    updateDisplay();
  }

  function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
  }

  function calculate() {
    try {
      const result = Function('return ' + expression.replace(/×/g, '*').replace(/÷/g, '/'))();
      expression = result.toString();
      updateDisplay();
    } catch {
      resultEl.textContent = 'Error';
    }
  }

  document.querySelector('.buttons').addEventListener('click', e => {
    const btn = e.target;
    if (!btn.classList.contains('btn')) return;
    if (btn.dataset.value) append(btn.dataset.value);
    else if (btn.dataset.action === 'clear') clear();
    else if (btn.dataset.action === 'backspace') backspace();
    else if (btn.dataset.action === 'equals') calculate();
  });

  // Keyboard support
  document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') append(e.key);
    if (['+','-','/','*','.','(',')'].includes(e.key)) append(e.key.replace('*','×').replace('/','÷'));
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clear();
  });

  updateDisplay();
});
