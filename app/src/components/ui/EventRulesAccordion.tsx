"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/shadcn/collapsible";
import { IconChevronDown } from "@tabler/icons-react";

interface EventRulesAccordionProps {
  rules: string[];
}

export function EventRulesAccordion({ rules }: EventRulesAccordionProps) {
  // We'll group rules by pairs or logically if we want to categorize them.
  // Since rules are just an array of strings, we'll format them as a neat list inside the accordion,
  // or we can make each rule its own accordion item if it's long. 
  // Let's group them by a generic category or just display them elegantly.
  
  // For the sake of the editorial design, we'll split the rules into 3 elegant sections if possible,
  // or just use one large accordion for the regulations.
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-border bg-card/30 rounded-xl overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 bg-card/50 hover:bg-card transition-colors">
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-primary font-bold tracking-widest">
              [ REGULATIONS ]
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Rules of the Arena
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconChevronDown size={20} className="text-muted-foreground" />
          </motion.div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="p-6 pt-2 grid gap-6">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="font-mono text-sm font-bold text-primary opacity-50 pt-1 shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="font-sans text-base text-muted-foreground leading-relaxed">
                  {rule}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
