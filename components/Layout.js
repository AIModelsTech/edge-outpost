import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const defaultMeta = {
    title: 'Edge Outpost by AIM — Custom Weather-Resistant Edge AI Enclosures',
    description:
        'Configure custom NEMA 4X weather-resistant Edge AI enclosures with scalable DIN-rail compute (up to 2,000+ TOPS), PoE++ & GMSL2 camera glands, 5G & NTN satellite backhaul, LiFePO4 UPS, and solar/alternator charging.',
};

export default function Layout({ children, title, description }) {
    const pageTitle = title ? `${title} | Edge Outpost by AIM` : defaultMeta.title;
    const pageDescription = description || defaultMeta.description;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/images/aim-logo.svg" type="image/svg+xml" />
            </Head>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </>
    );
}
