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
          <p className="text-muted-foreground leading-relaxed md:text-lg mb-8">
            The fest brings together engineering minds from institutions across the state to compete, collaborate, and innovate - all under one roof. With events spanning structural engineering, geotechnical engineering, AutoCAD design, model making, paper presentations, and technical quizzes, RISECE 2K26 promises an electrifying experience for every participant. This fest also challenges students to demonstrate engineering skills essential for their careers.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-16">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4 uppercase">About the Tech Fest</h3>
              <p className="text-muted-foreground leading-relaxed md:text-lg mb-4">
                In an era of rapid urbanization and large-scale infrastructure development, the role of civil engineers has evolved beyond conventional construction to encompass the planning and development of smart, resilient, and sustainable built environments. The Department of Civil Engineering at Vignan&apos;s Foundation for Science, Technology & Research (VFSTR) is organizing this National-Level Technical Fest as a platform for the next generation of builders, planners, and innovators from engineering institutions across India.
              </p>
              <p className="text-muted-foreground leading-relaxed md:text-lg">
                The rationale behind this national-level convergence is to bridge the gap between academic knowledge and real-world industry applications. The fest provides students with an opportunity to move beyond conventional classroom learning and engage in an environment that promotes technical problem-solving, hands-on experimentation, innovation, and creative thinking. It also provides a valuable platform for students to exchange ideas, showcase innovative designs and solutions, and receive constructive feedback from peers, faculty members, and industry professionals from across the country.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <img 
                src="/images/about-tech-fest.png" 
                alt="About Tech Fest" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4 mt-8 uppercase">Expected Outcomes</h3>
          <p className="text-muted-foreground leading-relaxed md:text-lg mb-6">
            This National-Level Technical Fest is expected to contribute to the academic and professional development of participating students through the following outcomes:
          </p>
          <div className="space-y-6">
            <div className="bg-card/50 p-6 rounded-lg border border-border/50">
              <h4 className="font-bold text-lg text-foreground mb-2 text-primary">1. Enhanced Technical Competency</h4>
              <p className="text-muted-foreground leading-relaxed">Students will strengthen their technical knowledge and practical skills by engaging in technical competitions, presentations, design challenges, hands-on activities, and emerging Civil Engineering applications.</p>
            </div>
            <div className="bg-card/50 p-6 rounded-lg border border-border/50">
              <h4 className="font-bold text-lg text-foreground mb-2 text-primary">2. Industry Readiness and Professional Skill Development</h4>
              <p className="text-muted-foreground leading-relaxed">Participation in technical events and coordination activities will enhance students&apos; problem-solving, logical reasoning, communication, teamwork, leadership, project coordination, and organizational skills, thereby improving their preparedness for professional careers.</p>
            </div>
            <div className="bg-card/50 p-6 rounded-lg border border-border/50">
              <h4 className="font-bold text-lg text-foreground mb-2 text-primary">3. National-Level Collaboration and Networking</h4>
              <p className="text-muted-foreground leading-relaxed">The fest will facilitate interaction and networking among students, faculty members, researchers, and industry professionals from different institutions, encouraging knowledge exchange and creating opportunities for future academic, research, and inter-institutional collaborations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
