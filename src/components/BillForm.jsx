import React, { useMemo, useState } from "react";

const currency = (n) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    n || 0
  );

const BillForm = ({ onResult }) => {
  const [totale, setTotale] = useState(0);
  const [partecipanti, setPartecipanti] = useState(2);
  const [figli, setFigli] = useState(0);
  const [scontoFigli, setScontoFigli] = useState(50); // percentuale

  const errors = useMemo(() => {
    const errs = {};
    if (totale <= 0) errs.totale = "Inserisci un totale maggiore di 0";
    if (partecipanti <= 0) errs.partecipanti = "Almeno 1 partecipante";
    if (figli < 0) errs.figli = "Non può essere negativo";
    if (figli > partecipanti) errs.figli = "Non può superare i partecipanti";
    if (scontoFigli < 0 || scontoFigli > 100)
      errs.scontoFigli = "Sconto tra 0 e 100";
    return errs;
  }, [totale, partecipanti, figli, scontoFigli]);

  const calcolo = useMemo(() => {
    if (Object.keys(errors).length) return null;

    // Logica: ogni adulto paga quota intera, ogni figlio paga quota scontata.
    // Sia q la quota base prima dello sconto. Se A adulti e F figli, allora
    // totale = q * (A + F * (1 - s)) dove s = scontoFigli/100.
    // q = totale / (A + F * (1 - s))

    const A = Math.max(0, partecipanti - figli);
    const F = Math.max(0, figli);
    const s = scontoFigli / 100;
    const denominatore = A + F * (1 - s);
    const quotaBase = denominatore > 0 ? totale / denominatore : 0;

    const quotaAdulto = quotaBase;
    const quotaFiglio = quotaBase * (1 - s);

    const subtotAdulti = quotaAdulto * A;
    const subtotFigli = quotaFiglio * F;

    return {
      A,
      F,
      s,
      quotaAdulto,
      quotaFiglio,
      subtotAdulti,
      subtotFigli,
      totale,
    };
  }, [errors, totale, partecipanti, figli, scontoFigli]);

  const handleCalcola = (e) => {
    e.preventDefault();
    if (!calcolo) return;
    onResult(calcolo);
  };

  return (
    <form onSubmit={handleCalcola} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Totale conto</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={totale}
            onChange={(e) => setTotale(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl bg-slate-900/60 border border-blue-500/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0,00"
          />
          {errors.totale && (
            <p className="text-red-400 text-xs mt-1">{errors.totale}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Partecipanti</label>
          <input
            type="number"
            min="1"
            value={partecipanti}
            onChange={(e) => setPartecipanti(parseInt(e.target.value) || 0)}
            className="w-full rounded-xl bg-slate-900/60 border border-blue-500/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.partecipanti && (
            <p className="text-red-400 text-xs mt-1">{errors.partecipanti}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Quanti sono figli</label>
          <input
            type="number"
            min="0"
            value={figli}
            onChange={(e) => setFigli(parseInt(e.target.value) || 0)}
            className="w-full rounded-xl bg-slate-900/60 border border-blue-500/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.figli && (
            <p className="text-red-400 text-xs mt-1">{errors.figli}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-blue-200 mb-1">Sconto figli (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={scontoFigli}
            onChange={(e) => setScontoFigli(parseInt(e.target.value) || 0)}
            className="w-full rounded-xl bg-slate-900/60 border border-blue-500/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.scontoFigli && (
            <p className="text-red-400 text-xs mt-1">{errors.scontoFigli}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={Object.keys(errors).length > 0}
        className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold shadow-lg shadow-blue-600/30 transition"
      >
        Calcola divisione
      </button>

      {calcolo && (
        <div className="mt-6 text-blue-100/90 text-sm">
          <p>Anteprima: {calcolo.A} adulti pagano {currency(calcolo.quotaAdulto)} cad. • {calcolo.F} figli pagano {currency(calcolo.quotaFiglio)} cad.</p>
        </div>
      )}
    </form>
  );
};

export default BillForm;
