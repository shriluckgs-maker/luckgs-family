import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import { redeemRewardPass } from "../services/rewardPassService";

import RewardStats from "../components/rewards/RewardStats";
import RewardSearch from "../components/rewards/RewardSearch";
import RewardCard from "../components/rewards/RewardCard";

import "../styles/rewards.css";

function RewardPasses({ onBack }) {
  const [passes, setPasses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRewardPasses();
  }, []);

  async function loadRewardPasses() {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "rewardPasses")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPasses(data);
    } catch (error) {
      console.error("Error loading Reward Passes:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredPasses = useMemo(() => {
    if (!search.trim()) return passes;

    const text = search.toLowerCase();

    return passes.filter((pass) => {
      return (
        pass.rewardPassId?.toLowerCase().includes(text) ||
        pass.customerName?.toLowerCase().includes(text) ||
        pass.mobile?.includes(search)
      );
    });
  }, [passes, search]);

  const stats = useMemo(() => {
    const active = passes.filter(
      (p) => p.status === "ACTIVE"
    ).length;

    const redeemed = passes.filter(
      (p) => p.status === "REDEEMED"
    ).length;

    const expiring = passes.filter((p) => {
      if (!p.expiryDate) return false;

      const expiry = p.expiryDate.toDate
        ? p.expiryDate.toDate()
        : new Date(p.expiryDate);

      const diff =
        (expiry.getTime() - Date.now()) /
        (1000 * 60 * 60 * 24);

      return diff >= 0 && diff <= 7;
    }).length;

    return {
      active,
      redeemed,
      expiring,
      total: passes.length,
    };
  }, [passes]);

  function handleView(pass) {
    alert(
      `Reward Pass ID : ${pass.rewardPassId}

Customer : ${pass.customerName}

Mobile : ${pass.mobile}

Reward : ${pass.reward}

Status : ${pass.status}`
    );
  }

  async function handleRedeem(pass) {
    if (pass.status !== "ACTIVE") {
      alert("Reward Pass already redeemed.");
      return;
    }

    const confirmed = window.confirm(
      `Redeem Reward Pass?\n\n${pass.rewardPassId}`
    );

    if (!confirmed) return;

    try {
      const success = await redeemRewardPass(
        pass.rewardPassId
      );

      if (success) {
        alert("✅ Reward Redeemed Successfully");

        await loadRewardPasses();
      } else {
        alert("❌ Failed to redeem Reward Pass");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  }

  return (
    <div className="container fade">
      <div className="dashboard">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h1>🎁 Reward Pass Vault</h1>

          <button
            className="back-btn"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>

        <RewardStats stats={stats} />

        <RewardSearch
          search={search}
          setSearch={setSearch}
        />

        {loading ? (
          <h3>Loading Reward Passes...</h3>
        ) : filteredPasses.length === 0 ? (
          <h3>No Reward Passes Found</h3>
        ) : (
          <div className="reward-list">
            {filteredPasses.map((pass) => (
              <RewardCard
                key={pass.id}
                pass={pass}
                onView={handleView}
                onRedeem={handleRedeem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RewardPasses;