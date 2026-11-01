import { describe, expect, it } from "vitest";
import { waitlistArguments, waitlistSchema } from "@/lib/waitlist";

describe("Waitlist requirements", () => {
  it("requires a valid email", () => {
    expect(waitlistSchema.safeParse({ email: "", consent: true }).success).toBe(false);
    expect(waitlistSchema.safeParse({ email: "not-an-email", consent: true }).success).toBe(false);
    expect(waitlistSchema.safeParse({ email: "person@example.com", consent: true }).success).toBe(true);
  });
  it("requires explicit consent", () => {
    expect(waitlistSchema.safeParse({ email: "person@example.com", consent: false }).success).toBe(false);
    expect(waitlistSchema.safeParse({ email: "person@example.com" }).success).toBe(false);
  });
  it("normalizes email so case and surrounding whitespace cannot create duplicates", () => {
    expect(waitlistArguments({ email: " PERSON@Example.COM ", consent: true }).p_email).toBe("person@example.com");
  });
});