import { RouteShell } from "@/components/RouteShell";

export default function PrivacyPage() {
  return <RouteShell eyebrow="✦ YOUR INFORMATION ✦" title={<>Privacy, by <em>design.</em></>} intro="We collect only the information needed to provide the travel service you request." >
    <article className="info-copy tool-card">
      <h2>Information you submit</h2>
      <p>Account details, saved trips, traveler names, reviews, and enquiry details are stored in the configured application database. Visitor enquiries are visible only to authorized administrators and are used to respond to your request.</p>
      <h2>How we use it</h2>
      <p>We use submitted information to operate your account, maintain your trip plans, answer enquiries, and provide requested services. We do not publish personal information on public destination pages.</p>
      <h2>Your choices</h2>
      <p>You may use public discovery features without creating an account. Do not enter passport, payment card, or other sensitive identity information in free-text fields. Payment credentials must be collected by the configured payment provider.</p>
      <p>For account access or deletion requests, contact us using the enquiry form.</p>
    </article>
  </RouteShell>;
}
