import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Lightbulb, PlusCircle, Trash2, ExternalLink } from "lucide-react";
import { DashboardState, LearningData, NoteEntry } from "@/lib/dashboard-state";

interface ResourcesTabProps {
  state: DashboardState;
  setLearningField: (field: keyof LearningData, value: string) => void;
  addNote: (month: string, content: string) => void;
  deleteNote: (id: string) => void;
}

const LEARNING_FIELDS: { key: keyof LearningData; label: string; placeholder: string }[] = [
  {
    key: "commonQuestion",
    label: "What question are people asking most?",
    placeholder: 'e.g., "How much does it cost to start a Home Help agency?"',
  },
  {
    key: "bestContent",
    label: "What content brought the most people in?",
    placeholder: "e.g., Facebook post about leaving bedside nursing",
  },
  {
    key: "purchaseReasons",
    label: "Why did people say they purchased?",
    placeholder: "e.g., They trusted the process and liked that Dayna has done it herself",
  },
  {
    key: "unmetNeeds",
    label: "What are people asking for that isn't included yet?",
    placeholder: "e.g., More detail on how to find first clients",
  },
  {
    key: "nextTest",
    label: "What should we test next?",
    placeholder: "e.g., Post one blog answering the startup cost question",
  },
];

const TOOLS = [
  { name: "Beacons", purpose: "Link-in-bio / Landing page", url: "https://beacons.ai", note: "Free" },
  { name: "Canva", purpose: "Design PDFs, worksheets, social content", url: "https://canva.com", note: "Free" },
  { name: "Zoom", purpose: "Record and host classes", url: "https://zoom.us", note: "Free tier" },
  { name: "Eventbrite", purpose: "Register attendees for intro class", url: "https://eventbrite.com", note: "Free" },
  { name: "Calendly", purpose: "Schedule paid support calls", url: "https://calendly.com", note: "Free tier" },
  { name: "Square", purpose: "Accept course / session payments", url: "https://squareup.com", note: "Free" },
  { name: "QuickBooks Online", purpose: "Track business income and expenses", url: "https://quickbooks.intuit.com", note: "Paid" },
  { name: "Facebook", purpose: "Tell the story of building the agency", url: "https://facebook.com", note: "Free to post" },
  { name: "Instagram", purpose: "Tell the story through images", url: "https://instagram.com", note: "Free to post" },
  { name: "LinkedIn", purpose: "Show professionalism and business thinking", url: "https://linkedin.com", note: "Free to post" },
];

const CONTENT_IDEAS = [
  { category: "Transition Content", color: "bg-purple-50 border-purple-200 text-purple-800", ideas: [
    "5 businesses nurses can start outside the hospital",
    "What I wish more nurses knew about entrepreneurship",
    "How healthcare skills translate into business ownership",
    "What to consider before leaving bedside nursing",
  ]},
  { category: "Home Help Education", color: "bg-orange-50 border-orange-200 text-orange-800", ideas: [
    "What is a Home Help agency?",
    "Home Help vs. home healthcare",
    "What does a Home Help agency owner actually do?",
    "Who is a good fit for this business?",
    "Questions to ask before starting",
  ]},
  { category: "Business Education", color: "bg-blue-50 border-blue-200 text-blue-800", ideas: [
    "What systems does a new agency need?",
    "How do you prepare for your first client?",
    "What should you organize before hiring?",
    "Common mistakes new agency owners make",
  ]},
];

const MONTHS = [
  "January 2026","February 2026","March 2026","April 2026","May 2026","June 2026",
  "July 2026","August 2026","September 2026","October 2026","November 2026","December 2026",
  "January 2027","February 2027","March 2027",
];

export default function ResourcesTab({
  state,
  setLearningField,
  addNote,
  deleteNote,
}: ResourcesTabProps) {
  const [newNoteMonth, setNewNoteMonth] = useState(MONTHS[7]); // August 2026
  const [newNoteContent, setNewNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  function handleAddNote() {
    if (!newNoteContent.trim()) return;
    addNote(newNoteMonth, newNoteContent.trim());
    setNewNoteContent("");
    setAddingNote(false);
  }

  return (
    <div className="space-y-6">
      {/* What We're Learning */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <Lightbulb className="tymflo-tangerine mr-3" size={24} />
            What We're Learning
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            The first year is about validation, not just completion. Capture what you're discovering so decisions are based on data.
          </p>
          <div className="space-y-4">
            {LEARNING_FIELDS.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {field.label}
                </label>
                <textarea
                  rows={2}
                  placeholder={field.placeholder}
                  value={state.learning[field.key]}
                  onChange={(e) => setLearningField(field.key, e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tymflo-purple/30 resize-none"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly notes log */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 font-heading flex items-center gap-2">
              <FolderOpen size={22} className="tymflo-purple" />
              Monthly Notes
            </h2>
            {!addingNote && (
              <Button
                size="sm"
                onClick={() => setAddingNote(true)}
                className="bg-tymflo-purple hover:bg-purple-800 text-white font-heading"
              >
                <PlusCircle size={14} className="mr-1.5" />
                Add Entry
              </Button>
            )}
          </div>

          {addingNote && (
            <div className="mb-5 p-4 bg-tymflo-purple-light border border-purple-200 rounded-xl space-y-3">
              <div className="flex gap-3">
                <select
                  value={newNoteMonth}
                  onChange={(e) => setNewNoteMonth(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-tymflo-purple/30 bg-white"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <textarea
                rows={4}
                placeholder="What happened this month? What worked? What didn't? What's next?"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tymflo-purple/30 resize-none bg-white"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="outline" onClick={() => setAddingNote(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddNote}
                  className="bg-tymflo-purple hover:bg-purple-800 text-white font-heading"
                >
                  Save Note
                </Button>
              </div>
            </div>
          )}

          {state.notes.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-6">
              No monthly notes yet. Add your first entry above.
            </p>
          ) : (
            <div className="space-y-3">
              {state.notes.map((note: NoteEntry) => (
                <div key={note.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 font-heading">
                      {note.month}
                    </span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content ideas */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 font-heading mb-2 flex items-center gap-2">
            📱 Social Media Content Ideas
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Content topics that answer the questions people ask before they know they need your course.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONTENT_IDEAS.map((cat) => (
              <div key={cat.category} className={`${cat.color} border rounded-xl p-4`}>
                <h3 className={`text-sm font-bold font-heading mb-3 ${cat.color.includes("purple") ? "text-purple-800" : cat.color.includes("orange") ? "text-orange-800" : "text-blue-800"}`}>
                  {cat.category}
                </h3>
                <ul className="space-y-1.5">
                  {cat.ideas.map((idea, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                      <span className="text-gray-400 mt-0.5">•</span>
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology tools */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 font-heading mb-2">
            🛠 Recommended Technology
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Keep it simple. The first goal is to make the customer journey easy to operate before adding more software.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:border-tymflo-purple hover:bg-tymflo-purple-light/30 transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm group-hover:tymflo-purple">
                      {tool.name}
                    </span>
                    <span className="text-xs text-green-600 font-medium">{tool.note}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{tool.purpose}</p>
                </div>
                <ExternalLink size={14} className="text-gray-300 group-hover:tymflo-purple flex-shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
