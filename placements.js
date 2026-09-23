// getPosition dostává skutečnou velikost viewportu, tlačítka a focal pointu.
// Vrací levý horní roh tlačítka { x, y } v CSS px. Renderer pozici omezí
// na bezpečný okraj, aby tlačítko zůstalo celé viditelné. Novou variantu
// stačí přidat sem; dropdown i všechny náhledy ji převezmou automaticky.
window.LayoutPlacements = [
  { id: 'bottom-center', label: 'Dole uprostřed', description: 'Uprostřed šířky, s odstupem od spodního okraje.', getPosition: ({ width, height, buttonWidth, buttonHeight, gap }) => ({ x: (width - buttonWidth) / 2, y: height - buttonHeight - gap }) },
  { id: 'bottom-left', label: 'Dole vlevo', description: 'U levého spodního rohu, s bezpečným odsazením.', getPosition: ({ height, buttonHeight, gap }) => ({ x: gap, y: height - buttonHeight - gap }) },
  { id: 'bottom-right', label: 'Dole vpravo', description: 'U pravého spodního rohu, s bezpečným odsazením.', getPosition: ({ width, height, buttonWidth, buttonHeight, gap }) => ({ x: width - buttonWidth - gap, y: height - buttonHeight - gap }) },
  { id: 'center', label: 'Ve středu obrazovky', description: 'Přesně uprostřed viewportu, nezávisle na výřezu.', getPosition: ({ width, height, buttonWidth, buttonHeight }) => ({ x: (width - buttonWidth) / 2, y: (height - buttonHeight) / 2 }) },
  { id: 'below-focus', label: 'Pod focal pointem', description: 'Sleduje důležitý bod v obrázku. U kraje se posune dovnitř.', getPosition: ({ focalX, focalY, buttonWidth, gap }) => ({ x: focalX - buttonWidth / 2, y: focalY + gap }) },
];
