import { Language } from '../types';

type AdviceText = {
  [key in Language]: string;
}

interface RuleSet {
  dateFormat?: AdviceText;
  currency?: AdviceText;
  formality?: AdviceText;
}

export interface LocalizationRules {
  [countryCode: string]: {
    countryName: AdviceText;
    rules: RuleSet;
  };
}

export const localizationRules: LocalizationRules = {
  'ES': {
    countryName: { en: "Spain", es: "España", fi: "Espanja" },
    rules: {
      dateFormat: {
        en: "The preferred date format is DD/MM/YYYY.",
        es: "El formato de fecha preferido es DD/MM/YYYY.",
        fi: "Ensisijainen päivämäärämuoto on PP/KK/VVVV."
      },
      currency: {
        en: "The official currency is the Euro (€). Avoid using '$' if your market is Spain.",
        es: "La moneda oficial es el Euro (€). Evita usar '$' si tu mercado es España.",
        fi: "Virallinen valuutta on euro (€). Vältä '$'-merkin käyttöä, jos markkinasi on Espanja."
      },
      formality: {
        en: "In formal or business contexts, the 'usted' form is recommended to convey professionalism.",
        es: "En contextos formales o de negocio, se recomienda el trato de 'usted' para transmitir profesionalidad.",
        fi: "Virallisissa tai liike-elämän yhteyksissä suositellaan 'usted'-muodon käyttöä ammattimaisuuden osoittamiseksi."
      }
    }
  },
  'MX': {
    countryName: { en: "Mexico", es: "México", fi: "Meksiko" },
    rules: {
       dateFormat: {
        en: "The common date format is DD/MM/YYYY.",
        es: "El formato de fecha común es DD/MM/YYYY.",
        fi: "Yleinen päivämäärämuoto on PP/KK/VVVV."
      },
      currency: {
        en: "The currency is the Mexican Peso (MXN). The '$' symbol can cause confusion with the US dollar; consider specifying 'MXN'.",
        es: "La moneda es el Peso Mexicano (MXN). El símbolo '$' puede causar confusión con el dólar estadounidense; considera especificar 'MXN'.",
        fi: "Valuutta on Meksikon peso (MXN). '$'-symboli voi aiheuttaa sekaannusta Yhdysvaltain dollarin kanssa; harkitse 'MXN'-tunnuksen käyttöä."
      },
      formality: {
        en: "The informal 'tú' is widely accepted and common in most contexts, even professional ones.",
        es: "El tuteo ('tú') es ampliamente aceptado y común en la mayoría de contextos, incluso profesionales.",
        fi: "Epämuodollinen 'tú'-puhuttelu on laajalti hyväksytty ja yleinen useimmissa yhteyksissä, myös ammatillisissa."
      }
    }
  },
  'SV': {
    countryName: { en: "El Salvador", es: "El Salvador", fi: "El Salvador" },
    rules: {
       dateFormat: {
        en: "The standard date format is DD/MM/YYYY.",
        es: "El formato de fecha estándar es DD/MM/YYYY.",
        fi: "Standardi päivämäärämuoto on PP/KK/VVVV."
      },
      currency: {
        en: "The legal currency is the US Dollar (USD, $). There is no symbol confusion, but context is key.",
        es: "La moneda de curso legal es el Dólar Estadounidense (USD, $). No hay confusión de símbolo, pero el contexto es clave.",
        fi: "Laillinen valuutta on Yhdysvaltain dollari (USD, $). Symbolista ei ole sekaannusta, mutta asiayhteys on avainasemassa."
      },
      formality: {
        en: "Both 'vos' and 'usted' coexist. 'Vos' is common in informal contexts, while 'usted' is for formality.",
        es: "El trato de 'vos' y 'usted' coexisten. 'Vos' es común en contextos informales, mientras que 'usted' es para formalidad.",
        fi: "'Vos'- ja 'usted'-puhuttelut elävät rinnakkain. 'Vos' on yleinen epävirallisissa yhteyksissä, kun taas 'usted' on muodollinen."
      }
    }
  },
  'US': {
    countryName: { en: "United States", es: "Estados Unidos", fi: "Yhdysvallat" },
    rules: {
       dateFormat: {
        en: "The standard date format is Month/Day/Year (MM/DD/YYYY).",
        es: "El formato de fecha estándar es Mes/Día/Año (MM/DD/YYYY).",
        fi: "Standardi päivämäärämuoto on Kuukausi/Päivä/Vuosi (KK/PP/VVVV)."
      },
      currency: {
        en: "The currency is the US Dollar ($).",
        es: "La moneda es el Dólar Estadounidense ($).",
        fi: "Valuutta on Yhdysvaltain dollari ($)."
      },
      formality: {
        en: "A direct and friendly tone is generally preferred in business and marketing.",
        es: "Generalmente se prefiere un tono directo y amigable en los negocios y el marketing.",
        fi: "Suoraa ja ystävällistä sävyä suositaan yleensä liike-elämässä ja markkinoinnissa."
      }
    }
  },
  'FI': {
    countryName: { en: "Finland", es: "Finlandia", fi: "Suomi" },
    rules: {
       dateFormat: {
        en: "The date format is Day.Month.Year (DD.MM.YYYY).",
        es: "El formato de fecha es Día.Mes.Año (DD.MM.YYYY).",
        fi: "Päivämäärämuoto on Päivä.Kuukausi.Vuosi (PP.KK.VVVV)."
      },
      currency: {
        en: "The currency is the Euro (€).",
        es: "La moneda es el Euro (€).",
        fi: "Valuutta on euro (€)."
      },
      formality: {
        en: "A direct, straightforward, and concise tone is valued. Excessive politeness can be seen as insincere.",
        es: "Se valora un tono directo, claro y conciso. La cortesía excesiva puede parecer poco sincera.",
        fi: "Suoraa, mutkatonta ja ytimekästä sävyä arvostetaan. Liiallinen kohteliaisuus voidaan nähdä epäaitona."
      }
    }
  }
};

export const getCountryName = (code: string) => {
    return localizationRules[code]?.countryName || "Unknown";
} 