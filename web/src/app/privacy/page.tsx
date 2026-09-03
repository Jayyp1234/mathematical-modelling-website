import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { contact, org } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${org.name} handles the information you share through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro={`How ${org.name} handles information you share through this website, and what this site does and does not collect.`}
    >
      <h2>What this site collects</h2>
      <p>
        This website has no accounts, no advertising and no analytics. The only
        information we collect is what you choose to send us through the contact
        form:
      </p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your organisation, if you give one</li>
        <li>The topic you select, if you select one</li>
        <li>The message you write</li>
      </ul>
      <p>
        We use these details for one purpose: to read your enquiry and reply to
        it. We do not add you to a mailing list, and we do not sell, rent or
        share your details with anyone for marketing.
      </p>

      <h2>Cookies</h2>
      <p>
        This site sets no cookies and stores nothing in your browser. There is
        no cookie banner because there is nothing to consent to.
      </p>

      <h2>Fonts</h2>
      <p>
        The typefaces are served from this website&rsquo;s own domain. Your
        browser makes no request to Google Fonts or any other font host, so no
        third party learns that you visited.
      </p>

      <h2>Video thumbnails</h2>
      <p>
        Pages that show videos load their preview images directly from
        YouTube&rsquo;s image servers (<code>i.ytimg.com</code>). When that
        happens your browser contacts Google, and Google may record your IP
        address and user agent as it would for any image request. Following a
        link through to YouTube itself puts you on Google&rsquo;s platform,
        under{" "}
        <a href="https://policies.google.com/privacy" rel="noreferrer" target="_blank">
          their privacy policy
        </a>
        .
      </p>

      <h2>How enquiries reach us</h2>
      <p>
        Messages sent through the contact form are passed to the service that
        delivers them to our mailbox. That provider processes your message only
        to deliver it. Beyond that, enquiries live in our email.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for as long as we need them for the conversation they
        started and any work that follows, then delete them. If you would like
        your enquiry deleted sooner, ask us and we will do it.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us what information we hold about you, ask us to correct it,
        or ask us to delete it. Write to{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> and we will
        respond.
      </p>

      <h2>Server logs</h2>
      <p>
        Like any website, the servers that deliver these pages keep short-lived
        technical logs — the requested address, a timestamp, an IP address —
        used to keep the site running and secure, not to build a profile of you.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes we will update the date at the top of this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can go to{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>, or by post to{" "}
        {org.name}, {contact.location}.
      </p>
    </LegalPage>
  );
}
