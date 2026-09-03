import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { contact, org } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms on which ${org.name} makes this website available.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Use"
      intro={`The terms on which ${org.name} makes this website available. By using the site you accept them.`}
    >
      <h2>Using this site</h2>
      <p>
        You are welcome to read, link to and quote this site. You may not use it
        in a way that damages it, interferes with anyone else&rsquo;s use of it,
        or breaks the law.
      </p>

      <h2>What is on the site</h2>
      <p>
        The pages here describe the kind of work we do. They are general
        information, not professional or engineering advice, and nothing on this
        site creates a client relationship. Decisions with real consequences
        deserve a real engagement, where we can see your data and your
        constraints.
      </p>

      <h2>Ownership</h2>
      <p>
        The text, design, logo and original artwork on this site belong to{" "}
        {org.name}. Please ask before reproducing them commercially. Published
        research linked from this site remains subject to the terms of whichever
        journal or society published it.
      </p>

      <h2>Links to other sites</h2>
      <p>
        We link out to publishers, YouTube and other third parties. We do not
        control those sites and are not responsible for what they contain or how
        they treat your data.
      </p>

      <h2>Accuracy</h2>
      <p>
        We keep this site as accurate as we reasonably can, but we do not
        guarantee that everything on it is complete or current, and we may
        change it at any time.
      </p>

      <h2>Liability</h2>
      <p>
        We provide this website as it is. To the extent the law allows, we are
        not liable for loss arising from your use of it or from reliance on
        general information published here. Nothing in these terms limits
        liability that cannot lawfully be limited.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Federal Republic of Nigeria,
        and the courts of Nigeria have jurisdiction over any dispute about them.
      </p>

      <h2>Changes</h2>
      <p>
        We may revise these terms. The date at the top of this page shows when
        they last changed.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can go to{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
