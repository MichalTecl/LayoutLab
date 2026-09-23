# LayoutTest

Statický nástroj pro zkoušení celoobrazovkového hero banneru. Otevřete `index.html` v moderním prohlížeči. Nevyžaduje instalaci, build ani backend. Lze ho také publikovat na libovolném statickém hostingu.

## Použití

1. Nahrajte pozadí a obrázek tlačítka; pro tlačítko je vhodné průhledné pozadí.
2. Kliknutím nebo tažením ve zdrojovém obrázku nastavte focal point. Lze zadat procenta nebo použít šipky na označeném bodu (Shift pro větší krok).
3. Vyberte umístění a šířku tlačítka. Náhledy se aktualizují okamžitě.
4. Každý náhled lze samostatně scrollovat k obsahu pod hero bannerem. Tlačítko nad seznamem vrátí všechny náhledy nahoru.

Obrázky zůstávají v paměti prohlížeče. Obnovení stránky návrh zruší. Ukázková grafika je součástí aplikace a slouží pouze k testování rozložení.

## Konfigurace

- `devices.js`: seznam viewportů v CSS pixelech. Přidáním položky se vytvoří další náhled. Volitelné pole `example` uvádí příklad skutečného zařízení pod názvem náhledu. Součástí je 3× desktop, 6× tablet (na výšku i šířku) a 5× mobil.
- `placements.js`: varianty umístění tlačítka. Každá má `id`, `label`, `description` a funkci `getPosition`, která vrací levý horní roh v CSS pixelech. Dostává velikost viewportu, tlačítka, promítnutý focal point a bezpečný okraj `gap`.
- `app.js`: editor, výpočet ořezu, uploady a iframe renderer.
- `styles.css`: vzhled nástroje.

Hero má výšku 100 % viewportu náhledu a pozadí vyplňuje metodou cover. Focal point je pokud možno ve středu; posun se omezí na okraje zdroje, aby nevznikaly prázdné plochy. Tlačítko si zachovává poměr stran a velikost se omezí podle šířky i výšky viewportu. Pozice tlačítka označuje hranice obrázku včetně případných průhledných okrajů.

Náhledy používají iframe v plném rozměru viewportu, vizuálně zmenšený CSS transformací podle dostupné šířky a výšky okna. Jde o simulaci rozložení v aktuálním prohlížeči, nikoliv emulaci operačního systému, mobilních lišt nebo konkrétního zařízení.

Příklady zařízení jsou orientační profily celé obrazovky bez lišt prohlížeče. Skutečný dostupný viewport závisí také na měřítku systému, zoomu a otevřených lištách. Desktopové příklady předpokládají 100% měřítko.

Zdroje rozměrů: [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend/blob/main/front_end/models/emulation/EmulatedDevices.ts), [Apple Layout](https://developer.apple.com/design/human-interface-guidelines/layout), [Storybook Viewport](https://storybook.js.org/docs/8/essentials/viewport), [MacBook Air 2017](https://support.apple.com/en-tm/111924), [Dell P2419H](https://www.dell.com/support/kbdoc/en-nz/000123883/dell-p2419h-monitor-usage-and-troubleshooting-guide), [ThinkPad X230](https://psref.lenovo.com/syspool/sys/pdf/withdrawnbook/thinkpad_x230_we.pdf).
