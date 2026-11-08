import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Privacy policy' }

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="8 November 2026">
      <h2>Who we are</h2>
      <p>
        This website is run by VELTRIX (&ldquo;we&rdquo;, &ldquo;us&rdquo;). For the purposes of UK
        data protection law, including the UK GDPR and the Data Protection Act 2018, VELTRIX is the
        controller of the personal information described in this policy.
      </p>
      <ul>
        <li>Registered name and address: [to be added]</li>
        <li>Company number: [to be added, if applicable]</li>
        <li>
          Contact: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
      </ul>

      <h2>What we collect</h2>
      <p>When you send an enquiry through our Get in touch form, we collect:</p>
      <ul>
        <li>your name and email address</li>
        <li>your company or project name, if you give one</li>
        <li>what you need help with and, if you choose to tell us, your budget range</li>
        <li>the project details you write in the form</li>
      </ul>
      <p>
        If you email us directly, we receive your email address and anything you include in your
        message. We do not ask for, and ask you not to send, sensitive personal information.
      </p>
      <p>
        Like most websites, our hosting provider may record basic technical information such as IP
        addresses and browser type in server logs, to keep the site secure and working.
      </p>

      <h2>How we use it</h2>
      <p>We use your information to:</p>
      <ul>
        <li>read and reply to your enquiry</li>
        <li>arrange a call and prepare a proposal, if you ask us to</li>
        <li>keep a record of our correspondence with you</li>
      </ul>
      <p>
        Our lawful basis is our legitimate interest in responding to enquiries and, where you are
        asking about working with us, taking steps at your request before entering into a contract.
        We do not use your details for marketing, and we do not sell them.
      </p>

      <h2>Who we share it with</h2>
      <p>We use trusted service providers who process information on our behalf:</p>
      <ul>
        <li>Formspree, which receives form submissions and forwards them to us by email</li>
        <li>[Website hosting provider — to be confirmed]</li>
        <li>[Email provider — to be confirmed]</li>
      </ul>
      <p>
        Some of these providers may process data outside the UK. Where they do, we rely on
        appropriate safeguards recognised under UK law, such as the UK International Data Transfer
        Agreement or approved contractual clauses. [Confirm for each provider.]
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for up to [24 months] after our last contact with you, unless you become a
        client, in which case we keep project records for as long as needed to provide our services
        and meet our legal obligations. [Confirm retention periods.]
      </p>

      <h2>Cookies</h2>
      <p>
        This website does not use advertising or analytics cookies. If that changes, we will update
        this policy and ask for your consent where required.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right to ask for a copy of your personal information, to have it corrected or
        deleted, to restrict or object to how we use it, and to ask for it to be transferred. To make
        a request, email <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond within
        one month.
      </p>
      <p>
        If you are unhappy with how we have handled your information, you can complain to the
        Information Commissioner&apos;s Office at{' '}
        <a href="https://ico.org.uk" rel="noopener noreferrer">
          ico.org.uk
        </a>
        . We would appreciate the chance to deal with your concern first.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows when it was last
        changed.
      </p>
    </LegalPage>
  )
}
