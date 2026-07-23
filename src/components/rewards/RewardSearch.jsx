function RewardSearch({
  search,
  setSearch,
}) {
  return (
    <input
      className="reward-search"
      placeholder="🔍 Search Reward Pass / Customer / Mobile"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
}

export default RewardSearch;