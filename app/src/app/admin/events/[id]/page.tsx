"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { IconArrowLeft, IconLoader2, IconPlus, IconTrash } from "@tabler/icons-react";

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // State
  const [eventData, setEventData] = useState<any>({});
  const [rules, setRules] = useState<any[]>([]);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [coordinators, setCoordinators] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const supabase = createClient();
      const eventId = resolvedParams.id;

      const { data: ev } = await supabase.from('events').select('*').eq('id', eventId).single();
      const { data: rls } = await supabase.from('event_rules').select('*').eq('event_id', eventId).order('display_order');
      const { data: crit } = await supabase.from('judging_criteria').select('*').eq('event_id', eventId).order('display_order');
      const { data: coords } = await supabase.from('event_coordinators').select('*').eq('event_id', eventId).order('display_order');

      if (ev) setEventData(ev);
      if (rls) setRules(rls);
      if (crit) setCriteria(crit);
      if (coords) setCoordinators(coords);

      setLoading(false);
    };
    fetchEvent();
  }, [resolvedParams.id]);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const eventId = resolvedParams.id;

    // 1. Update basic event info
    await supabase.from('events').update({
      title: eventData.title,
      subtitle: eventData.subtitle,
      overview: eventData.overview,
      venue: eventData.venue,
      event_date: eventData.event_date,
      event_time: eventData.event_time,
      prize: eventData.prize,
      duration: eventData.duration,
      team_size_text: eventData.team_size_text,
      min_team_size: parseInt(eventData.min_team_size || 1),
      max_team_size: parseInt(eventData.max_team_size || 1),
      is_team_event: eventData.is_team_event
    }).eq('id', eventId);

    // 2. Overwrite Rules (Delete all, insert new to handle removals easily)
    await supabase.from('event_rules').delete().eq('event_id', eventId);
    if (rules.length > 0) {
      const newRules = rules.map((r, i) => ({
        event_id: eventId,
        rule_text: r.rule_text,
        display_order: i + 1
      }));
      await supabase.from('event_rules').insert(newRules);
    }

    // 3. Overwrite Judging Criteria
    await supabase.from('judging_criteria').delete().eq('event_id', eventId);
    if (criteria.length > 0) {
      const newCriteria = criteria.map((c, i) => ({
        event_id: eventId,
        name: c.name,
        detail: c.detail,
        max_marks: parseInt(c.max_marks || 0),
        display_order: i + 1
      }));
      await supabase.from('judging_criteria').insert(newCriteria);
    }

    // 4. Overwrite Coordinators
    await supabase.from('event_coordinators').delete().eq('event_id', eventId);
    if (coordinators.length > 0) {
      const newCoords = coordinators.map((c, i) => ({
        event_id: eventId,
        name: c.name,
        phone: c.phone,
        role: c.role,
        display_order: i + 1
      }));
      await supabase.from('event_coordinators').insert(newCoords);
    }

    setSaving(false);
    alert("Event saved successfully!");
  };

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><IconLoader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/events" className="p-2 border border-border rounded-lg hover:bg-secondary/20">
            <IconArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Edit Event</h1>
            <p className="text-muted-foreground font-mono text-sm">{eventData.code} // {eventData.title}</p>
          </div>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
        >
          {saving && <IconLoader2 className="animate-spin" size={16} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-px">
        {['basic', 'rules', 'criteria', 'coordinators'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        
        {/* Basic Details Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  value={eventData.title || ''} 
                  onChange={e => setEventData({...eventData, title: e.target.value})}
                  className="w-full p-2 border border-border bg-background rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input 
                  type="text" 
                  value={eventData.subtitle || ''} 
                  onChange={e => setEventData({...eventData, subtitle: e.target.value})}
                  className="w-full p-2 border border-border bg-background rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Overview</label>
                <textarea 
                  rows={4}
                  value={eventData.overview || ''} 
                  onChange={e => setEventData({...eventData, overview: e.target.value})}
                  className="w-full p-2 border border-border bg-background rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Venue</label>
                <input 
                  type="text" 
                  value={eventData.venue || ''} 
                  onChange={e => setEventData({...eventData, venue: e.target.value})}
                  className="w-full p-2 border border-border bg-background rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prize</label>
                <input 
                  type="text" 
                  value={eventData.prize || ''} 
                  onChange={e => setEventData({...eventData, prize: e.target.value})}
                  className="w-full p-2 border border-border bg-background rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="text" 
                  value={eventData.event_date || ''} 
                  onChange={e => setEventData({...eventData, event_date: e.target.value})}
                  className="w-full p-2 border border-border bg-background rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input 
                  type="text" 
                  value={eventData.event_time || ''} 
                  onChange={e => setEventData({...eventData, event_time: e.target.value})}
                  className="w-full p-2 border border-border bg-background rounded-lg"
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
                <div>
                  <label className="block text-sm font-medium mb-1">Team Capacity (Text)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2-3 Members"
                    value={eventData.team_size_text || ''} 
                    onChange={e => setEventData({...eventData, team_size_text: e.target.value})}
                    className="w-full p-2 border border-border bg-background rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Min Team Size</label>
                  <input 
                    type="number" 
                    value={eventData.min_team_size || ''} 
                    onChange={e => setEventData({...eventData, min_team_size: e.target.value})}
                    className="w-full p-2 border border-border bg-background rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Team Size</label>
                  <input 
                    type="number" 
                    value={eventData.max_team_size || ''} 
                    onChange={e => setEventData({...eventData, max_team_size: e.target.value})}
                    className="w-full p-2 border border-border bg-background rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <span className="mt-2 text-muted-foreground font-mono">{idx + 1}.</span>
                <textarea 
                  value={rule.rule_text || ''}
                  onChange={e => {
                    const newRules = [...rules];
                    newRules[idx].rule_text = e.target.value;
                    setRules(newRules);
                  }}
                  className="flex-1 p-2 border border-border bg-background rounded-lg min-h-[60px]"
                />
                <button 
                  onClick={() => setRules(rules.filter((_, i) => i !== idx))}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg mt-1"
                >
                  <IconTrash size={20} />
                </button>
              </div>
            ))}
            <button 
              onClick={() => setRules([...rules, { rule_text: '' }])}
              className="flex items-center gap-2 text-primary font-medium hover:underline mt-4"
            >
              <IconPlus size={16} /> Add Rule
            </button>
          </div>
        )}

        {/* Judging Criteria Tab */}
        {activeTab === 'criteria' && (
          <div className="space-y-4">
            {criteria.map((crit, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-secondary/10 p-4 rounded-xl border border-border">
                <div className="flex-1 space-y-3">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Criterion Name</label>
                      <input 
                        type="text" 
                        value={crit.name || ''}
                        onChange={e => {
                          const newC = [...criteria];
                          newC[idx].name = e.target.value;
                          setCriteria(newC);
                        }}
                        className="w-full p-2 border border-border bg-background rounded-lg text-sm"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Max Marks</label>
                      <input 
                        type="number" 
                        value={crit.max_marks || ''}
                        onChange={e => {
                          const newC = [...criteria];
                          newC[idx].max_marks = e.target.value;
                          setCriteria(newC);
                        }}
                        className="w-full p-2 border border-border bg-background rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-muted-foreground">Description Details</label>
                    <input 
                      type="text" 
                      value={crit.detail || ''}
                      onChange={e => {
                        const newC = [...criteria];
                        newC[idx].detail = e.target.value;
                        setCriteria(newC);
                      }}
                      className="w-full p-2 border border-border bg-background rounded-lg text-sm"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setCriteria(criteria.filter((_, i) => i !== idx))}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg mt-5"
                >
                  <IconTrash size={20} />
                </button>
              </div>
            ))}
            <button 
              onClick={() => setCriteria([...criteria, { name: '', detail: '', max_marks: 10 }])}
              className="flex items-center gap-2 text-primary font-medium hover:underline mt-4"
            >
              <IconPlus size={16} /> Add Criterion
            </button>
          </div>
        )}

        {/* Coordinators Tab */}
        {activeTab === 'coordinators' && (
          <div className="space-y-4">
            {coordinators.map((coord, idx) => (
              <div key={idx} className="flex gap-4 items-center bg-secondary/10 p-4 rounded-xl border border-border">
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-muted-foreground">Name</label>
                    <input 
                      type="text" 
                      value={coord.name || ''}
                      onChange={e => {
                        const newC = [...coordinators];
                        newC[idx].name = e.target.value;
                        setCoordinators(newC);
                      }}
                      className="w-full p-2 border border-border bg-background rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-muted-foreground">Role</label>
                    <select 
                      value={coord.role || 'Student Coordinator'}
                      onChange={e => {
                        const newC = [...coordinators];
                        newC[idx].role = e.target.value;
                        setCoordinators(newC);
                      }}
                      className="w-full p-2 border border-border bg-background rounded-lg text-sm"
                    >
                      <option value="Student Coordinator">Student Coordinator</option>
                      <option value="Faculty Advisor">Faculty Advisor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-muted-foreground">Phone (Optional)</label>
                    <input 
                      type="text" 
                      value={coord.phone || ''}
                      onChange={e => {
                        const newC = [...coordinators];
                        newC[idx].phone = e.target.value;
                        setCoordinators(newC);
                      }}
                      className="w-full p-2 border border-border bg-background rounded-lg text-sm"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setCoordinators(coordinators.filter((_, i) => i !== idx))}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg mt-5"
                >
                  <IconTrash size={20} />
                </button>
              </div>
            ))}
            <button 
              onClick={() => setCoordinators([...coordinators, { name: '', role: 'Student Coordinator', phone: '' }])}
              className="flex items-center gap-2 text-primary font-medium hover:underline mt-4"
            >
              <IconPlus size={16} /> Add Coordinator
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
