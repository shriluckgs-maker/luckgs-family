import { ArrowLeft, Printer, QrCode } from "lucide-react";
import logo from "../assets/logo.jpeg";
import "./registrationQr.css";

const registrationUrl = "https://retailboost-ai.web.app/?register=1";
const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=12&data=${encodeURIComponent(registrationUrl)}`;

function RegistrationQr({ onBack }) {
  return (
    <main className="qr-page">
      <section className="qr-card">
        <button className="qr-back" onClick={onBack}><ArrowLeft size={18} /> Back</button>
        <img className="qr-logo" src={logo} alt="LUCK-G'S" />
        <QrCode className="qr-icon" size={30} />
        <h1>Join the LUCK-G'S Family</h1>
        <p>Scan this QR code with your phone camera to register.</p>
        <img className="registration-qr" src={qrImageUrl} alt="QR code linking to LUCK-G'S customer registration" />
        <strong>No app download needed</strong>
        <span>Scan → Fill your details → Spin the reward wheel</span>
        <button className="qr-print" onClick={() => window.print()}><Printer size={17} /> Print QR Code</button>
      </section>
    </main>
  );
}

export default RegistrationQr;
