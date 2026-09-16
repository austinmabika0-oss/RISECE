"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { IconUpload, IconLoader2, IconCheck, IconX } from "@tabler/icons-react";

export function PaymentEvidenceUpload({ 
  registrationId, 
  totalAmount, 
  onSuccess 
}: { 
  registrationId: string, 
  totalAmount: number,
  onSuccess: () => void 
}) {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (!selected.type.startsWith('image/')) {
        setError("Please upload a valid image file (PNG/JPG).");
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError("File size must be under 5MB.");
        return;
      }
      setError(null);
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a payment screenshot.");
      return;
    }
    if (!utr.trim()) {
      setError("Please enter the UTR/Reference number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${registrationId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `payment-proofs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payments')
        .upload(filePath, file);

      if (uploadError) {
        // Create bucket if it doesn't exist just in case it's a fresh DB
        if (uploadError.message.includes("Bucket not found")) {
          throw new Error("Storage bucket 'payments' is missing. Please contact admin.");
        }
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage.from('payments').getPublicUrl(filePath);

      // 2. Update the registration record
      const { error: updateError } = await supabase
        .from("event_registrations")
        .update({
          payment_screenshot: publicUrl,
          utr_number: utr.trim(),
          payment_status: 'UNDER VERIFICATION',
          payment_submitted_at: new Date().toISOString()
        })
        .eq("registration_id", registrationId);

      if (updateError) {
        // If UTR is not unique, catch it
        if (updateError.code === '23505') {
          throw new Error("This UTR has already been submitted for another registration.");
        }
        throw updateError;
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to submit payment evidence.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card/50 border border-border p-8 mb-8 text-center">
        <div className="font-mono text-sm text-muted-foreground uppercase mb-2">Registration ID</div>
        <div className="text-xl font-mono font-bold text-primary mb-6">{registrationId}</div>
        
        <div className="font-mono text-sm text-muted-foreground uppercase mb-2">Amount to Pay</div>
        <div className="text-4xl font-display font-bold mb-8">₹{totalAmount}</div>

        <div className="p-4 bg-white inline-block mb-6 rounded-lg">
          {/* We will assume the QR code is available at this path */}
          <Image 
            src="/resources/qrcode/qrcode.png" 
            alt="Payment QR Code" 
            width={200} 
            height={200} 
            className="w-48 h-48"
          />
        </div>
        <p className="text-sm text-muted-foreground">Scan the QR code above with any UPI app to make the payment.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-4 bg-destructive/10 border border-destructive/50 text-destructive font-mono">{error}</div>}

        <div className="bg-card/30 border border-border p-6">
          <label className="block font-mono text-sm font-bold uppercase mb-4">1. Upload Payment Screenshot</label>
          
          {!preview ? (
            <div className="relative border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors p-8 text-center cursor-pointer">
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <IconUpload className="mx-auto mb-2 text-muted-foreground" size={32} />
              <div className="text-sm font-bold">Click to upload or drag and drop</div>
              <div className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</div>
            </div>
          ) : (
            <div className="relative border border-border p-2 bg-background">
              <div className="relative w-full h-48">
                <Image src={preview} alt="Preview" fill className="object-contain" />
              </div>
              <button 
                type="button" 
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-4 right-4 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
              >
                <IconX size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="bg-card/30 border border-border p-6">
          <label className="block font-mono text-sm font-bold uppercase mb-2">2. Enter UTR / Reference Number</label>
          <p className="text-xs text-muted-foreground mb-4">Found in your payment app's transaction history (usually 12 digits).</p>
          <input 
            type="text" 
            required 
            placeholder="e.g. 312345678901" 
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            className="w-full p-4 bg-background border border-border focus:border-primary font-mono text-sm outline-none"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || !file || !utr.trim()}
          className="w-full py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
        >
          {loading && <IconLoader2 className="animate-spin" size={18} />}
          SUBMIT PAYMENT EVIDENCE
        </button>
      </form>
    </div>
  );
}
