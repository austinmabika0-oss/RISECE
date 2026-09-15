"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/ui/Navbar";
import { IconLoader2 } from "@tabler/icons-react";
import { UniversityAutocomplete } from "@/components/ui/UniversityAutocomplete";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (!collegeId) {
          throw new Error("Please select a valid University from the dropdown list.");
        }
        
        if (data.user) {
          // Create profile
          const { error: profileError } = await supabase.from('profiles').insert([
            { 
              id: data.user.id, 
              full_name: fullName,
              roll_number: rollNumber.toUpperCase(),
              college_id: collegeId,
              college_name: collegeName,
              branch: branch,
              year_of_study: parseInt(year) || 1,
              phone_number: phone
            }
          ]);
          if (profileError) throw profileError;
        }

        setError("Success! If email confirmation is enabled, check your inbox. Otherwise, you can now log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col pt-24 bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 border border-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          
          <h2 className="font-display text-3xl font-bold mb-2">
            {isLogin ? "SYSTEM LOGIN" : "INITIALIZE PROFILE"}
          </h2>
          <p className="text-muted-foreground font-mono text-xs uppercase mb-8 tracking-widest">
            {isLogin ? "Authenticate to access dashboard" : "Register for RISECE 2K26 events"}
          </p>

          {error && (
            <div className={`p-3 mb-6 text-sm font-mono border ${error.includes("Success") ? "border-green-500/50 bg-green-500/10 text-green-500" : "border-destructive/50 bg-destructive/10 text-destructive"}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <input 
                    required type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                    className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Roll Number</label>
                    <input 
                      required type="text" value={rollNumber} onChange={e => setRollNumber(e.target.value.toUpperCase())}
                      className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans uppercase"
                      placeholder="221FA001"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">University / Institution</label>
                    <UniversityAutocomplete 
                      selectedName={collegeName}
                      onSelect={(university) => {
                        setCollegeName(university.name);
                        setCollegeId(university.id);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Branch</label>
                    <select 
                      required value={branch} onChange={e => setBranch(e.target.value)}
                      className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans appearance-none"
                    >
                      <option value="" disabled>Select Branch</option>
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="CIVIL">CIVIL</option>
                      <option value="MECH">MECH</option>
                      <option value="IT">IT</option>
                      <option value="AI&ML">AI & ML</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Year</label>
                    <select 
                      required value={year} onChange={e => setYear(e.target.value)}
                      className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans appearance-none"
                    >
                      <option value="" disabled>Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <input 
                    required type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
                    placeholder="+91 9876543210"
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email Address</label>
              <input 
                required type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
                placeholder="student@college.edu"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Password</label>
              <input 
                required type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 mt-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading && <IconLoader2 className="animate-spin" size={18} />}
              {isLogin ? "Authenticate" : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              {isLogin ? "No profile? Initialize one here." : "Existing profile? Authenticate here."}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
