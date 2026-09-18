import React from 'react';

export function AboutContent() {
  return (
    <section className="relative z-10 bg-background pt-24 pb-24 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* About RISECE 2K26 */}
        <div>
          <div className="font-mono text-xs font-bold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            THE FESTIVAL
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6 uppercase">About RISECE 2K26</h2>
          <p className="text-muted-foreground leading-relaxed md:text-lg mb-6">
            RISECE 2K26 is a prestigious national-level technical fest organized by the Department of Civil Engineering, Vignan's Foundation for Science, Technology & Research. This event is designed to challenge students' creativity, technical expertise, and problem-solving abilities across a wide range of civil engineering domains.
          </p>
          <p className="text-muted-foreground leading-relaxed md:text-lg">
            The fest brings together engineering minds from institutions across the state to compete, collaborate, and innovate - all under one roof. With events spanning structural engineering, geotechnical engineering, AutoCAD design, model making, paper presentations, and technical quizzes, RISECE 2K26 promises an electrifying experience for every participant. This fest also challenges students to demonstrate engineering skills essential for their careers.
          </p>
        </div>
      </div>
    </section>
  );
}
