import Link from 'next/link';
import Layout from '../components/Layout';

export default function Custom404() {
    return (
        <Layout title="Page Not Found">
            <section className="py-28 text-center">
                <div className="mx-auto max-w-xl px-6">
                    <p className="font-mono text-sm font-semibold uppercase tracking-wider text-aim-500">
                        404 Error
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold text-aim-900 sm:text-4xl">
                        Page not found
                    </h1>
                    <p className="mt-4 text-aim-600">
                        Return to the EdgeForge enclosure configurator to customize your hardware specification.
                    </p>
                    <div className="mt-8">
                        <Link href="/" className="btn-primary">
                            Back to EdgeForge Configurator
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
