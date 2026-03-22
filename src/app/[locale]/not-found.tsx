import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="font-display text-5xl md:text-7xl tracking-tight mb-4">
        404
      </h1>
      <p className="text-xl text-muted-foreground mb-2">{t("title")}</p>
      <p className="text-muted-foreground mb-8">{t("description")}</p>
      <Link
        href="/"
        className="inline-flex items-center px-5 py-2.5 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
      >
        {t("goHome")}
      </Link>
    </div>
  );
}
