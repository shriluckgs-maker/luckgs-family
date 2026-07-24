import { useEffect, useState } from "react";
import { ArrowLeft, Pencil, Plus, Power, Save, Trash2 } from "lucide-react";
import { createSpinReward, deleteSpinReward, seedSpinRewards, updateSpinReward } from "../services/spinRewardService";
import "./rewardManagement.css";

const emptyReward = { title: "", coupon: "", probability: 5, emoji: "🎁", color: "#6B1525", isActive: true };

function RewardManagement({ onBack }) {
  const [rewards, setRewards] = useState([]);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadRewards() {
    setLoading(true);
    try { setRewards(await seedSpinRewards()); }
    catch { setMessage("Could not load rewards. Please check your Firebase connection."); }
    finally { setLoading(false); }
  }
  useEffect(() => { loadRewards(); }, []);

  function updateDraft(field, value) { setDraft((current) => ({ ...current, [field]: value })); }
  async function saveReward(event) {
    event.preventDefault();
    const reward = { ...draft, title: draft.title.trim(), coupon: draft.coupon.trim(), probability: Number(draft.probability), sortOrder: draft.sortOrder ?? rewards.length + 1 };
    if (!reward.title) return;
    try {
      if (reward.id?.startsWith("default-")) { await seedSpinRewards(); await loadRewards(); setMessage("Default rewards were added to Firebase. Edit and save this reward again."); return; }
      if (reward.id) await updateSpinReward(reward.id, reward); else await createSpinReward(reward);
      setDraft(null); setMessage("Reward saved."); await loadRewards();
    } catch { setMessage("Could not save reward. Check Firebase permissions."); }
  }
  async function toggleReward(reward) { try { await updateSpinReward(reward.id, { isActive: !reward.isActive }); await loadRewards(); } catch { setMessage("Could not update this reward."); } }
  async function removeReward(reward) {
    if (!window.confirm(`Delete ${reward.title}?`)) return;
    try { await deleteSpinReward(reward.id); await loadRewards(); } catch { setMessage("Could not delete this reward."); }
  }

  const activeProbability = rewards.filter((reward) => reward.isActive !== false).reduce((total, reward) => total + (Number(reward.probability) || 0), 0);

  return <main className="reward-admin-page"><div className="reward-admin-shell">
    <button className="manage-back" onClick={onBack}><ArrowLeft size={17} /> Dashboard</button>
    <header className="manage-header"><div><span>LUCK-G'S ADMIN</span><h1>Lucky Spin rewards</h1><p>Create and control the rewards customers can win.</p></div><div className="probability-total"><small>Active chance total</small><strong>{activeProbability}%</strong></div></header>
    {message && <p className="manage-message">{message}</p>}
    <div className="manage-layout">
      <section className="reward-editor"><h2>{draft?.id ? "Edit reward" : "Add a reward"}</h2><form onSubmit={saveReward}>
        <label>Reward name<input required value={draft?.title ?? ""} onChange={(event) => updateDraft("title", event.target.value)} placeholder="e.g. Free socks" /></label>
        <label>Coupon code <input value={draft?.coupon ?? ""} onChange={(event) => updateDraft("coupon", event.target.value)} placeholder="Optional for no-prize rewards" /></label>
        <div className="editor-row"><label>Winning chance (%)<input required min="0" max="100" type="number" value={draft?.probability ?? ""} onChange={(event) => updateDraft("probability", event.target.value)} /></label><label>Emoji <input value={draft?.emoji ?? "🎁"} onChange={(event) => updateDraft("emoji", event.target.value)} /></label></div>
        <label>Colour <input type="color" value={draft?.color ?? "#6B1525"} onChange={(event) => updateDraft("color", event.target.value)} /></label>
        <div className="editor-actions"><button className="save-reward" type="submit"><Save size={16} /> Save reward</button>{draft && <button className="cancel-edit" type="button" onClick={() => setDraft(null)}>Cancel</button>}</div>
      </form></section>
      <section className="reward-catalog"><div className="catalog-heading"><h2>Your rewards</h2><button onClick={() => setDraft({ ...emptyReward, sortOrder: rewards.length + 1 })}><Plus size={16} /> Add reward</button></div>
        {loading ? <p className="catalog-empty">Loading rewards...</p> : rewards.map((reward) => <article className={`managed-reward ${reward.isActive === false ? "inactive" : ""}`} key={reward.id}>
          <span className="managed-color" style={{ background: reward.color }} /><div className="managed-main"><h3>{reward.title}</h3><p>{reward.coupon || "No coupon code"} · {reward.probability}% chance</p></div><div className="managed-actions"><button title="Edit" onClick={() => setDraft(reward)}><Pencil size={16} /></button><button title={reward.isActive === false ? "Enable" : "Disable"} onClick={() => toggleReward(reward)}><Power size={16} /></button>{!reward.id.startsWith("default-") && <button title="Delete" className="delete-reward" onClick={() => removeReward(reward)}><Trash2 size={16} /></button>}</div>
        </article>)}</section>
    </div>
  </div></main>;
}

export default RewardManagement;
