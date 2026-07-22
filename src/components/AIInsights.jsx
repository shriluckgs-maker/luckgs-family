function AIInsights({ insights }) {

  return (

    <div className="ai-section">

      <h2>
        🤖 Today's Business Insights
      </h2>

      {insights.length === 0 ? (

        <div className="ai-card">

          <h3>
            No Insights
          </h3>

          <p>
            Customer insights will appear here.
          </p>

        </div>

      ) : (

        insights.map((item, index) => (

          <div
            key={index}
            className="ai-card"
          >

            <h3>
              {item.title}
            </h3>

            <p>
              {item.message}
            </p>

            <strong>
              {item.action}
            </strong>

          </div>

        ))

      )}

    </div>

  );

}

export default AIInsights;