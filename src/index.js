const style = document.createElement('style');
style.textContent = `
  #finaldialog button {
    padding: 10px 15px;
  }
  #finaldialog::backdrop {
    background-color: rgba(0, 0, 0, 0.75);
  }`;
document.head.append(style);

const dialog = document.createElement("dialog");
dialog.id = 'finaldialog'
document.body.appendChild(dialog)



export const alert = (text) => new Promise( (resolve) => {
    dialog.innerHTML = `
    <p>${text || ''}</p>
    <form method="dialog">
      <button value="ok" class="main">Ok</button>
    </form>
    `
    dialog.showModal()
    dialog.onclose = () => resolve(true);

  })


export const confirm = (text) => new Promise( (resolve) => {
    dialog.innerHTML = `
    <p>${text || ''}</p>
    <form method="dialog">
      <button value="ok" class="main">Ok</button>
      <button value="cancel">Cancel</button>
    </form>
    `
    dialog.showModal()
    dialog.onclose = () => resolve(dialog.returnValue === 'ok');
  })


export const prompt = (text) => new Promise( (resolve) => {
    dialog.innerHTML = `
    <p>${text || ''}</p>
    <form method="dialog">
      <input name="text" type="text">
      <button value="ok" class="main">Ok</button>
      <button value="cancel">Cancel</button>
    </form>
    `
    dialog.showModal()
    dialog.onclose = () => {
      resolve(dialog.returnValue === 'ok' ? dialog.querySelector('input[name=text]').value : null)
    };
  })

export const custom = (html) => new Promise( (resolve) => {
    dialog.innerHTML = html
    dialog.showModal()
    dialog.onclose = () => {
      resolve(dialog)
    };
  })
