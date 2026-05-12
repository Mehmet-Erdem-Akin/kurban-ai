import { ScaleIcon } from "@heroicons/react/24/outline";
import {
  getYieldProfileLabel,
  type LargeCattleYieldProfile,
  type YieldTableRow,
} from "@/utils/yieldCalculator";

type YieldTableProps = {
  rows: YieldTableRow[];
  profile: LargeCattleYieldProfile;
  title?: string;
  description?: string;
};

const formatNumber = (value: number) => value.toLocaleString("tr-TR");

const YieldTable = ({
  rows,
  profile,
  title = "Randımana Göre Kurban Eti Kilosu",
  description = "Farklı randıman oranlarına göre tahmini et ve hisse başı düşen miktar",
}: YieldTableProps) => {
  return (
    <section className="card-hover overflow-hidden">
      <div className="border-b border-stone-100 bg-stone-50/70 px-4 py-4 dark:border-stone-800 dark:bg-stone-950/60 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="flex items-center font-display text-lg font-semibold text-stone-900 dark:text-stone-50 sm:text-xl">
              <ScaleIcon
                className="mr-2 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400"
                strokeWidth={2}
                aria-hidden
              />
              {title}
            </h3>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {description}
            </p>
          </div>
          <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/40 dark:text-emerald-200">
            {getYieldProfileLabel(profile)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-stone-100/80 text-xs uppercase tracking-wider text-stone-500 dark:bg-stone-900/80 dark:text-stone-400">
            <tr>
              <th className="px-4 py-3 font-bold sm:px-6">Randıman</th>
              <th className="px-4 py-3 text-right font-bold sm:px-6">
                Toplam Et
              </th>
              <th className="px-4 py-3 text-right font-bold sm:px-6">
                Hisse Başı (KG)
              </th>
              <th className="px-4 py-3 text-right font-bold sm:px-6">
                Etin KG Fiyatı
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/80 dark:divide-stone-800">
            {rows.map((row) => (
              <tr
                key={row.rate}
                className="bg-white text-stone-900 odd:bg-stone-50/70 hover:bg-emerald-50/60 dark:bg-stone-950 dark:text-stone-100 dark:odd:bg-stone-900/70 dark:hover:bg-emerald-950/25"
              >
                <td className="px-4 py-4 font-bold text-stone-800 dark:text-stone-100 sm:px-6">
                  RANDIMAN{" "}
                  <span className="text-emerald-700 dark:text-emerald-300">
                    %{row.rate}
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-lg font-bold sm:px-6">
                  {formatNumber(row.totalMeat)}
                </td>
                <td className="px-4 py-4 text-right text-lg font-bold text-emerald-700 dark:text-emerald-300 sm:px-6">
                  {formatNumber(row.shareKg)}
                </td>
                <td className="px-4 py-4 text-right text-lg font-bold sm:px-6">
                  {formatNumber(row.meatKgPrice)} ₺
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default YieldTable;
