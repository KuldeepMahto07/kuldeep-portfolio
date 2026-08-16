"use client";

import { useState } from "react";
import ScrambledText from "@/components/motion/ScrambledText";
import { contact, profile } from "@/data/content";
import styles from "./Contact.module.scss";

/**
 * Contact — dark editorial sheet, ending above the light footer.
 *
 * Submitting composes a mailto with the entered values.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry — ${form.name || "Portfolio"}`);
    const body = encodeURIComponent(`${form.message}\n\n—\n${form.name}\n${form.email}`.trim());
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className={styles.section} id="contact">
      <h2 className={styles.heading}>
        {contact.headingLines.map((line) => (
          <span className="lineMask" key={line}>
            <span className="lineInner" data-split-inner>
              {line}
            </span>
          </span>
        ))}
      </h2>

      <div className={styles.grid}>
        <div className={styles.aside}>
          <a href={`mailto:${profile.email}`} className={styles.link} data-cursor="link">
            <ScrambledText text={profile.email} />
          </a>
          <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className={styles.link} data-cursor="link">
            <ScrambledText text={profile.phone} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            className={styles.link}
            data-cursor="link"
          >
            <ScrambledText text="GitHub" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener"
            className={styles.link}
            data-cursor="link"
          >
            <ScrambledText text="LinkedIn" />
          </a>
          <span className={styles.loc}>{profile.location}</span>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          {contact.fields.map((field) => (
            <div className={styles.field} key={field.id}>
              <input
                id={field.id}
                type={field.type}
                required
                placeholder=" "
                value={form[field.id as "name" | "email"]}
                onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
              />
              <label htmlFor={field.id}>{field.label}</label>
            </div>
          ))}

          <div className={styles.field}>
            <textarea
              id="message"
              rows={4}
              required
              placeholder=" "
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <label htmlFor="message">{contact.messageLabel}</label>
          </div>

          <button type="submit" className={styles.submit} data-cursor="button">
            {contact.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
