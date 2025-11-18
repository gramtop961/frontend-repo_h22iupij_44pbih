import React from "react";

const currency = (n) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    n || 0
  );

const Result = ({ result }) => {
  if (!result) return null;
  const { A, F, quotaAdulto, quotaFiglio, subtotAdulti, subtotFigli, totale } = result;
  return (
    <div className="mt-8 bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 text-blue-50">
      <h3 className="text-lg font-semibold mb-4">Risultato</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-slate-900/40 rounded-xl p-4">
          <p className="text-blue-200">Adulti</p>
          <p className="text-2xl font-bold mt-1">{A}</p>
          <p className="mt-1 text-blue-300/80">{currency(quotaAdulto)} ciascuno</p>
          <p className="mt-1 text-blue-300/60">Totale: {currency(subtotAdulti)}</p>
        </div>
        <div className="bg-slate-900/40 rounded-xl p-4">
          <p className="text-blue-200">Figli</p>
          <p className="text-2xl font-bold mt-1">{F}</p>
          <p className="mt-1 text-blue-300/80">{currency(quotaFiglio)} ciascuno</p>
          <p className="mt-1 text-blue-300/60">Totale: {currency(subtotFigli)}</p>
        </div>
        <div className="bg-slate-900/40 rounded-xl p-4">
          <p className="text-blue-200">Conto</p>
          <p className="text-2xl font-bold mt-1">{currency(totale)}</p>
          <p className="mt-1 text-blue-300/60">Conferma che le somme coincidono</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
