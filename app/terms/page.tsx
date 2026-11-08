import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/site/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Terms and conditions' }

export default function TermsPage() {
  return (
    <LegalPage title="Terms and conditions" updated="8 November 2026">
      <h2>About these terms</h2>
      <p>
        These terms explain how you may use the VELTRIX website. By using the site, you agree to
        them. If you do not agree, please do not use the site.
      </p>
      <p>
        The site is run by VELTRIX, [registered name, address and company number to be added]. You can
        contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Using the site</h2>
      <ul>
        <li>You may view and share pages from the site for your own non-commercial use.</li>
        <li>
          You must not misuse the site, for example by trying to gain unauthorised access, introducing
          malicious code, or interfering with how it works.
        </li>
        <li>We may change, suspend or withdraw any part of the site without notice.</li>
      </ul>

      <h2>Information on the site</h2>
      <p>
        We work to keep the information on this site accurate and up to date, but it is provided for
        general information only. Products shown as &ldquo;coming soon&rdquo; are in development and
        their features, platforms, pricing and availability may change.
      </p>

      <h2>Enquiries and proposals</h2>
      <p>
        Sending an enquiry does not create a contract between you and us. Any work we carry out for
        you will be agreed separately in a written proposal or contract, which will set out the scope,
        price and terms for that work.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The VELTRIX name, wordmark and the content and design of this site belong to VELTRIX or our
        licensors. You must not copy or reuse them for commercial purposes without our written
        permission.
      </p>

      <h2>Links to other sites</h2>
      <p>
        Where the site links to other websites, those links are for your convenience. We are not
        responsible for the content or privacy practices of other sites.
      </p>

      <h2>Our liability</h2>
      <p>
        Nothing in these terms limits or excludes our liability where it would be unlawful to do so,
        including for death or personal injury caused by negligence, or for fraud. Otherwise, we are
        not liable for any loss arising from your use of, or inability to use, this website, or from
        relying on its content.
      </p>

      <h2>Your personal information</h2>
      <p>
        How we handle personal information is explained in our{' '}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the law of [England and Wales — confirm], and the courts of [that
        jurisdiction] have jurisdiction over any dispute, except that if you live elsewhere in the UK
        you may also bring proceedings in your home courts.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The date at the top shows when they were last
        changed.
      </p>
    </LegalPage>
  )
}
