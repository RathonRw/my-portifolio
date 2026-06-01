/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: for now */
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { META_THEME_COLORS, siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Lecon",
      url: "https://founder.rathon-rw.com",
    },
  ],
  creator: "Lecon",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    images: [`${siteConfig.ogImage}`],
    creator: "@lecon",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  metadataBase: new URL(siteConfig.url),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteConfig.url,
  sameAs: [
    "https://github.com/leconstantin",
    "https://x.com/Lecon",
    "https://linkedin.com/in/lecon",
  ],
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${fontVariables} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />
        <meta content={META_THEME_COLORS.light} name="theme-color" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
