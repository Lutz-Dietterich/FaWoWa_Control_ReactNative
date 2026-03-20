# FaWoWa-Control

Steuerungs- und Überwachungs-App für einen Fahrradwohnwagen. Gebaut mit React Native / Expo.
4 Screens: Home (Messwerte), Settings (Temperatur & Luftfeuchte), Lights (Lichtsteuerung), Analytics (Auswertung).

---

## ⛔ Pflichtregeln — immer einhalten

1. **NIEMALS Code ändern ohne explizite Bestätigung** ("ja" / "mach es") des Users.
2. Bei jeder Änderungsanfrage: erst Plan erklären, dann **WARTEN**.
3. Auch wenn der User eine Frage stellt ("was meinst du?") — **NUR antworten, NICHT implementieren**.
4. **Ausnahmen gibt es KEINE.**

---

## Vorgehensweise bei Aufgaben

Bei **jeder** Aufgabe, egal wie klein:

1. **Erst erklären** was ich tun werde (auf Deutsch)
2. **Warten auf Bestätigung** des Users ("ja" oder Korrekturen)
3. **Dann erst umsetzen** — Schritt für Schritt

Bei Aufgaben die mehr als eine Datei betreffen zusätzlich:

- **Checkliste erstellen** mit allen Schritten (TodoWrite Tool) vor dem Warten

---

## Projektstruktur

```text
src/
├── components/
│   ├── Dashboard/     # Wiederverwendbare Anzeige-Komponenten (Messwerte, Karten etc.)
│   │   └── ...
│   ├── Controls/      # Steuerungs-Elemente (Licht, Schalter etc.)
│   │   └── ...
│   └── Layout/
│       ├── Header/
│       └── ScreenLayout/
├── screens/
│   ├── Home/          # Übersicht aller aktuellen Messwerte
│   ├── Settings/      # Einstellungen für Temperatur & Luftfeuchte
│   ├── Lights/        # Lichtsteuerung
│   └── Analytics/     # Auswertung & Verlauf der Messergebnisse
├── store/             # Zustandsverwaltung (Zustand/Context)
├── types/             # TypeScript-Typen für Sensordaten, Einstellungen etc.
└── navigation/        # Navigation-Konfiguration (Drawer/Stack)
```

Weitere Komponenten entstehen im Laufe der Entwicklung. Die Struktur ist als Leitfaden zu verstehen, nicht als vollständige Liste.

---

## Komponenten-Struktur

**PFLICHT**: Jede Komponente besteht IMMER aus genau zwei Dateien:

- `index.tsx` — Komponenten-Code
- `style.ts` — Styles (StyleSheet)

**NIEMALS** Styles inline in `index.tsx` schreiben. **NIEMALS** `style.ts` Dateien löschen oder zusammenführen. Diese Struktur ist unveränderlich für alle Komponenten im Projekt.

---

## Git Workflow

### Commits

- **Nur committen wenn explizit vom User gefragt**
- Commit Message Format:

```text
<type>: <description>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

- Niemals `--no-verify` oder force push ohne explizite Anfrage

---

## Designprinzipien

- **Schritt-für-Schritt**: Keine autonomen Änderungen
- **Einfachheit**: Kein Over-Engineering, nur notwendige Features
- **Visuelle Klarheit**: Komponenten müssen selbsterklärend sein
- **Konsistenz**: Gleiche Patterns für ähnliche Features

---

## Löschen von Dateien

**NIEMALS** eine Datei löschen ohne vorher explizit auf Deutsch zu fragen: "Darf ich [Dateiname] löschen?"

Warten bis der User ausdrücklich "ja" sagt. Keine Ausnahmen.
