(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const svgUrl = svg => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  // Ukázková vektorová kompozice umožňuje zkoušet nástroj i bez souborů.
  const demoBackground = svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#c6d1b0"/><stop offset=".5" stop-color="#aebd99"/><stop offset="1" stop-color="#899d7b"/></linearGradient><linearGradient id="bottle" x2="1"><stop stop-color="#694531"/><stop offset=".35" stop-color="#ab7953"/><stop offset=".7" stop-color="#9b6945"/><stop offset="1" stop-color="#624632"/></linearGradient><linearGradient id="label" x2="1" y2=".5"><stop stop-color="#f5edda"/><stop offset="1" stop-color="#ddd8b9"/></linearGradient><filter id="blur"><feGaussianBlur stdDeviation="20"/></filter></defs><rect width="1920" height="1080" fill="url(#bg)"/><circle cx="1640" cy="120" r="570" fill="#e2e6c9" opacity=".28"/><path d="M0 850Q400 690 860 850T1920 770V1080H0Z" fill="#d5d9bd"/><ellipse cx="1040" cy="935" rx="355" ry="35" fill="#4d6044" opacity=".25" filter="url(#blur)"/><g fill="none" stroke="#5a744b" stroke-width="11" opacity=".7"><path d="M1670 1080Q1590 680 1870 310"/><path d="M290 0Q140 280 290 600"/></g><g fill="#617c51" opacity=".7"><ellipse cx="1740" cy="490" rx="45" ry="150" transform="rotate(43 1740 490)"/><ellipse cx="1610" cy="655" rx="46" ry="146" transform="rotate(-39 1610 655)"/><ellipse cx="1765" cy="770" rx="44" ry="138" transform="rotate(55 1765 770)"/><ellipse cx="205" cy="150" rx="45" ry="135" transform="rotate(-40 205 150)"/><ellipse cx="275" cy="395" rx="41" ry="136" transform="rotate(30 275 395)"/></g><g transform="translate(835 245) rotate(8 150 340)"><rect x="39" y="0" width="220" height="95" rx="14" fill="#e0d8b8"/><path d="M48 12H250M48 27H250M48 42H250M48 57H250M48 72H250" stroke="#bcb799" stroke-width="2"/><rect x="20" y="83" width="260" height="570" rx="50" fill="url(#bottle)"/><rect x="21" y="250" width="258" height="275" rx="3" fill="url(#label)"/><text x="150" y="320" text-anchor="middle" fill="#3d5943" font-family="Georgia,serif" font-size="34">biorythme</text><path d="M130 370q40-55 55-12-38 45-55 12m0 0q-35-30-35 3 20 23 35-3" fill="#809368"/><text x="150" y="435" text-anchor="middle" fill="#526347" font-family="sans-serif" font-size="16" letter-spacing="3">BLÍŽ K PŘÍRODĚ</text><text x="150" y="472" text-anchor="middle" fill="#758064" font-family="sans-serif" font-size="13">Každý den. Po svém.</text></g><g fill="#eef1df" font-family="sans-serif"><text x="470" y="500" font-size="16" letter-spacing="5">MALÝ RITUÁL.</text><text x="465" y="575" font-family="Georgia,serif" font-size="64">Velká radost.</text></g></svg>`);
  const demoButton = svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="88" viewBox="0 0 320 88"><rect x="2" y="2" width="316" height="80" rx="40" fill="#213f33"/><text x="143" y="51" text-anchor="middle" font-family="sans-serif" font-size="19" fill="#fffdf0">Objevte přírodní péči</text><path d="M266 34l9 9-9 9m-15-9h23" fill="none" stroke="#fffdf0" stroke-width="2"/></svg>`);
  const state = { background: demoBackground, imageWidth: 1920, imageHeight: 1080, button: demoButton, buttonRatio: 320 / 88, focalX: .5, focalY: .5, buttonWidth: 220, placement: window.LayoutPlacements[0].id, showFocus: false };
  const previews = [];
  let scheduled = false;

  // Tento renderer běží uvnitř každého iframe v jeho plné CSS velikosti.
  // Polohu tlačítka počítá rodič podle rozšiřitelného placements.js.
  function previewRuntime() {
    const background = document.getElementById('background');
    const button = document.getElementById('cta');
    const focus = document.getElementById('focus');
    window.addEventListener('message', event => {
      if (event.source !== parent || !event.data || event.data.type !== 'layout-update') return;
      const data = event.data;
      if (data.background) background.src = data.background;
      if (data.button) button.src = data.button;
      Object.assign(background.style, { width: `${data.imageWidth}px`, height: `${data.imageHeight}px`, left: `${data.imageX}px`, top: `${data.imageY}px` });
      Object.assign(button.style, { width: `${data.buttonWidth}px`, height: `${data.buttonHeight}px`, left: `${data.buttonX}px`, top: `${data.buttonY}px` });
      Object.assign(focus.style, { left: `${data.focalX}px`, top: `${data.focalY}px`, display: data.showFocus ? 'block' : 'none' });
      if (data.resetScroll) window.scrollTo(0, 0);
    });
    parent.postMessage({ type: 'layout-ready' }, '*');
  }
  const previewDocument = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}body{margin:0;background:#faf9f4;color:#304638;font-family:system-ui,sans-serif}.hero{height:100vh;width:100%;position:relative;overflow:hidden;background:#c5cfb3}#background,#cta{position:absolute;display:block;max-width:none}#cta{object-fit:contain}#focus{position:absolute;width:26px;height:26px;border:2px solid white;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 0 5px #29433055;pointer-events:none}#focus:before,#focus:after{content:'';position:absolute;background:white}#focus:before{height:36px;width:2px;top:-7px;left:10px}#focus:after{width:36px;height:2px;left:-7px;top:10px}.content{max-width:1000px;margin:auto;padding:clamp(28px,6vw,90px);min-height:100vh}.eyebrow{font-size:12px;letter-spacing:3px;color:#839075}h1{font:normal clamp(30px,4vw,52px) Georgia,serif;margin:20px 0 25px}p{font-size:17px;line-height:1.9;color:#73816c}.line{width:50px;height:2px;background:#a6b091;margin:30px 0}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:20px;margin-top:40px}.card{background:#edf0e5;border-radius:12px;padding:24px}.card p{font-size:14px;margin-bottom:0}</style></head><body><section class="hero" aria-label="Náhled hero banneru"><img id="background" alt="Pozadí banneru"><img id="cta" alt="Grafické tlačítko"><span id="focus" style="display:none"></span></section><section class="content"><span class="eyebrow">OBSAH POD BANNEREM</span><h1>Prostor pro další příběh.</h1><div class="line"></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae mi at tellus posuere feugiat. Nulla facilisi. Praesent aliquam, neque sed finibus consequat, tellus lorem ornare velit, eget luctus arcu felis sed ante.</p><p>Donec dignissim purus ut justo tincidunt, ac viverra metus consectetur. Curabitur vel sapien id lacus interdum tincidunt. Suspendisse potenti.</p><div class="cards"><div class="card"><strong>Lorem ipsum</strong><p>Integer vitae erat vitae libero posuere tincidunt. Mauris ornare justo non felis.</p></div><div class="card"><strong>Dolor sit amet</strong><p>Aliquam erat volutpat. Nunc id erat consequat, vulputate sapien et, viverra dui.</p></div></div></section><script>(${previewRuntime.toString()})();<\/script></body></html>`;

  function layoutFor(device) {
    const { width, height } = device;
    const scale = Math.max(width / state.imageWidth, height / state.imageHeight);
    const imageWidth = state.imageWidth * scale;
    const imageHeight = state.imageHeight * scale;
    const imageX = clamp(width / 2 - state.focalX * imageWidth, width - imageWidth, 0);
    const imageY = clamp(height / 2 - state.focalY * imageHeight, height - imageHeight, 0);
    const focalX = imageX + state.focalX * imageWidth;
    const focalY = imageY + state.focalY * imageHeight;
    const gap = Math.min(48, width * .06, height * .06);
    // Omezujeme oba rozměry, také pro neobvykle vysoký obrázek tlačítka.
    const buttonWidth = Math.min(state.buttonWidth, width - 2 * gap, (height - 2 * gap) * state.buttonRatio);
    const buttonHeight = buttonWidth / state.buttonRatio;
    const placement = window.LayoutPlacements.find(item => item.id === state.placement);
    const position = placement.getPosition({ width, height, buttonWidth, buttonHeight, focalX, focalY, gap });
    return { type: 'layout-update', imageWidth, imageHeight, imageX, imageY, focalX, focalY, buttonWidth, buttonHeight, buttonX: clamp(position.x, gap, width - buttonWidth - gap), buttonY: clamp(position.y, gap, height - buttonHeight - gap), showFocus: state.showFocus };
  }
  function renderPreview(preview, resetScroll = false, forceAssets = false) {
    const data = { ...layoutFor(preview.device), resetScroll };
    for (const kind of ['background', 'button']) {
      if (forceAssets || preview[kind] !== state[kind]) {
        data[kind] = state[kind];
        preview[kind] = state[kind];
      }
    }
    preview.frame.contentWindow.postMessage(data, '*');
  }
  function render(resetScroll = false) {
    previews.forEach(preview => renderPreview(preview, resetScroll));
  }
  function scheduleRender() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; render(); });
  }
  function updateFocus(x, y) {
    state.focalX = clamp(x, 0, 1);
    state.focalY = clamp(y, 0, 1);
    $('focal-point').style.left = `${state.focalX * 100}%`;
    $('focal-point').style.top = `${state.focalY * 100}%`;
    if (document.activeElement !== $('focus-x')) $('focus-x').value = (state.focalX * 100).toFixed(1);
    if (document.activeElement !== $('focus-y')) $('focus-y').value = (state.focalY * 100).toFixed(1);
    scheduleRender();
  }
  function fitPreviews() {
    previews.forEach(({ device, frame, screen, card, scaleLabel }) => {
      const style = getComputedStyle(card);
      const availableWidth = card.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const availableHeight = Math.max(60, window.innerHeight - 145);
      const scale = Math.min(1, availableWidth / device.width, availableHeight / device.height);
      screen.style.width = `${device.width * scale}px`;
      screen.style.height = `${device.height * scale}px`;
      frame.style.transform = `scale(${scale})`;
      scaleLabel.textContent = `${Math.round(scale * 100)} %`;
    });
  }
  function buildPreviews() {
    const groups = [...new Set(window.LayoutDevices.map(device => device.group))];
    groups.forEach(group => {
      const devices = window.LayoutDevices.filter(device => device.group === group);
      const section = document.createElement('section');
      const heading = document.createElement('div');
      heading.className = 'group-heading';
      const title = document.createElement('h3');
      title.textContent = group;
      const count = document.createElement('span');
      count.className = 'group-count';
      count.textContent = `${devices.length}`;
      const line = document.createElement('span');
      line.className = 'group-line';
      heading.append(title, count, line);
      const grid = document.createElement('div');
      grid.className = `device-grid${group === 'Mobil' ? ' mobile' : ''}`;
      devices.forEach(device => {
        const card = document.createElement('article');
        card.className = 'device-card';
        const titleRow = document.createElement('div');
        titleRow.className = 'device-title';
        const name = document.createElement('strong');
        name.textContent = device.name;
        const dimensions = document.createElement('span');
        dimensions.textContent = `${device.width} × ${device.height}`;
        const deviceLabel = document.createElement('div');
        deviceLabel.append(name);
        if (device.example) {
          const example = document.createElement('small');
          example.className = 'device-example';
          example.textContent = `Např. ${device.example}`;
          deviceLabel.append(example);
        }
        titleRow.append(deviceLabel, dimensions);
        const screen = document.createElement('div');
        screen.className = 'screen-wrap';
        const frame = document.createElement('iframe');
        frame.title = `${device.name}${device.example ? `, např. ${device.example}` : ''}, ${device.width} × ${device.height} CSS pixelů`;
        frame.width = device.width;
        frame.height = device.height;
        frame.setAttribute('sandbox', 'allow-scripts');
        frame.srcdoc = previewDocument;
        screen.append(frame);
        const footer = document.createElement('div');
        footer.className = 'device-footer';
        const caption = document.createElement('span');
        caption.textContent = 'MĚŘÍTKO NÁHLEDU';
        const scaleLabel = document.createElement('span');
        footer.append(caption, scaleLabel);
        card.append(titleRow, screen, footer);
        previews.push({ device, frame, screen, card, scaleLabel });
        grid.append(card);
      });
      section.append(heading, grid);
      $('device-groups').append(section);
    });
    const observer = new ResizeObserver(fitPreviews);
    previews.forEach(preview => observer.observe(preview.card));
    window.addEventListener('resize', fitPreviews);
    fitPreviews();
  }
  window.addEventListener('message', event => {
    if (event.data?.type !== 'layout-ready') return;
    const preview = previews.find(item => item.frame.contentWindow === event.source);
    if (preview) renderPreview(preview, false, true);
  });
  window.LayoutPlacements.forEach(placement => {
    const option = document.createElement('option');
    option.value = placement.id;
    option.textContent = placement.label;
    $('placement').append(option);
  });
  function changePlacement() {
    state.placement = $('placement').value;
    $('placement-description').textContent = window.LayoutPlacements.find(item => item.id === state.placement).description;
    scheduleRender();
  }
  $('placement').addEventListener('change', changePlacement);
  $('button-width').addEventListener('input', event => {
    state.buttonWidth = Number(event.target.value);
    $('width-value').value = state.buttonWidth;
    scheduleRender();
  });
  $('show-focus').addEventListener('change', event => { state.showFocus = event.target.checked; scheduleRender(); });
  $('reset-focus').addEventListener('click', () => updateFocus(.5, .5));
  $('reset-scroll').addEventListener('click', () => render(true));
  ['x', 'y'].forEach(axis => {
    const input = $('focus-' + axis);
    input.addEventListener('input', event => {
      const value = event.target.valueAsNumber;
      if (Number.isFinite(value)) updateFocus(axis === 'x' ? value / 100 : state.focalX, axis === 'y' ? value / 100 : state.focalY);
    });
    input.addEventListener('blur', () => { input.value = ((axis === 'x' ? state.focalX : state.focalY) * 100).toFixed(1); });
  });
  const source = $('source-wrap');
  let activePointer = null;
  function movePointer(event) {
    const rect = source.getBoundingClientRect();
    if (rect.width && rect.height) updateFocus((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
  }
  source.addEventListener('pointerdown', event => {
    if (event.button !== 0 || activePointer !== null) return;
    event.preventDefault();
    activePointer = event.pointerId;
    source.setPointerCapture(activePointer);
    $('focal-point').focus({ preventScroll: true });
    movePointer(event);
  });
  source.addEventListener('pointermove', event => { if (event.pointerId === activePointer) movePointer(event); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => source.addEventListener(type, () => { activePointer = null; }));
  $('focal-point').addEventListener('keydown', event => {
    const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (!directions[event.key]) return;
    event.preventDefault();
    const [x, y] = directions[event.key];
    const step = event.shiftKey ? .1 : .01;
    updateFocus(state.focalX + x * step, state.focalY + y * step);
  });
  function wireUpload(kind) {
    let request = 0;
    $(`${kind}-file`).addEventListener('change', async event => {
      const file = event.target.files[0];
      if (!file) return;
      const currentRequest = ++request;
      const url = URL.createObjectURL(file);
      try {
        const image = new Image();
        image.src = url;
        await image.decode();
        if (!image.naturalWidth || !image.naturalHeight) throw new Error('Prázdný obrázek');
        if (currentRequest !== request) { URL.revokeObjectURL(url); return; }
        // Data URL funguje i v sandbox iframe s odděleným originem a při
        // otevření přes file://. Soubor se nikdy neposílá na server.
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        if (currentRequest !== request) return;
        state[kind] = dataUrl;
        if (kind === 'background') {
          state.imageWidth = image.naturalWidth;
          state.imageHeight = image.naturalHeight;
          $('source-image').src = dataUrl;
          updateFocus(.5, .5);
        } else {
          state.buttonRatio = image.naturalWidth / image.naturalHeight;
          $('button-image').src = dataUrl;
        }
        $(`${kind}-info`).textContent = `${file.name} · ${image.naturalWidth} × ${image.naturalHeight} px`;
        $('error').hidden = true;
        render();
      } catch {
        URL.revokeObjectURL(url);
        if (currentRequest !== request) return;
        $('error').textContent = 'Obrázek se nepodařilo načíst. Vyberte platný PNG, JPG, WebP nebo SVG soubor. Předchozí obrázek zůstal zachován.';
        $('error').hidden = false;
      } finally {
        URL.revokeObjectURL(url);
        if (currentRequest === request) event.target.value = '';
      }
    });
  }
  $('source-image').src = state.background;
  $('button-image').src = state.button;
  wireUpload('background');
  wireUpload('button');
  buildPreviews();
  changePlacement();
})();
