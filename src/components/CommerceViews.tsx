"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CreditCard,
  Download,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  Smartphone,
  QrCode,
  WalletCards
} from "lucide-react";
import { useEffect, useState } from "react";
import { RouteShell } from "@/components/RouteShell";
import { destinations } from "@/lib/data";
import { usePreferences } from "@/components/Preferences";

declare global {
  interface Window { Razorpay?: new (options: Record<string, unknown>) => { open: () => void } }
}

export function EnrollmentView({ slug }: { slug: string }) {
  const { t } = usePreferences();
  const destination = destinations.find((d) => d.slug === slug) ?? destinations[0];

  const [travellerName, setTravellerName] = useState("");
  const [travellersCount, setTravellersCount] = useState(2);
  const [travelerNames, setTravelerNames] = useState(["", ""]);
  const [travelDate, setTravelDate] = useState("");
  const [tripSaved, setTripSaved] = useState(false);
  const [tripSaving, setTripSaving] = useState(false);
  const [tripRecordId, setTripRecordId] = useState("");
  const [stayTier, setStayTier] = useState<"Standard" | "Heritage / Mid" | "Luxury">("Heritage / Mid");
  const [transportTier, setTransportTier] = useState<"Drive & Local" | "Flight + Cab" | "Train + Local">("Flight + Cab");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [receiptData, setReceiptData] = useState<{ receiptNumber: string; transactionId: string; bookingReference: string; method: string; issuedAt: string; travelers: string[]; destination: string; amount: number; currency: string; travelDate?: string | null } | null>(null);
  const [paymentChoice, setPaymentChoice] = useState<"upi" | "qr" | "other">("upi");
  const [qrOrder, setQrOrder] = useState<{ reference: string; amount: number; currency: string; qrCodeId: string; imageUrl: string; orderId: string; expiresAt: number } | null>(null);

  const basePricePerPerson = 18500;
  const stayMultiplier = stayTier === "Luxury" ? 2.2 : stayTier === "Heritage / Mid" ? 1.4 : 1.0;
  const transportCost = transportTier === "Flight + Cab" ? 8500 : transportTier === "Train + Local" ? 3200 : 4500;
  const totalAmount = Math.round(basePricePerPerson * travellersCount * stayMultiplier + transportCost * travellersCount);

  const saveTrip = async () => {
    setTripSaving(true); setMessage("");
    try {
      if (travelerNames.slice(0, travellersCount).some((name) => !name.trim())) throw new Error("Enter a name for every traveller before saving.");
      const response = await fetch("/api/trips", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: `${destination.name} trip`, destination: slug, travellers: travellersCount, travelers: travelerNames.slice(0, travellersCount), travelDate: travelDate || undefined, budget: `₹${totalAmount.toLocaleString("en-IN")}`, style: `${stayTier}; ${transportTier}`, preferences: { stayTier, transportTier } }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to save trip.");
      setTripRecordId(data.trip.id); setTripSaved(true); setMessage("Trip details saved securely to your account. Payment has not been made.");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Unable to save trip. Sign in and try again."); }
    finally { setTripSaving(false); }
  };

  const pay = async (choice = paymentChoice) => {
    setLoading(true);
    setMessage("Creating a secure hosted checkout...");
    try {
      if (!travellerName.trim()) throw new Error("Enter the primary traveller name before checkout.");
      if (!tripRecordId) throw new Error("Save this trip to your account before checkout.");
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId: tripRecordId, method: choice === "qr" ? "qr" : "checkout" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Secure checkout is unavailable.");
      if (choice === "qr") {
        setQrOrder({ reference: data.bookingReference, amount: data.amount / 100, currency: data.currency, qrCodeId: data.qrCodeId, imageUrl: data.imageUrl, orderId: data.orderId, expiresAt: data.expiresAt });
        setMessage("Razorpay generated a booking-specific QR. Scan it with any supported UPI app; this page will wait for provider confirmation.");
        return;
      }
      if (!window.Razorpay) await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script"); script.src = "https://checkout.razorpay.com/v1/checkout.js"; script.onload = () => resolve(); script.onerror = () => reject(new Error("Unable to load the hosted payment checkout.")); document.body.appendChild(script);
      });
      if (!window.Razorpay) throw new Error("Hosted checkout did not initialize.");
      const checkout = new window.Razorpay({ key: data.keyId, amount: data.amount, currency: data.currency, order_id: data.orderId, name: "TRAVEXA", description: `${destination.name} travel plan`, prefill: { name: travellerName }, theme: { color: "#e9785d" },
        handler: async (result: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try { const verified = await fetch("/api/payments/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result) }); const resultData = await verified.json(); if (!verified.ok) throw new Error(resultData.error ?? "Payment not verified."); setPaid(true); setReceiptData({ ...resultData.receipt, transactionId: result.razorpay_payment_id }); setMessage("Payment verified and receipt issued."); }
          catch (e) { setMessage(e instanceof Error ? e.message : "Payment status is not verified yet."); }
        }, modal: { ondismiss: () => setMessage("Checkout closed. No success confirmation was received.") },
      });
      checkout.open();
      setMessage("Complete payment in the provider's secure checkout. A receipt appears only after server verification.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Gateway communication error. No payment was taken.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!qrOrder || paid) return;
    const timer = window.setInterval(async () => {
      try {
        const response = await fetch("/api/payments/qr-status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: qrOrder.orderId, qrCodeId: qrOrder.qrCodeId }) });
        const result = await response.json();
        if (result.status === "SUCCEEDED" && result.receipt) {
          setPaid(true);
          setReceiptData(result.receipt);
          setQrOrder(null);
          setMessage("QR payment verified by Razorpay; your receipt has been issued.");
        } else if (result.status === "FAILED" || result.status === "CANCELLED") {
          setQrOrder(null);
          setMessage(result.error ?? "QR payment ended without a charge. You can retry checkout.");
        }
      } catch { setMessage("Waiting for Razorpay to confirm this QR payment…"); }
    }, 4000);
    return () => window.clearInterval(timer);
  }, [qrOrder, paid]);

  const cancelQr = async (): Promise<boolean> => {
    if (!qrOrder) return false;
    setLoading(true);
    try {
      const response = await fetch("/api/payments/cancel-qr", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: qrOrder.orderId, qrCodeId: qrOrder.qrCodeId }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to cancel this QR.");
      setQrOrder(null);
      setMessage("QR checkout cancelled with the provider. No successful payment was recorded.");
      return true;
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to cancel QR checkout."); return false; }
    finally { setLoading(false); }
  };

  const switchQrToUpiApps = async () => {
    const cancelled = await cancelQr();
    if (!cancelled) return;
    setQrOrder(null);
    setPaymentChoice("upi");
    await pay("upi");
  };

  return (
    <RouteShell
      eyebrow={`✦ ${destination.name.toUpperCase()} ENROLLMENT ✦`}
      title={<>Confirm Your <em>Journey.</em></>}
      intro="Review your itinerary details, customize transport and stay tiers, and complete your secure booking with instant receipt generation."
    >
      <div className="commerce-layout">
        {/* Trip Summary Card */}
        <div className="enrollment-summary">
          <span className="eyebrow">✦ {t("bookingSummary")} ✦</span>
          <h2>{destination.name} <em>Experience.</em></h2>
          <p className="summary-desc">{destination.tag}</p>

          <div className="summary-row">
            <span><MapPin size={14} /> Destination</span>
            <strong>{destination.name}, {destination.country}</strong>
          </div>

          <div className="summary-row"><span><Calendar size={14} /> Travel date</span><input aria-label="Travel date" type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} /></div>

          <div className="summary-row">
            <span><Calendar size={14} /> Duration</span>
            <strong>{destination.duration} · Recommended Season ({destination.bestTime})</strong>
          </div>

          <div className="summary-row">
            <span><Users size={14} /> {t("bookingTravellers")}</span>
            <select
              value={travellersCount}
              onChange={(e) => { const count = Number(e.target.value); setTravellersCount(count); setTravelerNames((names) => Array.from({ length: count }, (_, i) => names[i] ?? "")); }}
              className="summary-select"
            >
              <option value={1}>1 Solo Traveller</option>
              <option value={2}>2 Travellers (Duo)</option>
              <option value={3}>3 Travellers</option>
              <option value={4}>4 Travellers (Family)</option>
            </select>
          </div>

          {travelerNames.slice(0, travellersCount).map((name, index) => <label className="summary-row" key={index}><span>Traveller {index + 1} name</span><input required aria-label={`Traveller ${index + 1} name`} autoComplete="name" maxLength={120} value={name} onChange={(e) => setTravelerNames((names) => names.map((entry, i) => i === index ? e.target.value : entry))} placeholder="Full name" /></label>)}

          <div className="summary-row">
            <span>Stay Tier</span>
            <select
              value={stayTier}
              onChange={(e) => setStayTier(e.target.value as "Standard" | "Heritage / Mid" | "Luxury")}
              className="summary-select"
            >
              <option>Standard</option>
              <option>Heritage / Mid</option>
              <option>Luxury</option>
            </select>
          </div>

          <div className="summary-row">
            <span>Transport</span>
            <select
              value={transportTier}
              onChange={(e) => setTransportTier(e.target.value as "Drive & Local" | "Flight + Cab" | "Train + Local")}
              className="summary-select"
            >
              <option>Flight + Cab</option>
              <option>Train + Local</option>
              <option>Drive & Local</option>
            </select>
          </div>

          <div className="summary-row total">
            <span>{t("bookingTotal")}</span>
            <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
          </div>

          <div className="commerce-note">
            <ShieldCheck size={16} /> Save your trip plan. Booking and payment are confirmed only after provider verification.
          </div>
          <button type="button" className="button button-dark" onClick={saveTrip} disabled={tripSaving || tripSaved}>{tripSaving ? "Saving trip…" : tripSaved ? "Trip saved" : "Save trip to my account"}</button>
        </div>

        {/* Payment Form Card */}
        <div className="payment-card">
          <span className="eyebrow">✦ SECURE HOSTED CHECKOUT ✦</span>
          <div className="payment-form-fields">
            <label className="payment-input"><span>PRIMARY TRAVELLER</span><input required value={travellerName} onChange={(e) => setTravellerName(e.target.value)} maxLength={120} autoComplete="name" placeholder="Full name" /></label>
            <div className="payment-methods" aria-label="Payment methods available through secure checkout">
              <button type="button" className={`payment-method-option ${paymentChoice === "upi" ? "selected" : ""}`} aria-pressed={paymentChoice === "upi"} onClick={() => setPaymentChoice("upi")}>
                <span className="payment-method-icon"><Smartphone size={18} /></span>
                <span><strong>UPI apps</strong><small>Google Pay, PhonePe, BHIM and other enabled apps</small></span>
              </button>
              <button type="button" className={`payment-method-option ${paymentChoice === "qr" ? "selected" : ""}`} aria-pressed={paymentChoice === "qr"} onClick={() => { setPaymentChoice("qr"); void pay("qr"); }} disabled={loading || paid}>
                <span className="payment-method-icon"><QrCode size={18} /></span>
                <span><strong>Scan a QR</strong><small>Create a provider QR for this booking and exact amount</small></span>
              </button>
              <button type="button" className={`payment-method-option ${paymentChoice === "other" ? "selected" : ""}`} aria-pressed={paymentChoice === "other"} onClick={() => setPaymentChoice("other")}>
                <span className="payment-method-icon"><WalletCards size={18} /></span>
                <span><strong>Cards & more</strong><small>Other methods enabled for the merchant</small></span>
              </button>
            </div>
            <p className="payment-method-note">Choose your method in Razorpay’s secure checkout. UPI apps, QR, cards and other options depend on merchant activation and device support. TRAVEXA never collects card or UPI credentials.</p>
            {paymentChoice === "qr" && qrOrder && <div className="qr-checkout-status qr-checkout-panel" role="status"><div className="qr-checkout-copy"><QrCode size={20} /><div><strong>Scan &amp; Pay · Razorpay UPI</strong><span>Booking {qrOrder.reference} · {qrOrder.currency} {qrOrder.amount.toLocaleString("en-IN")}</span><small>{message || "Waiting for secure provider confirmation…"}</small></div></div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={qrOrder.imageUrl} alt={`Razorpay payment QR for booking ${qrOrder.reference}, amount ${qrOrder.currency} ${qrOrder.amount.toLocaleString("en-IN")}`} /><a href={qrOrder.imageUrl} target="_blank" rel="noreferrer">Open provider payment page</a><small>QR expires {new Date(qrOrder.expiresAt * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}. Keep this page open to receive verified status.</small><div className="qr-checkout-actions"><button type="button" className="outline-button" disabled={loading} onClick={cancelQr}>Cancel QR payment</button><button type="button" className="outline-button" disabled={loading} onClick={switchQrToUpiApps}>Use UPI app / other methods</button></div></div>}

            <button
              className="button button-coral pay-button"
              onClick={() => pay()}
              disabled={paid || loading}
            >
              {loading ? (
                <span>Processing Payment...</span>
              ) : paid ? (
                <>
                  <Check size={16} /> {t("bookingSuccess")}
                </>
              ) : (
                <>
                <CreditCard size={16} /> {tripRecordId ? "Choose payment method" : "Save trip before checkout"}
                </>
              )}
            </button>

            {message && <p className="payment-message">{message}</p>}

            <div className="auth-note">
              <LockKeyhole size={14} /> 256-Bit SSL Encryption · Gateway secrets handled server-side
            </div>
          </div>
        </div>
      </div>

      {paid && receiptData && (
        <div className="success-receipt-banner">
          <div className="receipt-banner-copy">
            <ReceiptText size={24} className="receipt-banner-icon" />
            <div>
              <h3>Booking & Payment Succeeded</h3>
              <p>
                Receipt <strong>{receiptData.receiptNumber}</strong> · Booking <strong>{receiptData.bookingReference}</strong> · Transaction ID: <strong>{receiptData.transactionId}</strong> · {receiptData.method}
              </p>
            </div>
          </div>
          <div className="receipt-banner-actions">
            <Link
              className="button button-coral"
              href={`/thank-you?receipt=${receiptData.receiptNumber}&amount=${encodeURIComponent(`₹${totalAmount.toLocaleString("en-IN")}`)}&dest=${encodeURIComponent(destination.name)}&traveller=${encodeURIComponent(travellerName)}`}
            >
              Happy Journey & Thank You <ArrowRight size={16} />
            </Link>
            <Link
              className="button button-dark"
              href={`/receipt/${receiptData.receiptNumber}`}
            >
              View Printable Receipt
            </Link>
          </div>
          <p className="verified-receipt-note">Verified payment receipt is ready in your account. Use View / Print to view or save it as PDF.</p>
          <section className="receipt-card verified-inline-receipt" id="printable-receipt">
            <div className="receipt-head"><div className="receipt-brand"><span className="brand-mark">T</span><div><strong>TRAVEXA</strong><small>Meaningful miles, beautifully planned.</small></div></div><span className="receipt-status-badge">SUCCEEDED</span></div>
            <div className="receipt-number-row"><div><span>RECEIPT NUMBER</span><strong>{receiptData.receiptNumber}</strong></div><div><span>ISSUED AT</span><strong>{new Date(receiptData.issuedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</strong></div></div>
            <div className="receipt-grid"><div><span>BOOKING ID</span><strong>{receiptData.bookingReference}</strong></div><div><span>TRAVELLER(S)</span><strong>{receiptData.travelers.join(", ")}</strong></div><div><span>DESTINATION</span><strong>{receiptData.destination}</strong></div><div><span>TRAVEL DATE</span><strong>{receiptData.travelDate ? new Date(receiptData.travelDate).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Not specified"}</strong></div><div><span>PAYMENT METHOD</span><strong>{receiptData.method}</strong></div><div><span>TRANSACTION ID</span><strong>{receiptData.transactionId}</strong></div></div>
            <div className="receipt-total"><span>TOTAL PAID</span><strong>{receiptData.currency} {receiptData.amount.toLocaleString("en-IN")}</strong></div>
            <div className="receipt-actions no-print"><button className="button button-dark" onClick={() => window.print()}><Download size={16} /> View / Print / Save PDF</button><Link className="outline-button" href={`/receipt/${receiptData.receiptNumber}`}>Open receipt <ArrowRight size={16} /></Link></div>
          </section>
        </div>
      )}
    </RouteShell>
  );
}

export function ReceiptView({ id }: { id: string }) {
  const { t } = usePreferences();
  const [receipt, setReceipt] = useState<{ receiptNumber: string; bookingReference: string; transactionId: string; status: string; amount: number; currency: string; method: string; destination: string; destinationSlug?: string; tripId: string; travelers: string[]; travelDate?: string | null; issuedAt: string } | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { fetch(`/api/receipts/${encodeURIComponent(id)}`, { cache: "no-store" }).then(async (response) => { const result = await response.json(); if (!response.ok) throw new Error(result.error ?? "Receipt unavailable."); setReceipt(result.receipt); }).catch((e) => setError(e.message)); }, [id]);
  return <RouteShell eyebrow="✦ VERIFIED PAYMENT RECEIPT ✦" title={<>Record of Your <em>Journey.</em></>} intro="A receipt is shown only after the payment provider confirms the charge.">
    {!receipt ? <div className="empty-state" role={error ? "alert" : "status"}><p>{error || "Loading verified receipt…"}</p></div> : <div className="receipt-card" id="printable-receipt">
      <div className="receipt-head"><div className="receipt-brand"><span className="brand-mark">T</span><div><strong>TRAVEXA</strong><small>Meaningful miles, beautifully planned.</small></div></div><span className="receipt-status-badge">{receipt.status}</span></div>
      <div className="receipt-number-row"><div><span>{t("receiptNumber")}</span><strong>{receipt.receiptNumber}</strong></div><div><span>ISSUED AT</span><strong>{new Date(receipt.issuedAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}</strong></div></div>
      <div className="receipt-grid"><div><span>BOOKING ID</span><strong>{receipt.bookingReference}</strong></div><div><span>{t("receiptTraveller")}</span><strong>{receipt.travelers.join(", ") || "Account holder"}</strong></div><div><span>{t("receiptDestination")}</span><strong>{receipt.destination}</strong></div><div><span>TRAVEL DATE</span><strong>{receipt.travelDate ? new Date(receipt.travelDate).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Not specified"}</strong></div><div><span>PAYMENT METHOD</span><strong>{receipt.method}</strong></div><div><span>PROVIDER TRANSACTION</span><strong>{receipt.transactionId}</strong></div></div>
      <div className="receipt-total"><span>TOTAL PAID</span><strong>{receipt.currency} {receipt.amount.toLocaleString("en-IN")}</strong></div>
      <div className="receipt-actions no-print"><button className="button button-dark" onClick={() => window.print()}><Download size={16} /> View / Print / Save PDF</button>{receipt.destinationSlug && <Link className="outline-button" href={`/trip/${receipt.destinationSlug}`}>{t("receiptViewTrip")} <ArrowRight size={16} /></Link>}</div>
    </div>}
  </RouteShell>;
}
