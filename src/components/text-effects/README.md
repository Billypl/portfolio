# text-effects

6 komponentów animowanego tekstu. Każdy przyjmuje `text` jako prop
i odpala animację za każdym razem gdy `text` się zmienia.

## Instalacja

Skopiuj folder `text-effects/` do swojego projektu, np. do `src/components/text-effects/`.

## Użycie

```jsx
import { SlotMachine, Wave, Flip, BlurFade, SlideReplace, Typewriter }
  from "./text-effects";

// Podstawowe – tekst jako prop
<SlotMachine text="ABOUT ME" />
<Wave        text="PROJEKTY" />
<Flip        text="KONTAKT"  />
<BlurFade    text="SKILLS"   />
<SlideReplace text="TIMELINE" />
<Typewriter  text="HOBBY"    />
```

## Razem z i18n

```jsx
import { useLanguage } from "../context/LanguageContext";
import { BlurFade } from "./text-effects";

function Hero() {
  const { t } = useLanguage();
  return <h1><BlurFade text={t("hero.role")} /></h1>;
}
```

## Props

### SlotMachine
| Prop       | Typ    | Domyślnie | Opis                                    |
|------------|--------|-----------|-----------------------------------------|
| `text`     | string | –         | tekst do wyświetlenia                   |
| `steps`    | number | `8`       | ile razy każda litera się "przemieszuje"|
| `interval` | number | `40`      | ms między każdym przemieszaniem         |
| `stagger`  | number | `15`      | dodatkowe opóźnienie per litera (ms)    |

### Wave
| Prop       | Typ    | Domyślnie | Opis                                       |
|------------|--------|-----------|--------------------------------------------|
| `text`     | string | –         | tekst do wyświetlenia                      |
| `stagger`  | number | `45`      | opóźnienie między kolejnymi literami (ms)  |
| `duration` | number | `350`     | czas trwania animacji jednej litery (ms)   |

### Flip
| Prop       | Typ    | Domyślnie | Opis                                       |
|------------|--------|-----------|--------------------------------------------|
| `text`     | string | –         | tekst do wyświetlenia                      |
| `stagger`  | number | `50`      | opóźnienie między kolejnymi literami (ms)  |
| `duration` | number | `350`     | czas trwania animacji jednej litery (ms)   |

### BlurFade
| Prop            | Typ    | Domyślnie | Opis                                          |
|-----------------|--------|-----------|-----------------------------------------------|
| `text`          | string | –         | tekst do wyświetlenia                         |
| `duration`      | number | `500`     | czas trwania animacji (ms)                    |
| `letterSpacing` | string | –         | docelowy letter-spacing, np. `"0.1em"`        |

### SlideReplace
| Prop       | Typ    | Domyślnie | Opis                               |
|------------|--------|-----------|------------------------------------|
| `text`     | string | –         | tekst do wyświetlenia              |
| `duration` | number | `280`     | czas trwania każdej fazy (ms)      |

### Typewriter
| Prop         | Typ     | Domyślnie | Opis                                  |
|--------------|---------|-----------|---------------------------------------|
| `text`       | string  | –         | tekst do wyświetlenia                 |
| `eraseSpeed` | number  | `35`      | ms między kasowaniem kolejnych liter  |
| `typeSpeed`  | number  | `55`      | ms między pisaniem kolejnych liter    |
| `cursor`     | boolean | `true`    | czy pokazywać migający kursor         |
