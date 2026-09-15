"use client";

import { motion, AnimatePresence } from "framer-motion";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Registration form"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass-card flex flex-col w-full max-w-[720px] max-h-[90vh]"
            style={{ background: "rgba(10,16,26,0.8)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-[rgba(0,229,255,0.03)] border-b border-[rgba(0,229,255,0.1)] shrink-0 z-10 relative">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#00E5FF] uppercase mb-1">
                  SYS.REG · RISECE 2K26
                </div>
                <h2 className="font-display text-3xl text-white leading-none tracking-wide text-glow-cyan">
                  Initialize Registration
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-[rgba(0,229,255,0.2)] flex items-center justify-center text-[#00E5FF] hover:bg-[rgba(0,229,255,0.1)] hover:border-[#00E5FF] transition-all shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 relative z-10 custom-scrollbar flex-grow">
              
              {/* Pricing Tiers */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Dual Phase", desc: "Access to 2 Events", price: "₹200" },
                  { label: "Full Access", desc: "Access to All Events", price: "₹300" },
                ].map(({ label, desc, price }) => (
                  <div key={label} className="p-4 rounded-lg bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.1)] flex flex-col">
                    <div className="font-mono text-[10px] tracking-[0.1em] text-[#00E5FF] uppercase mb-1">
                      {desc}
                    </div>
                    <div className="font-display text-2xl text-white mb-2">{label}</div>
                    <div className="font-mono text-sm text-[#B89033] mt-auto">{price}</div>
                  </div>
                ))}
              </div>

              {/* Form Placeholder */}
              <div className="relative w-full min-h-[300px] rounded-lg border border-[rgba(0,229,255,0.2)] bg-[rgba(10,16,26,0.6)] flex flex-col items-center justify-center p-8 overflow-hidden">
                {/* Background scanning line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[rgba(0,229,255,0.5)] shadow-[0_0_10px_#00E5FF] animate-pulse-cyan opacity-50" />
                
                <div className="neon-ring text-2xl text-[#00E5FF] mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                
                <div className="font-mono text-[11px] tracking-[0.2em] text-[#00E5FF] uppercase mb-2 text-center">
                  Secure Portal Offline
                </div>
                <p className="font-sans text-[0.9rem] text-[#849bb3] text-center max-w-sm mb-6">
                  The official Microsoft Forms registration portal is currently being configured. 
                </p>
                <a href="mailto:drava_civil@vignan.ac.in" className="btn-cyber !text-[10px] !px-6">
                  Email to Register
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                {[
                  { label: "Faculty Coordinator", value: "+91 79899 79510" },
                  { label: "Helpdesk", value: "+91 85559 37539" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="font-mono text-[9px] tracking-[0.1em] text-[#849bb3] uppercase mb-1">
                      {label}
                    </div>
                    <a href={`tel:${value.replace(/\s/g, "")}`} className="font-mono text-[11px] text-[#f0f4f8] hover:text-[#00E5FF] transition-colors">
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
