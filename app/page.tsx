"use client";
import { useState } from "react";

export default function FoodBlogPage() {
  const [title, setTitle] = useState("");
  const [dish, setDish] = useState("");
  const [cuisine, setCuisine] = useState("Italian");
  const [angle, setAngle] = useState("Storytelling");
  const [length, setLength] = useState("Medium (800-1200 words)");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dish.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, dish, cuisine, angle, length }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.result);
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-orange-400 text-sm font-medium">🍳 AI-Powered</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-300 via-amber-400 to-orange-300 bg-clip-text text-transparent">Food Blog & Recipe Storytelling Writer</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Create compelling food blog posts with rich storytelling, recipe narratives, and engaging content for your readers.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 mb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Blog Post Title (optional)</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Secret History of Neapolitan Pizza" className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dish / Recipe *</label>
              <input type="text" value={dish} onChange={(e) => setDish(e.target.value)} placeholder="e.g. Slow-Roasted Lamb Shoulder with Herbs" required className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cuisine</label>
              <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition">
                {["Italian","French","Japanese","Mexican","American","Spanish","Thai","Indian","Mediterranean","Chinese","Korean","Greek","Middle Eastern","Other"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content Angle</label>
              <select value={angle} onChange={(e) => setAngle(e.target.value)} className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition">
                {["Storytelling","Recipe Tutorial","Ingredient Deep-Dive","Chef Interview Style","Travel & Culture","Seasonal/Holiday","Health & Wellness","Family Tradition","Restaurant Review","Technique Focus"].map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Post Length</label>
            <select value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition">
              {["Short (400-600 words)","Medium (800-1200 words)","Long (1500-2500 words)","Series (3-part miniseries)"].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-500 hover:to-amber-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-900/30 disabled:shadow-none text-lg">
            {loading ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Writing Your Blog Post...</span> : "🍳 Generate Food Blog Post"}
          </button>
        </form>
        {error && <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 mb-8 text-red-300"><strong>Error:</strong> {error}</div>}
        {result && (
          <div className="bg-gray-800/60 border border-orange-500/20 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-orange-400">Blog Post</h2>
              <button onClick={() => navigator.clipboard.writeText(result)} className="text-sm text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition">📋 Copy</button>
            </div>
            <div>{result.split("\n").map((line, i) => <p key={i} className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-3">{line}</p>)}</div>
          </div>
        )}
        <div className="text-center mt-12 text-gray-600 text-sm">Powered by DeepSeek AI · For food bloggers & content creators</div>
      </div>
    </div>
  );
}
