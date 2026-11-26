import type { Metadata } from "next";
import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Kurban AI / Qurban AI privacy policy: how personal data is collected, processed, stored, and your rights under applicable privacy laws including KVKK.",
  path: "/privacy/en",
  keywords: ["privacy policy", "kvkk", "personal data", "qurban ai"],
});

export default function PrivacyEnPage() {
  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <Link
                href="/privacy"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Türkçe
              </Link>
              <span className="text-neutral-400">·</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                English
              </span>
            </div>

            <h1 className="font-display text-4xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Privacy Policy
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Last updated: {new Date().toLocaleDateString("en-US")}
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                1. Introduction
              </h2>
              <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Kurban AI (also referred to internationally as Qurban AI /
                Kurbanlık Analiz) takes the security and privacy of your personal
                data seriously. This Privacy Policy explains how personal data is
                collected, processed, protected, and shared in connection with our
                website and mobile application, in line with Türkiye’s Personal
                Data Protection Law (KVKK No. 6698) and other applicable rules.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                2. Data Controller
              </h2>
              <div className="bg-primary-50 dark:bg-primary-950/40 p-6 rounded-lg mb-6 ring-1 ring-primary-200/60 dark:ring-primary-800/50">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  <strong>Project owner:</strong> Mehmet Erdem Akın
                  <br />
                  <strong>Address:</strong> Ataşehir, İstanbul
                  <br />
                  <strong>Email:</strong> mehmet.erdem.akin@outlook.com
                  <br />
                  <strong>Website:</strong> kurbanlikkilohesaplama.com
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                3. Personal Data We Collect
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                When you use our services we may collect:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Identity data
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>First and last name</li>
                    <li>Email address</li>
                    <li>Phone number (optional)</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Technical data
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>IP address</li>
                    <li>Browser information</li>
                    <li>Device information</li>
                    <li>Location (only if permission is granted)</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    App data
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>Uploaded livestock photos</li>
                    <li>Analysis results</li>
                    <li>Usage / analysis history</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900/95 dark:border-neutral-600 border border-neutral-200 p-4 rounded-lg">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Communication data
                  </h3>
                  <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>Support requests</li>
                    <li>Feedback</li>
                    <li>Complaints</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                4. Purposes of Processing
              </h2>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 mb-6">
                <li>Provide AI-assisted livestock analysis</li>
                <li>Create and manage user accounts</li>
                <li>Show analysis results and history</li>
                <li>Improve service quality</li>
                <li>Provide technical support</li>
                <li>Meet legal obligations</li>
                <li>Apply security measures</li>
                <li>Produce aggregated statistics</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                5. Legal Bases
              </h2>
              <div className="bg-accent-50 dark:bg-accent-950/40 p-6 rounded-lg mb-6 ring-1 ring-accent-200/60 dark:ring-accent-800/50">
                <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2">
                  <li>
                    <strong>Consent:</strong> approval you give to use the
                    services
                  </li>
                  <li>
                    <strong>Contract performance:</strong> delivering the
                    requested service
                  </li>
                  <li>
                    <strong>Legal obligation:</strong> where required by law
                  </li>
                  <li>
                    <strong>Legitimate interest:</strong> service security and
                    improvement
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                6. Sharing Personal Data
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                We may share personal data only when necessary, for example:
              </p>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 mb-6">
                <li>Legal requirements (court orders, law enforcement)</li>
                <li>
                  Service providers (hosting, payment redirect partners such as
                  Shopier, AI processing infrastructure)
                </li>
                <li>Business partners (anonymous statistical data only)</li>
                <li>Emergency situations (security threats, fraud)</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                7. Retention
              </h2>
              <div className="bg-green-50 dark:bg-emerald-950/35 dark:border-emerald-800/50 border border-green-200 p-6 rounded-lg mb-6">
                <p className="text-green-700 dark:text-green-300/95 leading-relaxed mb-4">
                  We apply data minimization. Personal data is kept only as long
                  as needed to provide the service. Raw photo files are not kept
                  as a permanent archive. If you use account or history features,
                  analysis summaries and account information may be stored on the
                  server for a limited period.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-neutral-900/90 dark:ring-1 dark:ring-neutral-700/70 p-4 rounded-lg text-center">
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Photos
                    </h4>
                    <p className="text-green-700 dark:text-green-300/95 text-sm">
                      Processed for analysis; no permanent photo archive
                    </p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900/90 dark:ring-1 dark:ring-neutral-700/70 p-4 rounded-lg text-center">
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Analysis results
                    </h4>
                    <p className="text-green-700 dark:text-green-300/95 text-sm">
                      May be stored as optional history summaries
                    </p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900/90 dark:ring-1 dark:ring-neutral-700/70 p-4 rounded-lg text-center">
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      Logs
                    </h4>
                    <p className="text-green-700 dark:text-green-300/95 text-sm">
                      Kept for a minimum security period
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                8. Security
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-success-50 dark:bg-emerald-950/35 dark:ring-1 dark:ring-emerald-800/40 p-4 rounded-lg">
                  <h3 className="font-bold text-success-800 dark:text-emerald-200 mb-2">
                    Technical measures
                  </h3>
                  <ul className="text-success-700 dark:text-emerald-300/95 space-y-1">
                    <li>SSL/TLS encryption</li>
                    <li>Secured hosting</li>
                    <li>Access controls</li>
                    <li>Periodic security reviews</li>
                  </ul>
                </div>
                <div className="bg-primary-50 dark:bg-primary-950/40 dark:ring-1 dark:ring-primary-800/45 p-4 rounded-lg">
                  <h3 className="font-bold text-primary-800 dark:text-primary-200 mb-2">
                    Organizational measures
                  </h3>
                  <ul className="text-primary-700 dark:text-primary-300/95 space-y-1">
                    <li>Limited access to personal data</li>
                    <li>Confidentiality practices</li>
                    <li>Incident response planning</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                9. Your Rights (KVKK)
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Subject to applicable law, you may request:
              </p>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 mb-6">
                <li>Information about processing</li>
                <li>Access to your data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Restriction / objection where applicable</li>
                <li>Complaint to the competent authority</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                10. Cookies
              </h2>
              <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2 mb-6">
                <li>
                  <strong>Essential cookies:</strong> required for site
                  functionality and session security
                </li>
                <li>
                  <strong>Performance cookies:</strong> help measure site
                  performance
                </li>
                <li>
                  <strong>Functional cookies:</strong> improve user experience
                </li>
                <li>
                  <strong>Marketing cookies:</strong> only with consent, if used
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                11. AI and Photo Processing
              </h2>
              <div className="bg-warning-50 dark:bg-amber-950/35 dark:border-amber-800/55 border border-warning-200 p-6 rounded-lg mb-6">
                <p className="text-warning-800 dark:text-amber-200 leading-relaxed">
                  <strong>Important:</strong> Livestock photos you upload are
                  processed by our AI model for analysis. Photos are used for
                  that purpose and are not sold. We do not keep a permanent raw
                  photo archive. You may contact us to request deletion of
                  related account or history data.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                12. Contact
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/40 dark:to-accent-950/40 p-6 rounded-lg mb-6 ring-1 ring-primary-200/50 dark:ring-neutral-700/50">
                <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                  To exercise your privacy rights or ask questions:
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                  <strong>Email:</strong> mehmet.erdem.akin@outlook.com
                  <br />
                  <strong>Address:</strong> Ataşehir, İstanbul
                  <br />
                  <strong>Contact form:</strong>{" "}
                  <Link
                    href="/contact"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    /contact
                  </Link>
                </p>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                13. Changes
              </h2>
              <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                We may update this Privacy Policy when laws or our services
                change. The current version is always available on our website.
                Material changes may also be communicated by email when
                appropriate.
              </p>

              <div className="bg-neutral-100 dark:bg-neutral-800/90 dark:border-neutral-600 border border-transparent p-6 rounded-lg">
                <p className="text-neutral-700 dark:text-neutral-300 text-center">
                  <strong>Last updated:</strong>{" "}
                  {new Date().toLocaleDateString("en-US")}
                  <br />
                  <strong>Policy version:</strong> 1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </AppPageShell>
  );
}
