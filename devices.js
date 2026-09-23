// Rozměry viewportu v CSS pixelech, nikoli fyzické rozlišení displeje.
// Přidejte zařízení se stabilním id, názvem, skupinou a rozměry.
// example je volitelný příklad modelu. Rozměry nezahrnují lišty prohlížeče.
// Desktopové příklady předpokládají celou obrazovku při 100% měřítku systému.
window.LayoutDevices = [
  { id: 'desktop-full', name: 'Velký desktop', example: 'Dell P2419H · 24″', group: 'Desktop', width: 1920, height: 1080 },
  { id: 'desktop-medium', name: 'Běžný notebook', example: 'MacBook Air 13″ (2017)', group: 'Desktop', width: 1440, height: 900 },
  { id: 'desktop-compact', name: 'Kompaktní notebook', example: 'Lenovo ThinkPad X230', group: 'Desktop', width: 1366, height: 768 },
  { id: 'mobile-small', name: 'Malý mobil', example: 'iPhone SE (2022)', group: 'Mobil', width: 375, height: 667 },
  { id: 'mobile-narrow', name: 'Úzký mobil', example: 'Samsung Galaxy A55', group: 'Mobil', width: 360, height: 800 },
  { id: 'mobile-medium', name: 'Běžný mobil', example: 'iPhone 13 / 14', group: 'Mobil', width: 390, height: 844 },
  { id: 'mobile-large', name: 'Velký mobil', example: 'Google Pixel 7', group: 'Mobil', width: 412, height: 915 },
  { id: 'mobile-wide', name: 'Široký mobil', example: 'iPhone 14 Pro Max', group: 'Mobil', width: 430, height: 932 },
  { id: 'tablet-mini-portrait', name: 'Malý tablet · na výšku', example: 'iPad mini (5. generace)', group: 'Tablet', width: 768, height: 1024 },
  { id: 'tablet-mini-landscape', name: 'Malý tablet · na šířku', example: 'iPad mini (5. generace)', group: 'Tablet', width: 1024, height: 768 },
  { id: 'tablet-air-portrait', name: 'Běžný tablet · na výšku', example: 'iPad Air 11″', group: 'Tablet', width: 820, height: 1180 },
  { id: 'tablet-air-landscape', name: 'Běžný tablet · na šířku', example: 'iPad Air 11″', group: 'Tablet', width: 1180, height: 820 },
  { id: 'tablet-pro-portrait', name: 'Velký tablet · na výšku', example: 'iPad Pro 12,9″', group: 'Tablet', width: 1024, height: 1366 },
  { id: 'tablet-surface-landscape', name: 'Tablet / notebook · na šířku', example: 'Microsoft Surface Pro 7', group: 'Tablet', width: 1368, height: 912 },
];
