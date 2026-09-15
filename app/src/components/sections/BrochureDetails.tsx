"use client";

import React from "react";

export function BrochureDetails() {
  return (
    <section className="py-24 px-4 md:px-6 relative z-10 bg-background border-t border-border">
      <div className="container mx-auto max-w-6xl">
        
        {/* About Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          
          {/* About Vignan's University */}
          <div>
            <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              THE INSTITUTION
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">ABOUT VIGNAN'S UNIVERSITY</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Vignan's Foundation for Science, Technology & Research, located in Vadlamudi, is a leading institution dedicated to delivering high-quality technical education. With a strong focus on excellence, it has consistently produced graduates who are well-prepared for industry and capable of making meaningful contributions to society and national development. The university offers a diverse range of undergraduate, postgraduate, and doctoral programmes supported by modern laboratories, a dynamic research environment, and strong industry connections.
            </p>
            
            <div className="bg-card/30 border border-border/50 p-6 space-y-3">
              <h4 className="font-mono text-sm font-bold tracking-widest text-foreground uppercase mb-4">Accreditations & Rankings</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary">•</span> NAAC 'A+' Grade Accredited</li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary">•</span> NBA Accredited Programmes</li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary">•</span> Ranked among top private engineering universities in Andhra Pradesh</li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary">•</span> NIRF 70th Rank in University Category</li>
              </ul>
            </div>
          </div>

          {/* About the Department */}
          <div>
            <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              THE DEPARTMENT
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">DEPARTMENT OF CIVIL ENGINEERING</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Department of Civil Engineering offers a four-year B.Tech programme and an M.Tech programme in Smart and Sustainable Construction, with curricula designed to meet evolving industry needs (NEP 2020). The department is equipped with advanced laboratories in Structural, Geotechnical, Transportation, Concrete, Surveying, and Environmental Engineering. We achieved an impressive 100% placement rate for the 2026 graduating batch and offer NBA-accredited programmes.
            </p>

            <div className="grid gap-6">
              <div className="bg-card/30 border border-border/50 p-6">
                <h4 className="font-mono text-sm font-bold tracking-widest text-foreground uppercase mb-2">Department Vision</h4>
                <p className="text-sm text-muted-foreground">To emerge as a centre of excellence in civil engineering education and research. To produce globally competent professionals who contribute to societal and infrastructure development of the region and the nation.</p>
              </div>
              <div className="bg-card/30 border border-border/50 p-6">
                <h4 className="font-mono text-sm font-bold tracking-widest text-foreground uppercase mb-2">Department Mission</h4>
                <p className="text-sm text-muted-foreground">To educate and train future civil engineers with the knowledge, skills, and ethical foundation necessary to design, implement, and maintain sustainable infrastructure through cutting-edge research, industry collaboration, and community engagement.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Committees Section */}
        <div className="mb-12 border-t border-border pt-24">
          <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4 text-center">
            LEADERSHIP & EXECUTION
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight mb-16 text-center">FESTIVAL COMMITTEES</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Column 1 */}
            <div className="space-y-12">
              <div>
                <h3 className="font-bold text-lg mb-4 text-primary uppercase tracking-wide border-b border-border pb-2">Chief Patrons</h3>
                <ul className="space-y-4">
                  <li>
                    <p className="font-bold text-foreground">Sri Lavu. Rathaiah</p>
                    <p className="text-xs text-muted-foreground">Chairman of Vignan group of institutions</p>
                  </li>
                  <li>
                    <p className="font-bold text-foreground">Sri. Lavu. Sri Krishna Devarayulu</p>
                    <p className="text-xs text-muted-foreground">Vice-Chairman of Vignan group of institutions</p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4 text-primary uppercase tracking-wide border-b border-border pb-2">Patrons</h3>
                <ul className="space-y-4">
                  <li><p className="font-bold text-foreground">Sri. Dr. K. Meghana</p><p className="text-xs text-muted-foreground">CEO, VFSTR</p></li>
                  <li><p className="font-bold text-foreground">Sri. Dr. P. Subba Rao</p><p className="text-xs text-muted-foreground">Chancellor, VFSTR</p></li>
                  <li><p className="font-bold text-foreground">Sri. Prof. K.V.Krishna Kishore</p><p className="text-xs text-muted-foreground">Vice-Chancellor, VFSTR</p></li>
                  <li><p className="font-bold text-foreground">Sri. Prof. P.M.V. Rao</p><p className="text-xs text-muted-foreground">Registrar, VFSTR</p></li>
                </ul>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-12">
              <div>
                <h3 className="font-bold text-lg mb-4 text-primary uppercase tracking-wide border-b border-border pb-2">Co-Patrons</h3>
                <ul className="space-y-4">
                  <li><p className="font-bold text-foreground">Sri. D. Venkatesulu</p><p className="text-xs text-muted-foreground">R&D Dean, VFSTR</p></li>
                  <li><p className="font-bold text-foreground">Sri. Dr. M. Ramakrishna</p><p className="text-xs text-muted-foreground">Dean IQAC & Dean School of Core Engineering, VFSTR</p></li>
                  <li><p className="font-bold text-foreground">Prof. D. Vijaya Ramu</p><p className="text-xs text-muted-foreground">Dean AAA, VFSTR</p></li>
                  <li><p className="font-bold text-foreground">Shri. P. Krishnaiah</p><p className="text-xs text-muted-foreground">Professor of Practise, Dept. of Civil Engineering, VFSTR</p></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4 text-primary uppercase tracking-wide border-b border-border pb-2">Chairperson & Convenors</h3>
                <ul className="space-y-4">
                  <li><p className="font-bold text-foreground">Dr. P. Sundara Kumar</p><p className="text-xs text-muted-foreground">Chairperson | Assoc. Prof & Head - CE</p></li>
                  <li><p className="font-bold text-foreground">Dr. A.V.A Bharat Kumar</p><p className="text-xs text-muted-foreground">Convenor | Assistant Professor</p></li>
                  <li><p className="font-bold text-foreground">Mr.M.Anirudh</p><p className="text-xs text-muted-foreground">Convenor | Assistant Professor</p></li>
                </ul>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-12">
              <div>
                <h3 className="font-bold text-lg mb-4 text-primary uppercase tracking-wide border-b border-border pb-2">Organising Committee</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span className="text-foreground">Dr. P. Sundara Kumar</span><span className="text-muted-foreground text-xs text-right">Assoc.Prof & HOD</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Prof. A. Siva Sankar</span><span className="text-muted-foreground text-xs text-right">Professor</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Dr. M.V.Raju</span><span className="text-muted-foreground text-xs text-right">Assistant Professor</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Dr. P. Parthiban</span><span className="text-muted-foreground text-xs text-right">Assistant Professor</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Dr. J.Gopala Rao</span><span className="text-muted-foreground text-xs text-right">Assistant Professor</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Dr. A.V.A.Bharat Kumar</span><span className="text-muted-foreground text-xs text-right">Assistant Professor</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Dr. P. Rakesh</span><span className="text-muted-foreground text-xs text-right">Assistant Professor</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Mr. M.Anirudh</span><span className="text-muted-foreground text-xs text-right">Assistant Professor</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Mr. D. Ravi Kanth</span><span className="text-muted-foreground text-xs text-right">Assistant Professor</span></li>
                  <li className="flex justify-between"><span className="text-foreground">Mr. K. Bala Gopi Krishna</span><span className="text-muted-foreground text-xs text-right">Assistant Professor</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4 text-primary uppercase tracking-wide border-b border-border pb-2">Chief Student Coordinators</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center"><span className="font-bold text-foreground">B.Koushik</span><span className="font-mono text-xs text-muted-foreground">+91 88854 24673</span></li>
                  <li className="flex justify-between items-center"><span className="font-bold text-foreground">T.Mukotami</span><span className="font-mono text-xs text-muted-foreground">+91 86391 95200</span></li>
                  <li className="flex justify-between items-center"><span className="font-bold text-foreground">K.Indra</span><span className="font-mono text-xs text-muted-foreground">+91 79898 99501</span></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
